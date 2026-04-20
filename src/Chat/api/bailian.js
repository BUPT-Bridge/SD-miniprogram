import Taro from "@tarojs/taro";
import { BAILIAN_CONFIG } from "../config/bailian";

/* global wx */

/**
 * 检查配置是否完整
 */
const checkConfig = () => {
  const { API_URL } = BAILIAN_CONFIG;
  if (!API_URL) {
    throw new Error("百炼 API 配置不完整，请先填写 API_URL");
  }
};

const buildApiUrl = () => {
  const { API_URL, APP_ID } = BAILIAN_CONFIG;
  if (APP_ID && !API_URL.includes(APP_ID)) {
    return `${API_URL.replace(/\/$/, "")}/${APP_ID}/completion`;
  }
  return API_URL;
};

const appendCodePoint = (codePoint) => {
  if (codePoint <= 0xffff) {
    return String.fromCharCode(codePoint);
  }

  const offset = codePoint - 0x10000;
  return String.fromCharCode(
    0xd800 + (offset >> 10),
    0xdc00 + (offset & 0x3ff),
  );
};

const createUtf8Decoder = () => {
  let codePoint = 0;
  let bytesNeeded = 0;

  const reset = () => {
    codePoint = 0;
    bytesNeeded = 0;
  };

  const decode = (arrayBuffer) => {
    if (!arrayBuffer || !(arrayBuffer instanceof ArrayBuffer)) return "";

    const bytes = new Uint8Array(arrayBuffer);
    let text = "";

    for (let index = 0; index < bytes.length; index += 1) {
      const byte = bytes[index];

      if (bytesNeeded === 0) {
        if (byte <= 0x7f) {
          text += String.fromCharCode(byte);
        } else if (byte >= 0xc2 && byte <= 0xdf) {
          codePoint = byte & 0x1f;
          bytesNeeded = 1;
        } else if (byte >= 0xe0 && byte <= 0xef) {
          codePoint = byte & 0x0f;
          bytesNeeded = 2;
        } else if (byte >= 0xf0 && byte <= 0xf4) {
          codePoint = byte & 0x07;
          bytesNeeded = 3;
        } else {
          text += "\ufffd";
        }
        continue;
      }

      if ((byte & 0xc0) === 0x80) {
        codePoint = (codePoint << 6) | (byte & 0x3f);
        bytesNeeded -= 1;

        if (bytesNeeded === 0) {
          text += appendCodePoint(codePoint);
          codePoint = 0;
        }
      } else {
        text += "\ufffd";
        reset();
        index -= 1;
      }
    }

    return text;
  };

  const flush = () => {
    if (bytesNeeded === 0) return "";
    reset();
    return "\ufffd";
  };

  return { decode, flush };
};

const decodeArrayBuffer = (arrayBuffer) => {
  if (typeof TextDecoder !== "undefined") {
    return new TextDecoder("utf-8").decode(arrayBuffer);
  }

  const decoder = createUtf8Decoder();
  return decoder.decode(arrayBuffer) + decoder.flush();
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

const getParsedChunkText = (parsed) => {
  if (parsed.output?.text) {
    return parsed.output.text;
  }
  if (parsed.output?.message?.content) {
    return parsed.output.message.content;
  }
  if (parsed.output?.choices?.[0]?.message?.content) {
    return parsed.output.choices[0].message.content;
  }
  return "";
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
export const sendMessageStream = (
  prompt,
  history = [],
  callbacks = {},
  options = {},
) => {
  checkConfig();
  const apiKey = options.apiKey || "";
  if (!apiKey) {
    throw new Error("未获取到 API Key，请先登录");
  }

  const { onChunk, onDone, onError } = callbacks;
  const fullApiUrl = buildApiUrl();

  let fullText = "";
  let isAborted = false;
  let requestTask = null;
  let sseBuffer = "";
  const streamDecoder = createUtf8Decoder();

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

  const processParsedSSELine = (line) => {
    const trimmed = line.trim();
    if (!trimmed) return false;

    const parsed = parseSSELine(trimmed);
    if (!parsed) return false;

    if (parsed.event === "error" || parsed.code) {
      const errorMsg = parsed.message || "Server error";
      onError && onError(new Error(errorMsg));
      return true;
    }

    if (parsed.done) return true;

    const chunkText = getParsedChunkText(parsed);
    if (chunkText) {
      fullText += chunkText;
      onChunk && onChunk(chunkText, fullText);
    }

    return parsed.output?.finish_reason === "stop";
  };

  const drainSSEBuffer = (text = "", flush = false) => {
    sseBuffer += text;
    const lines = sseBuffer.split(/\r?\n/);

    if (flush) {
      sseBuffer = "";
    } else {
      sseBuffer = lines.pop() || "";
    }

    for (const line of lines) {
      if (processParsedSSELine(line)) return true;
    }

    if (flush && sseBuffer.trim()) {
      return processParsedSSELine(sseBuffer);
    }

    return false;
  };

  const doRequest = () => {
    try {
      requestTask = wx.request({
        url: fullApiUrl,
        method: "POST",
        header: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
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
                const text = decodeArrayBuffer(res.data);
                const json = JSON.parse(text);
                errorMsg = json.message || json.error?.message || errorMsg;
              } catch (e) {
                /* ignore */
              }
            }
            onError && onError(new Error(errorMsg));
            return;
          }

          drainSSEBuffer(streamDecoder.flush(), true);
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

          const text = streamDecoder.decode(arrayBuffer);

          console.log("[Bailian API] Chunk received:", text);

          drainSSEBuffer(text);
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
export const generateSmartTitle = async (
  userContent,
  assistantContent,
  apiKey = "",
) => {
  if (!userContent) return "新对话";

  // 如果内容很短，直接截取
  if (userContent.length < 10) return userContent;
  if (!apiKey) return generateChatTitle(userContent);

  try {
    const fullApiUrl = buildApiUrl();

    const res = await Taro.request({
      url: fullApiUrl,
      method: "POST",
      header: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
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
