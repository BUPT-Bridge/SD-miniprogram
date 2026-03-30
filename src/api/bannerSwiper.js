import protobuf from "protobufjs/minimal";
import request, { checkAuth, withQuery } from "./request";

const Reader = protobuf.Reader;

const normalizeLong = (value) => {
  if (value === null || value === undefined) return "";
  return typeof value === "object" && typeof value.toString === "function"
    ? value.toString()
    : String(value);
};

const decodeSlideshow = (reader, length) => {
  const end = length === undefined ? reader.len : reader.pos + length;
  const slideshow = {};

  while (reader.pos < end) {
    const tag = reader.uint32();
    switch (tag >>> 3) {
      case 1:
        slideshow.id = reader.int32();
        break;
      case 2:
        slideshow.index = reader.string();
        break;
      case 3:
        slideshow.create_time = normalizeLong(reader.int64());
        break;
      default:
        reader.skipType(tag & 7);
        break;
    }
  }

  return slideshow;
};

const decodeSlideshowResponse = (data) => {
  const bytes = data instanceof ArrayBuffer ? new Uint8Array(data) : data;
  const reader = Reader.create(bytes);
  const result = { slideshows: [] };

  while (reader.pos < reader.len) {
    const tag = reader.uint32();
    switch (tag >>> 3) {
      case 1:
        result.slideshows.push(decodeSlideshow(reader, reader.uint32()));
        break;
      case 2:
        result.code = reader.int32();
        break;
      case 3:
        result.message = reader.string();
        break;
      default:
        reader.skipType(tag & 7);
        break;
    }
  }

  return checkAuth(result);
};

export const getSlideShowList = () => {
  return request({
    url: "/api/slide_show",
    method: "GET",
    responseType: "arraybuffer",
  }).then((res) => decodeSlideshowResponse(res));
};

export const addSlideShow = (index) => {
  return request({
    url: withQuery("/api/slide_show", { index }),
    method: "POST",
    responseType: "arraybuffer",
  }).then((res) => decodeSlideshowResponse(res));
};

export const deleteSlideShow = (index) => {
  return request({
    url: withQuery("/api/slide_show", { index }),
    method: "DELETE",
    responseType: "arraybuffer",
  }).then((res) => decodeSlideshowResponse(res));
};
