import protobuf from "protobufjs/minimal";
import request, { checkAuth } from "./request";

const Reader = protobuf.Reader;

const decodeNotice = (reader, length) => {
  const end = length === undefined ? reader.len : reader.pos + length;
  const notice = {};

  while (reader.pos < end) {
    const tag = reader.uint32();
    switch (tag >>> 3) {
      case 1:
        notice.id = reader.int32();
        break;
      case 2:
        notice.content = reader.string();
        break;
      default:
        reader.skipType(tag & 7);
        break;
    }
  }

  return notice;
};

const decodeNoticeResponse = (data) => {
  const bytes = data instanceof ArrayBuffer ? new Uint8Array(data) : data;
  const reader = Reader.create(bytes);
  const result = {};

  while (reader.pos < reader.len) {
    const tag = reader.uint32();
    switch (tag >>> 3) {
      case 1:
        result.notice = decodeNotice(reader, reader.uint32());
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

export const getLatestNotice = () => {
  return request({
    url: "/api/notice/insert",
    method: "GET",
    responseType: "arraybuffer",
  }).then((res) => decodeNoticeResponse(res));
};

export const upsertNotice = (content) => {
  return request({
    url: "/api/notice/insert",
    method: "POST",
    data: { content },
    responseType: "arraybuffer",
  }).then((res) => decodeNoticeResponse(res));
};
