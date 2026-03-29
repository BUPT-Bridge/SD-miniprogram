import Taro from "@tarojs/taro";
import { BAILIAN_CONFIG } from "../config/bailian";

/* global wx */

/**
 * 检查配置是否完整
 */
const checkConfig = () => {
  const { API_URL, API_KEY, APP_ID } = BAILIAN_CONFIG;
  if (!API_URL || !API_KEY || !APP_ID) {
    throw new Error("百炼 API 配置不完整，请先填写 API_URL、API_KEY 和 APP_ID");
  }
};

/**
 * 解析 SSE 数据行
 */
const parseSSELine = (line) => {
  if (!line || typeof line !== "string") return null;

  line = line.trim();
  if (!line.startsWith("data:")) return null;

  const data = line.slice(5).trim();
  if (data === "[DONE]") return { done: true };

  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};

/**
 * 流式发送消息（SSE）- 阿里云百炼智能体
 *
 * 使用微信小程序 wx.request 的 enableChunked 实现
 *
 * @param {string} prompt - 用户输入
 * @param {Array} history - 历史消息（可选）
 * @param {Object} callbacks - 回调函数
 * @param {Function} callbacks.onChunk - 收到数据块时调用 (chunk: string)
 * @param {Function} callbacks.onDone - 完成时调用 (fullText: string)
 * @param {Function} callbacks.onError - 出错时调用 (error: Error)
 * @param {Function} callbacks.onAbort - 中止时调用
 * @returns {Function} 中止函数
 */
export const sendMessageStream = (prompt, history = [], callbacks = {}) => {
  checkConfig();

  const { onChunk, onDone, onError } = callbacks;
  const { API_URL, API_KEY, APP_ID } = BAILIAN_CONFIG;

  // 构建完整的 API URL
  let fullApiUrl = API_URL;
  if (APP_ID && !API_URL.includes(APP_ID)) {
    fullApiUrl = `${API_URL.replace(/\/$/, "")}/${APP_ID}/completion`;
  }

  let fullText = "";
  let isAborted = false;
  let requestTask = null;

  // 构建请求体
  const requestBody = {
    input: {
      prompt,
    },
    parameters: {
      incremental_output: true,
    },
    debug: {},
  };

  // 拼接历史消息到 prompt
  if (history.length > 0) {
    const context = history
      .map((msg) => {
        const role = msg.role === "user" ? "用户" : "助手";
        return `${role}：${msg.content}`;
      })
      .join("\n");
    requestBody.input.prompt = `${context}\n用户：${prompt}\n助手：`;
  }

  console.log("[Bailian API] Request:", {
    url: fullApiUrl,
    body: requestBody,
  });

  // 检查基础库版本是否支持 enableChunked
  const systemInfo = wx.getSystemInfoSync();
  console.log("[Bailian API] System info:", systemInfo);

  const doRequest = () => {
    try {
      requestTask = wx.request({
        url: fullApiUrl,
        method: "POST",
        header: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
          Accept: "text/event-stream",
          "X-DashScope-SSE": "enable",
        },
        data: requestBody,
        responseType: "arraybuffer",
        enableChunked: true,
        timeout: 60000,
        success: (res) => {
          console.log("[Bailian API] Request success:", res);

          if (isAborted) {
            return;
          }

          if (res.statusCode < 200 || res.statusCode >= 300) {
            let errorMsg = `HTTP ${res.statusCode}`;
            // 尝试从 arraybuffer 中读取错误信息
            if (res.data instanceof ArrayBuffer) {
              try {
                const text = new TextDecoder("utf-8").decode(res.data);
                const json = JSON.parse(text);
                errorMsg = json.message || json.error?.message || errorMsg;
              } catch (e) {
                /* ignore */
              }
            }
            onError && onError(new Error(errorMsg));
            return;
          }

          onDone && onDone(fullText);
        },
        fail: (err) => {
          console.error("[Bailian API] Request fail:", err);
          if (isAborted) return;
          const errorMsg = err.errMsg || err.message || "网络请求失败";
          onError && onError(new Error(errorMsg));
        },
      });

      // 监听响应头
      requestTask.onHeadersReceived((res) => {
        console.log("[Bailian API] Headers received:", res);
      });

      // 监听数据块
      requestTask.onChunkReceived((res) => {
        if (isAborted) return;

        try {
          const arrayBuffer = res.data;
          if (!arrayBuffer || !(arrayBuffer instanceof ArrayBuffer)) {
            return;
          }

          const uint8Array = new Uint8Array(arrayBuffer);
          const text = new TextDecoder("utf-8").decode(uint8Array);

          console.log("[Bailian API] Chunk received:", text);

          // 简单的行处理
          const lines = text.split("\n");
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;

            const parsed = parseSSELine(trimmed);
            if (!parsed) continue;

            if (parsed.event === "error" || parsed.code) {
              const errorMsg = parsed.message || "服务器错误";
              onError && onError(new Error(errorMsg));
              return;
            }

            if (parsed.done) break;

            let chunkText = "";
            if (parsed.output?.text) {
              chunkText = parsed.output.text;
            } else if (parsed.output?.message?.content) {
              chunkText = parsed.output.message.content;
            } else if (parsed.output?.choices?.[0]?.message?.content) {
              chunkText = parsed.output.choices[0].message.content;
            }

            if (chunkText) {
              fullText += chunkText;
              onChunk && onChunk(chunkText, fullText);
            }

            if (parsed.output?.finish_reason === "stop") {
              break;
            }
          }
        } catch (err) {
          console.error("[Bailian API] Chunk processing error:", err);
        }
      });

      console.log("[Bailian API] Request task created:", requestTask);
    } catch (error) {
      console.error("[Bailian API] Request creation error:", error);
      onError && onError(error);
    }
  };

  // 启动请求
  doRequest();

  // 返回中止函数
  return () => {
    isAborted = true;
    if (requestTask) {
      requestTask.abort();
    }
  };
};

/**
 * 智能生成对话标题
 * @param {string} userContent - 用户内容
 * @param {string} assistantContent - AI 回复内容
 * @returns {Promise<string>} 生成的标题
 */
export const generateSmartTitle = async (userContent, assistantContent) => {
  if (!userContent) return "新对话";

  // 如果内容很短，直接截取
  if (userContent.length < 10) return userContent;

  try {
    const { API_URL, API_KEY, APP_ID } = BAILIAN_CONFIG;
    let fullApiUrl = API_URL;
    if (APP_ID && !API_URL.includes(APP_ID)) {
      fullApiUrl = `${API_URL.replace(/\/$/, "")}/${APP_ID}/completion`;
    }

    const res = await Taro.request({
      url: fullApiUrl,
      method: "POST",
      header: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      data: {
        input: {
          prompt: `请为以下对话生成一个不超过15个字的简短标题，不要包含标点符号，直接返回标题内容：\n用户：${userContent}\n助手：${assistantContent}`,
        },
      },
      timeout: 10000,
    });

    if (res.statusCode >= 200 && res.statusCode < 300) {
      let title = "";
      // 支持多种返回格式
      if (res.data?.output?.text) {
        title = res.data.output.text;
      } else if (res.data?.output?.message?.content) {
        title = res.data.output.message.content;
      } else if (res.data?.output?.choices?.[0]?.message?.content) {
        title = res.data.output.choices[0].message.content;
      }

      // 去除可能存在的引号（中英文单双引号、反引号）
      const cleanTitle = title.trim().replace(/^[""''``]+|[""''``]+$/g, "");
      return cleanTitle || generateChatTitle(userContent);
    }
  } catch (err) {
    console.error("智能标题生成失败:", err);
  }

  // 降级处理
  return generateChatTitle(userContent);
};

/**
 * 生成对话标题（基于第一条消息）
 * @param {string} firstMessage - 用户第一条消息
 * @returns {string} 标题
 */
export const generateChatTitle = (firstMessage) => {
  if (!firstMessage) return "新对话";

  const title = firstMessage.slice(0, 20);
  return title.length < firstMessage.length ? title + "..." : title;
};

/**
 * 保存对话历史到本地存储
 * @param {string} chatId - 对话 ID
 * @param {string} title - 对话标题
 * @param {Array} messages - 消息列表
 */
export const saveChatHistory = (chatId, title, messages) => {
  try {
    const history = Taro.getStorageSync("chat_history") || [];
    const existingIndex = history.findIndex((item) => item.id === chatId);

    const chatData = {
      id: chatId,
      title,
      messages,
      updateTime: Date.now(),
    };

    if (existingIndex >= 0) {
      history[existingIndex] = chatData;
    } else {
      history.unshift(chatData);
    }

    if (history.length > 50) {
      history.pop();
    }

    Taro.setStorageSync("chat_history", history);
  } catch (error) {
    console.error("保存对话历史失败:", error);
  }
};

/**
 * 获取对话历史列表
 * @returns {Array} 历史记录列表
 */
export const getChatHistoryList = () => {
  try {
    return Taro.getStorageSync("chat_history") || [];
  } catch {
    return [];
  }
};

/**
 * 获取单个对话详情
 * @param {string} chatId - 对话 ID
 * @returns {Object|null} 对话数据
 */
export const getChatById = (chatId) => {
  try {
    const history = Taro.getStorageSync("chat_history") || [];
    return history.find((item) => item.id === chatId) || null;
  } catch {
    return null;
  }
};

/**
 * 删除对话历史
 * @param {string} chatId - 对话 ID
 */
export const deleteChatHistory = (chatId) => {
  try {
    const history = Taro.getStorageSync("chat_history") || [];
    const newHistory = history.filter((item) => item.id !== chatId);
    Taro.setStorageSync("chat_history", newHistory);
  } catch (error) {
    console.error("删除对话历史失败:", error);
  }
};

/**
 * 生成对话 ID
 */
export const generateChatId = () => {
  return `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
