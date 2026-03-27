import protobuf from "protobufjs/minimal";
import request, { checkAuth, withQuery } from "./request";

const Reader = protobuf.Reader;

const decodeServiceMapType = (reader, length) => {
  const end = length === undefined ? reader.len : reader.pos + length;
  const item = {};

  while (reader.pos < end) {
    const tag = reader.uint32();
    switch (tag >>> 3) {
      case 1:
        item.id = reader.int32();
        break;
      case 2:
        item.community_name = reader.string();
        break;
      case 3:
        item.type_sum = reader.int32();
        break;
      case 4:
        item.type_name = reader.string();
        break;
      default:
        reader.skipType(tag & 7);
        break;
    }
  }

  return item;
};

const decodeServiceMapContent = (reader, length) => {
  const end = length === undefined ? reader.len : reader.pos + length;
  const item = {};

  while (reader.pos < end) {
    const tag = reader.uint32();
    switch (tag >>> 3) {
      case 1:
        item.id = reader.int32();
        break;
      case 2:
        item.type_one = reader.int32();
        break;
      case 3:
        item.type_two = reader.string();
        break;
      case 4:
        item.content = reader.string();
        break;
      default:
        reader.skipType(tag & 7);
        break;
    }
  }

  return item;
};

const decodeTypeResponse = (data) => {
  const bytes = data instanceof ArrayBuffer ? new Uint8Array(data) : data;
  const reader = Reader.create(bytes);
  const result = { service_map_types: [] };

  while (reader.pos < reader.len) {
    const tag = reader.uint32();
    switch (tag >>> 3) {
      case 1:
        result.service_map_types.push(
          decodeServiceMapType(reader, reader.uint32()),
        );
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

const decodeContentResponse = (data) => {
  const bytes = data instanceof ArrayBuffer ? new Uint8Array(data) : data;
  const reader = Reader.create(bytes);
  const result = { service_map_contents: [] };

  while (reader.pos < reader.len) {
    const tag = reader.uint32();
    switch (tag >>> 3) {
      case 1:
        result.service_map_contents.push(
          decodeServiceMapContent(reader, reader.uint32()),
        );
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

/**
 * 获取养老服务资源地图类型列表
 * GET /api/service_map_type
 *
 * @returns {Promise<{
 *   service_map_types: Array<{
 *     id: number,
 *     community_name: string,
 *     type_sum: number,
 *     type_name: string,
 *   }>,
 *   code: number,
 *   message: string,
 * }>}
 */
export const getServiceMapTypes = () => {
  return request({
    url: "/api/service_map_type",
    method: "GET",
    responseType: "arraybuffer",
  }).then((res) => decodeTypeResponse(res));
};

/**
 * 新增养老服务资源地图类型
 * POST /api/service_map_type
 *
 * @param {{ community_name: string, type_sum: number, type_name: string }} data
 * @returns {Promise<{ service_map_types: Array, code: number, message: string }>}
 */
export const addServiceMapType = (data) => {
  return request({
    url: "/api/service_map_type",
    method: "POST",
    data,
    responseType: "arraybuffer",
  }).then((res) => decodeTypeResponse(res));
};

/**
 * 修改养老服务资源地图类型
 * PUT /api/service_map_type?id=x
 *
 * @param {number} id
 * @param {{ community_name?: string, type_sum?: number, type_name?: string }} data
 * @returns {Promise<{ service_map_types: Array, code: number, message: string }>}
 */
export const updateServiceMapType = (id, data) => {
  return request({
    url: withQuery("/api/service_map_type", { id }),
    method: "PUT",
    data,
    responseType: "arraybuffer",
  }).then((res) => decodeTypeResponse(res));
};

/**
 * 删除养老服务资源地图类型
 * DELETE /api/service_map_type?id=x
 *
 * @param {number} id
 * @returns {Promise<{ code: number, message: string }>}
 */
export const deleteServiceMapType = (id) => {
  return request({
    url: withQuery("/api/service_map_type", { id }),
    method: "DELETE",
    responseType: "arraybuffer",
  }).then((res) => decodeTypeResponse(res));
};

// ============ service_map_content 服务地图具体内容 ============

/**
 * 获取服务地图具体内容列表
 * GET /api/service_map_content?type_one=xx&type_two=xx
 *
 * @param {number} typeOne - 对应 service_map_types 的 id（用户点击的一级目录）
 * @param {string} typeTwo - 对应 type_name JSON 中的类型名称（用户点击的二级目录）
 * @returns {Promise<{
 *   service_map_contents: Array<{
 *     id: number,
 *     type_one: number,
 *     type_two: string,
 *     content: string,
 *   }>,
 *   code: number,
 *   message: string,
 * }>}
 */
export const getServiceMapContents = (typeOne, typeTwo) => {
  return request({
    url: withQuery("/api/service_map_content", {
      type_one: typeOne,
      type_two: typeTwo,
    }),
    method: "GET",
    responseType: "arraybuffer",
  }).then((res) => decodeContentResponse(res));
};

/**
 * 新增服务地图具体内容
 * POST /api/service_map_content
 *
 * - type_one: 对应 service_map_types 中的 id
 * - type_two: 对应 service_map_types 中 type_name JSON 里某个类型的名字
 * - content:  JSON 转字符串，包含层级结构用于渲染第三级目录
 *
 * @param {{ type_one: number, type_two: string, content: string }} data
 * @returns {Promise<{ service_map_contents: Array, code: number, message: string }>}
 */
export const addServiceMapContent = (data) => {
  return request({
    url: "/api/service_map_content",
    method: "POST",
    data,
    responseType: "arraybuffer",
  }).then((res) => decodeContentResponse(res));
};

/**
 * 修改服务地图具体内容
 * PUT /api/service_map_content?type_one=xx&type_two=xx
 *
 * @param {number} typeOne - 对应 service_map_types 的 id
 * @param {string} typeTwo - 对应 type_name JSON 中的类型名称
 * @param {{ type_one?: number, type_two?: string, content?: string }} data
 * @returns {Promise<{ service_map_contents: Array, code: number, message: string }>}
 */
export const updateServiceMapContent = (typeOne, typeTwo, data) => {
  return request({
    url: withQuery("/api/service_map_content", {
      type_one: typeOne,
      type_two: typeTwo,
    }),
    method: "PUT",
    data,
    responseType: "arraybuffer",
  }).then((res) => decodeContentResponse(res));
};

/**
 * 删除服务地图具体内容
 * DELETE /api/service_map_content?type_one=xx&type_two=xx
 *
 * @param {number} typeOne - 对应 service_map_types 的 id
 * @param {string} typeTwo - 对应 type_name JSON 中的类型名称
 * @returns {Promise<{ code: number, message: string }>}
 */
export const deleteServiceMapContent = (typeOne, typeTwo) => {
  return request({
    url: withQuery("/api/service_map_content", {
      type_one: typeOne,
      type_two: typeTwo,
    }),
    method: "DELETE",
    responseType: "arraybuffer",
  }).then((res) => decodeContentResponse(res));
};
