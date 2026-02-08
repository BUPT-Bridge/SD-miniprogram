import Taro from "@tarojs/taro";

const BASE_URL = process.env.TARO_APP_API;

// 全局内存 Token，由 Context 同步设置
let globalToken = "";

export const setRequestToken = (token) => {
  globalToken = token;
};

/**
 * 检查业务状态码 (Protobuf 解包后调用)
 * @param {object} res - 解包后的对象 (需包含 code 字段)
 */
export const checkAuth = (res) => {
  if (res && res.code === 401) {
    console.log("检测到业务逻辑 401，触发登出");
    Taro.eventCenter.trigger("auth:logout");
    throw { ...res, message: res.message || "Login expired" };
  }
  return res;
};

const request = (options) => {
  const { url, method = "GET", data = {}, header = {}, ...rest } = options;

  return new Promise((resolve, reject) => {
    Taro.request({
      url: `${BASE_URL}${url}`,
      method,
      data,
      header: {
        "Content-Type": "application/json",
        // 优先使用内存中的 Token，其次读取本地存储
        Authorization: globalToken || Taro.getStorageSync("token") || "",
        ...header,
      },
      ...rest,
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
        } else if (res.statusCode === 401) {
          // Token 过期或无效
          reject({ ...res, message: "Token expired" });
        } else {
          reject(res);
        }
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};

export default request;
