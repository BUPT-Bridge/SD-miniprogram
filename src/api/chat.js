import request, { withQuery } from "./request";

export const saveAiChat = ({
  session_id = "",
  title = "",
  user_message,
  ai_response = "",
}) => {
  return request({
    url: "/api/ai_chat/save",
    method: "POST",
    data: {
      session_id,
      title,
      user_message,
      ai_response,
    },
  });
};

export const getAiChatSessions = ({ page = 1, page_size = 10 } = {}) => {
  return request({
    url: withQuery("/api/ai_chat/sessions", { page, page_size }),
    method: "GET",
  });
};

export const getAiChatSessionDetail = (session_id) => {
  return request({
    url: withQuery("/api/ai_chat/session", { session_id }),
    method: "GET",
  });
};
