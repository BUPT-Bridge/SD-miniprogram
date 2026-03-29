import request from "./request";

export const getLatestNotice = () => {
  return request({
    url: "/api/notice/insert",
    method: "GET",
  });
};

export const upsertNotice = (content) => {
  return request({
    url: "/api/notice/insert",
    method: "POST",
    data: { content },
  });
};
