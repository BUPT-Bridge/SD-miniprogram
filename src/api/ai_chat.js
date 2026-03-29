import Taro from "@tarojs/taro";
import request from "./request";
import {
  SaveChatRequest,
  SaveChatResponse,
  GetSessionListResponse,
  GetSessionResponse,
} from "./proto/ai_chat";

const normalizeSavePayload = (data = {}) => ({
  sessionId: data.sessionId ?? data.session_id ?? "",
  title: data.title ?? "",
  userMessage: data.userMessage ?? data.user_message ?? "",
  aiResponse: data.aiResponse ?? data.ai_response ?? "",
  messageType: data.messageType ?? data.message_type ?? 0,
});

const normalizeSaveResponse = (decoded) => ({
  ...decoded,
  session_id: decoded.sessionId,
  sessionId: decoded.sessionId,
  message_info: decoded.messageInfo,
  messageInfo: decoded.messageInfo,
});

/**
 * 保存对话记录
 * POST /api/ai_chat/save
 */
export const saveChatMessage = (data) => {
  const payload = normalizeSavePayload(data);
  const message = SaveChatRequest.create(payload);
  const buffer = SaveChatRequest.encode(message).finish();

  return request({
    url: "/api/ai_chat/save",
    method: "POST",
    header: {
      "Content-Type": "application/x-protobuf",
      Authorization: Taro.getStorageSync("token") || "",
    },
    data: buffer.buffer.slice(
      buffer.byteOffset,
      buffer.byteOffset + buffer.byteLength,
    ),
    responseType: "arraybuffer",
  })
    .then((res) => {
      console.log("saveChatMessage 原始返回:", res);
      const bufferData = res.data || res;
      const decoded = SaveChatResponse.decode(new Uint8Array(bufferData));
      const normalized = normalizeSaveResponse(decoded);
      console.log("saveChatMessage 解析后:", normalized);
      return normalized;
    })
    .catch((err) => {
      console.error("saveChatMessage 请求或解析失败:", err);
      throw err;
    });
};

/**
 * 获取会话列表
 * GET /api/ai_chat/sessions?page=1&page_size=10
 */
export const getChatSessions = (page = 1, pageSize = 10) => {
  console.log(
    "[API] getChatSessions 开始调用, page:",
    page,
    "pageSize:",
    pageSize,
  );

  return request({
    url: `/api/ai_chat/sessions?page=${page}&page_size=${pageSize}`,
    method: "GET",
    header: {
      Authorization: Taro.getStorageSync("token") || "",
    },
    responseType: "arraybuffer",
  })
    .then((res) => {
      console.log("[API] getChatSessions 原始返回:", res);

      const bufferData = res.data || res;

      if (!bufferData || bufferData.byteLength === 0) {
        console.error("[API] 未能获取到有效的 ArrayBuffer:", res);
        throw new Error("Empty response arraybuffer");
      }

      try {
        const decoded = GetSessionListResponse.decode(
          new Uint8Array(bufferData),
        );
        console.log("[API] getChatSessions 解码成功:");
        console.log("  - code:", decoded.code);
        console.log("  - message:", decoded.message);
        console.log("  - total:", decoded.total);
        console.log(
          "  - sessions 数组长度:",
          decoded.sessions ? decoded.sessions.length : 0,
        );

        if (decoded.sessions && decoded.sessions.length > 0) {
          console.log("[API] sessions 列表:");
          decoded.sessions.forEach((s, i) => {
            console.log(
              `  [${i}] ${s.sessionId || s.session_id}: ${s.title} (${s.messageCount || s.message_count}条消息)`,
            );
          });
        }

        return decoded;
      } catch (decodeError) {
        console.error("[API] GetSessionListResponse 解码失败:", decodeError);
        throw decodeError;
      }
    })
    .catch((err) => {
      console.error("[API] getChatSessions 请求失败:", err);
      throw err;
    });
};

/**
 * 获取单个会话的详细对话记录
 * GET /api/ai_chat/session?session_id=xxx
 */
export const getChatSessionDetail = (sessionId) => {
  console.log("[API] getChatSessionDetail 开始调用, sessionId:", sessionId);

  return request({
    url: `/api/ai_chat/session?session_id=${sessionId}`,
    method: "GET",
    header: {
      Authorization: Taro.getStorageSync("token") || "",
    },
    responseType: "arraybuffer",
  })
    .then((res) => {
      console.log("[API] getChatSessionDetail 原始返回:", res);
      const bufferData = res.data || res;

      if (!bufferData || bufferData.byteLength === 0) {
        console.error("[API] 未能获取到有效的 ArrayBuffer:", res);
        throw new Error("Empty response arraybuffer");
      }

      console.log(
        "[API] getChatSessionDetail 开始解码, buffer长度:",
        bufferData.byteLength,
      );

      try {
        const decoded = GetSessionResponse.decode(new Uint8Array(bufferData));
        console.log("[API] getChatSessionDetail 解码成功:", decoded);

        // 详细输出每个字段
        console.log("[API] GetSessionResponse 详细内容:");
        console.log("  - session_id:", decoded.sessionId || decoded.session_id);
        console.log("  - title:", decoded.title);
        console.log("  - openid:", decoded.openid);
        console.log(
          "  - total_messages:",
          decoded.totalMessages || decoded.total_messages,
        );
        console.log("  - created_at:", decoded.createdAt || decoded.created_at);
        console.log(
          "  - last_message_at:",
          decoded.lastMessageAt || decoded.last_message_at,
        );
        console.log("  - code:", decoded.code);
        console.log("  - message:", decoded.message);
        console.log(
          "  - messages 数组长度:",
          decoded.messages ? decoded.messages.length : 0,
        );

        if (decoded.messages && decoded.messages.length > 0) {
          console.log("[API] 第一条消息:", decoded.messages[0]);
          console.log(
            "[API] 最后一条消息:",
            decoded.messages[decoded.messages.length - 1],
          );
        }

        return decoded;
      } catch (decodeError) {
        console.error("[API] GetSessionResponse 解码失败:", decodeError);
        throw decodeError;
      }
    })
    .catch((err) => {
      console.error("[API] getChatSessionDetail 请求失败:", err);
      throw err;
    });
};
