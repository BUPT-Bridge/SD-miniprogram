import Taro from "@tarojs/taro";
import request, { checkAuth } from "./request";
import root from "./proto/user";

// 获取 Proto Message 类型
const UserResponse = root.api.user.UserResponse;
const UserRequest = root.api.user.UserRequest;
const ApplyPermissionResponse = root.api.user.ApplyPermissionResponse;

const parseJsonFromBinary = (data) => {
  try {
    const uint8 = data instanceof Uint8Array ? data : new Uint8Array(data);
    const text = new TextDecoder("utf-8").decode(uint8).trim();
    if (!text) return null;
    return JSON.parse(text);
  } catch {
    return null;
  }
};

/**
 * 辅助函数：解包 ApplyPermission 响应
 * @param {ArrayBuffer} data
 */
const decodeApplyPermissionResponse = (data) => {
  try {
    if (data instanceof ArrayBuffer) {
      data = new Uint8Array(data);
    }
    const message = ApplyPermissionResponse.decode(data);
    const obj = ApplyPermissionResponse.toObject(message, {
      longs: String,
      enums: String,
      bytes: String,
    });
    return checkAuth(obj);
  } catch (error) {
    if (error.code === 401) throw error;
    const jsonObj = parseJsonFromBinary(data);
    if (jsonObj && typeof jsonObj === "object") {
      return checkAuth(jsonObj);
    }
    console.error("Proto decode error:", error);
    throw error;
  }
};

/**
 * 辅助函数：解包 Proto 响应
 * @param {ArrayBuffer} data
 */
const decodeUserResponse = (data) => {
  try {
    // 确保是 Uint8Array
    if (data instanceof ArrayBuffer) {
      data = new Uint8Array(data);
    }
    const message = UserResponse.decode(data);
    // 转换为普通对象
    const obj = UserResponse.toObject(message, {
      longs: String,
      enums: String,
      bytes: String,
    });
    return checkAuth(obj);
  } catch (error) {
    if (error.code === 401) throw error;
    console.error("Proto decode error:", error);
    throw error;
  }
};

// const BASE_URL = process.env.TARO_APP_API;

/**
 * 用户登录接口
 * GET /api/user/login?js_code=xxxx
 * 接收 Proto
 */
export const login = (jsCode) => {
  return request({
    url: `/api/user/login?js_code=${jsCode}`,
    method: "GET",
    responseType: "arraybuffer", // 声明接收二进制
  }).then((data) => decodeUserResponse(data));
};

/**
 * 用户注册接口
 * GET /api/user/register?js_code=xxxx
 * 接收 Proto
 */
export const register = (jsCode) => {
  return request({
    url: `/api/user/register?js_code=${jsCode}`,
    method: "GET",
    responseType: "arraybuffer",
  }).then((data) => decodeUserResponse(data));
};

/**
 * 获取个人信息
 * GET /api/user/info
 * 接收 Proto
 */
export const getUserInfo = () => {
  return request({
    url: "/api/user/info",
    method: "GET",
    responseType: "arraybuffer",
  }).then((res) => decodeUserResponse(res));
};

/**
 * 修改个人信息
 * PUT /api/user/modify
 * 发送 Proto (UserRequest)
 * 接收 Proto (UserResponse)
 */
export const modifyUserInfo = (userInfo) => {
  // 1. 验证并创建发送消息
  const errMsg = UserRequest.verify(userInfo);
  if (errMsg) throw Error(`Proto verify error: ${errMsg}`);

  const message = UserRequest.create(userInfo);
  console.log("发送消息:", message);
  const buffer = UserRequest.encode(message).finish();

  // 转换为 ArrayBuffer 以便 Taro.request 发送
  // buffer 是 Uint8Array，buffer.buffer 是底层的 ArrayBuffer
  const arrayBuffer = buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength,
  );

  return request({
    url: "/api/user/modify",
    method: "PUT",
    // 覆盖默认 Header，发送 Protobuf 数据
    header: {
      "Content-Type": "application/x-protobuf",
      Authorization: Taro.getStorageSync("token") || "",
    },
    data: arrayBuffer,
    responseType: "arraybuffer",
  }).then((res) => decodeUserResponse(res));
};

/**
 * 使用校验码提升权限
 * POST /api/user/apply_permission?code=xxx
 */
export const applyPermission = (code) => {
  return request({
    url: `/api/user/apply_permission?code=${code}`,
    method: "POST",
    responseType: "arraybuffer",
  }).then((res) => decodeApplyPermissionResponse(res));
};

/**
 * 执行微信登录完整流程
 */
export const performWechatLogin = async () => {
  try {
    let { code } = await Taro.login();
    if (!code) throw new Error("微信登录失败: 未获取到 code");
    console.log("获取到微信 Code:", code);

    let res;
    let loginSuccess = false;
    let isRegister = false;

    // 尝试登录
    try {
      res = await login(code);
      // HTTP 200, res 是解码后的对象
      if (res && res.code === 200) {
        loginSuccess = true;
        console.log("登录成功:", res);
      }
    } catch (error) {
      // 如果 request.js reject 了 (HTTP Error)，error 可能是 raw response
      // 因为我们设置了 responseType: arraybuffer，error.data 也是 arraybuffer
      // 我们需要尝试解码其中的错误信息
      if (error && error.data && error.data instanceof ArrayBuffer) {
        try {
          res = decodeUserResponse(error.data);
        } catch (e) {
          // 无法解码，可能是其他错误
          throw error;
        }
      } else {
        throw error;
      }
    }

    // 逻辑：如果登录未成功，且返回 code 500，则注册
    if (!loginSuccess) {
      if (res && res.code === 500) {
        console.log("用户未注册，尝试注册...");
        try {
          const taroLoginRes = await Taro.login();
          code = taroLoginRes.code;
          console.log("注册使用微信code:", code);
          res = await register(code);
          isRegister = true;
        } catch (error) {
          if (error && error.data && error.data instanceof ArrayBuffer) {
            res = decodeUserResponse(error.data);
          } else {
            throw error;
          }
        }
      } else {
        throw new Error((res && res.message) || "登录异常");
      }
    }

    // 保存信息
    if (res && res.code === 200 && res.user && res.user.token) {
      const token = res.user.token;
      Taro.setStorageSync("token", token);
      // user 对象里也有 token，保存完整的 userInfo
      Taro.setStorageSync("userInfo", res.user);
      console.log("登录/注册成功，Token 已保存");

      if (isRegister) {
        // 注册成功后引导完善信息
        setTimeout(() => {
          Taro.showModal({
            title: "注册成功",
            content: "请修改个人信息",
            showCancel: false,
            confirmText: "确定",
            success: (modalRes) => {
              if (modalRes.confirm) {
                Taro.navigateTo({ url: "/PersonalDetails/profile-info/index" });
              }
            },
          });
        }, 100);
      }

      return res.user;
    } else {
      throw new Error((res && res.message) || "无效的响应内容");
    }
  } catch (error) {
    console.error("微信登录流程异常:", error);
    Taro.showToast({ title: "登录失败", icon: "none" });
    throw error;
  }
};
