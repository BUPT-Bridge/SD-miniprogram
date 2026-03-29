/**
 * 阿里云百炼智能体配置
 *
 * 请填写以下配置信息：
 * 1. API_URL: 百炼智能体调用地址（通常格式：https://dashscope.aliyuncs.com/api/v1/apps/{app_id}/completion）
 * 2. API_KEY: 百炼平台的 API Key
 * 3. APP_ID: 智能体/应用 ID
 *
 * 获取方式：
 * - 登录阿里云百炼控制台: https://bailian.console.aliyun.com
 * - 创建应用后获取 App ID 和 API Key
 */

/**
 * 阿里云百炼智能体配置
 *
 * 请填写以下配置信息：
 * 1. API_URL: 百炼智能体调用地址（通常格式：https://dashscope.aliyuncs.com/api/v1/apps/{app_id}/completion）
 * 2. API_KEY: 百炼平台的 API Key
 * 3. APP_ID: 智能体/应用 ID
 *
 * 获取方式：
 * - 登录阿里云百炼控制台: https://bailian.console.aliyun.com
 * - 创建应用后获取 App ID 和 API Key
 */

// 默认配置（作为 fallback）
const DEFAULT_CONFIG = {
  API_URL: "",
  API_KEY: "",
  APP_ID: "",
};

let config = { ...DEFAULT_CONFIG };

try {
  // 尝试从环境变量读取（编译时替换）
  // 如果环境变量未生效（如未重启开发服务器），这里可能会抛出 ReferenceError (process is not defined)，被 catch 捕获
  if (process.env.TARO_APP_BAILIAN_API_URL) {
    config.API_URL = process.env.TARO_APP_BAILIAN_API_URL;
  }
  if (process.env.TARO_APP_BAILIAN_API_KEY) {
    config.API_KEY = process.env.TARO_APP_BAILIAN_API_KEY;
  }
  if (process.env.TARO_APP_BAILIAN_APP_ID) {
    config.APP_ID = process.env.TARO_APP_BAILIAN_APP_ID;
  }
} catch (e) {
  // 环境变量未注入时的静默降级，使用默认配置
  console.warn("Environment variables not loaded, using default config.");
}

export const BAILIAN_CONFIG = config;

/**
 * 请求参数配置
 */
export const REQUEST_CONFIG = {
  // 超时时间（毫秒）
  TIMEOUT: 60000,

  // 是否启用流式输出
  ENABLE_STREAM: true,

  // 请求头
  HEADERS: {
    "Content-Type": "application/json",
  },
};
