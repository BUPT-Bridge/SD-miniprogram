import request, { withQuery } from "./request";

export const getSlideShowList = () => {
  return request({
    url: "/api/slide_show",
    method: "GET",
  });
};

export const addSlideShow = (index) => {
  return request({
    url: withQuery("/api/slide_show", { index }),
    method: "POST",
  });
};

export const deleteSlideShow = (index) => {
  return request({
    url: withQuery("/api/slide_show", { index }),
    method: "DELETE",
  });
};
