import Taro from "@tarojs/taro";

const BASE_URL = process.env.TARO_APP_API;
const AUTH_TOKEN_KEY = "auth_token";

const isEmptyValue = (value) =>
  value === undefined || value === null || value === "";

const buildQueryString = (params = {}) => {
  const query = Object.entries(params)
    .filter(([, value]) => !isEmptyValue(value))
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    )
    .join("&");
  return query ? `?${query}` : "";
};

export const setAuthToken = (token) => {
  if (!isEmptyValue(token)) {
    Taro.setStorageSync(AUTH_TOKEN_KEY, token);
  }
};

export const getAuthToken = () => {
  return Taro.getStorageSync(AUTH_TOKEN_KEY) || "";
};

export const clearAuthToken = () => {
  Taro.removeStorageSync(AUTH_TOKEN_KEY);
};

export const withQuery = (url, params = {}) => {
  return `${url}${buildQueryString(params)}`;
};

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
  const {
    url,
    method = "GET",
    data = {},
    headers = {},
    withAuth = true,
    responseType,
    transformRequest,
    transformResponse,
  } = options;

  const token = getAuthToken();
  const authHeader = withAuth && token ? { Authorization: token } : {};

  const requestData =
    typeof transformRequest === "function" ? transformRequest(data) : data;

  return new Promise((resolve, reject) => {
    Taro.request({
      url: `${BASE_URL}${url}`,
      method,
      data: requestData,
      responseType,
      header: {
        "Content-Type": "application/json",
        ...authHeader,
        ...headers,
        // 优先使用内存中的 Token，其次读取本地存储
        Authorization: globalToken || Taro.getStorageSync("token") || "",
        ...headers,
      },
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const result =
            typeof transformResponse === "function"
              ? transformResponse(res.data)
              : res.data;
          resolve(result);
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

export const uploadFile = ({
  url,
  filePath,
  name = "file",
  formData = {},
  withAuth = true,
}) => {
  const token = getAuthToken();
  const authHeader = withAuth && token ? { Authorization: token } : {};

  return new Promise((resolve, reject) => {
    Taro.uploadFile({
      url: `${BASE_URL}${url}`,
      filePath,
      name,
      formData,
      header: {
        ...authHeader,
      },
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(res.data));
          } catch (error) {
            reject(error);
          }
          return;
        }
        reject(res);
      },
      fail: reject,
    });
  });
};

export const downloadFile = ({ url, withAuth = true }) => {
  const token = getAuthToken();
  const authHeader = withAuth && token ? { Authorization: token } : {};

  return Taro.downloadFile({
    url: `${BASE_URL}${url}`,
    header: {
      ...authHeader,
    },
  });
};

export default request;
