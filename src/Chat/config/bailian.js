// 百炼配置：API Key 由 /api/user/info 返回的 user.x_api_key 下发。
const DEFAULT_CONFIG = {
  API_URL: "",
  APP_ID: "",
};

let config = { ...DEFAULT_CONFIG };

try {
  if (process.env.TARO_APP_BAILIAN_API_URL) {
    config.API_URL = process.env.TARO_APP_BAILIAN_API_URL;
  }
  if (process.env.TARO_APP_BAILIAN_APP_ID) {
    config.APP_ID = process.env.TARO_APP_BAILIAN_APP_ID;
  }
} catch (e) {
  console.warn("Environment variables not loaded, using default config.");
}

export const BAILIAN_CONFIG = config;

export const REQUEST_CONFIG = {
  TIMEOUT: 60000,
  ENABLE_STREAM: true,
  HEADERS: {
    "Content-Type": "application/json",
  },
};
