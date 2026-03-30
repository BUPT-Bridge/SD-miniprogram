import protobuf from "protobufjs/minimal";
import request, { checkAuth, withQuery } from "./request";

const Reader = protobuf.Reader;

const normalizeLong = (value) => {
  if (value === null || value === undefined) return "";
  return typeof value === "object" && typeof value.toString === "function"
    ? value.toString()
    : String(value);
};

const decodeCommunityService = (reader, length) => {
  const end = length === undefined ? reader.len : reader.pos + length;
  const message = {};

  while (reader.pos < end) {
    const tag = reader.uint32();
    switch (tag >>> 3) {
      case 1:
        message.id = reader.int32();
        break;
      case 2:
        message.name = reader.string();
        break;
      case 3:
        message.address = reader.string();
        break;
      case 4:
        message.phone = reader.string();
        break;
      case 5:
        message.latitude = reader.float();
        break;
      case 6:
        message.longitude = reader.float();
        break;
      case 7:
        message.create_time = normalizeLong(reader.int64());
        break;
      default:
        reader.skipType(tag & 7);
        break;
    }
  }

  return message;
};

const decodeMedicalService = (reader, length) => {
  const end = length === undefined ? reader.len : reader.pos + length;
  const message = {};

  while (reader.pos < end) {
    const tag = reader.uint32();
    switch (tag >>> 3) {
      case 1:
        message.id = reader.int32();
        break;
      case 2:
        message.name = reader.string();
        break;
      case 3:
        message.address = reader.string();
        break;
      case 4:
        message.phone = reader.string();
        break;
      case 5:
        message.latitude = reader.float();
        break;
      case 6:
        message.longitude = reader.float();
        break;
      case 7:
        message.service_time = reader.string();
        break;
      case 8:
        message.create_time = normalizeLong(reader.int64());
        break;
      default:
        reader.skipType(tag & 7);
        break;
    }
  }

  return message;
};

const decodeResourceService = (reader, length) => {
  const end = length === undefined ? reader.len : reader.pos + length;
  const message = {};

  while (reader.pos < end) {
    const tag = reader.uint32();
    switch (tag >>> 3) {
      case 1:
        message.id = reader.int32();
        break;
      case 2:
        message.name = reader.string();
        break;
      case 3:
        message.address = reader.string();
        break;
      case 4:
        message.phone = reader.string();
        break;
      case 5:
        message.latitude = reader.float();
        break;
      case 6:
        message.longitude = reader.float();
        break;
      case 7:
        message.service_time = reader.string();
        break;
      case 8:
        message.boss = reader.string();
        break;
      case 9:
        message.create_time = normalizeLong(reader.int64());
        break;
      default:
        reader.skipType(tag & 7);
        break;
    }
  }

  return message;
};

const decodeResponse = (bytes, listFieldName, decodeItem) => {
  const reader = bytes instanceof Reader ? bytes : Reader.create(bytes);
  const end = reader.len;
  const message = { [listFieldName]: [] };

  while (reader.pos < end) {
    const tag = reader.uint32();
    switch (tag >>> 3) {
      case 1:
        message[listFieldName].push(decodeItem(reader, reader.uint32()));
        break;
      case 2:
        message.code = reader.int32();
        break;
      case 3:
        message.message = reader.string();
        break;
      default:
        reader.skipType(tag & 7);
        break;
    }
  }

  return message;
};

const SERVICE_DECODERS = {
  community: (bytes) =>
    decodeResponse(bytes, "community_services", decodeCommunityService),
  medical: (bytes) =>
    decodeResponse(bytes, "medical_services", decodeMedicalService),
  resource: (bytes) =>
    decodeResponse(bytes, "resource_services", decodeResourceService),
};

const decodeServiceResponse = (serviceName, data) => {
  const decode = SERVICE_DECODERS[serviceName];
  if (!decode) {
    throw new Error(`Unsupported service type: ${serviceName}`);
  }

  try {
    const bytes = data instanceof ArrayBuffer ? new Uint8Array(data) : data;
    const obj = decode(bytes);
    return checkAuth(obj);
  } catch (error) {
    if (error?.code === 401) throw error;
    console.error(`Proto decode ${serviceName} failed:`, error);
    throw error;
  }
};

const buildServiceApi = (serviceName) => `/api/${serviceName}_service`;

const getServiceList = (serviceName) => {
  return request({
    url: buildServiceApi(serviceName),
    method: "GET",
    responseType: "arraybuffer",
  }).then((res) => decodeServiceResponse(serviceName, res));
};

const addService = (serviceName, data) => {
  return request({
    url: buildServiceApi(serviceName),
    method: "POST",
    data,
  });
};

const updateService = (serviceName, id, data) => {
  return request({
    url: withQuery(buildServiceApi(serviceName), { id }),
    method: "PUT",
    data,
  });
};

const deleteService = (serviceName, id) => {
  return request({
    url: withQuery(buildServiceApi(serviceName), { id }),
    method: "DELETE",
  });
};

/**
 * 获取卫生服务站列表
 * GET /api/medical_service
 *
 * @returns {Promise<{
 *   medical_services: Array<{
 *     id: number,
 *     name: string,
 *     address: string,
 *     phone: string,
 *     latitude: number,
 *     longitude: number,
 *     service_time: string,
 *     create_time: string,
 *   }>,
 *   code: number,
 *   message: string,
 * }>}
 */
export const getMedicalServices = () => {
  return getServiceList("medical");
};

/**
 * 新增卫生服务站
 * POST /api/medical_service
 *
 * @param {{ name: string, address: string, phone: string, latitude: number, longitude: number, service_time: string }} data
 * @returns {Promise<{ medical_services: Array, code: number, message: string }>}
 */
export const addMedicalService = (data) => {
  return addService("medical", data);
};

/**
 * 修改卫生服务站
 * PUT /api/medical_service?id=xx
 *
 * @param {number} id
 * @param {{ name?: string, address?: string, phone?: string, latitude?: number, longitude?: number, service_time?: string }} data
 * @returns {Promise<{ medical_services: Array, code: number, message: string }>}
 */
export const updateMedicalService = (id, data) => {
  return updateService("medical", id, data);
};

/**
 * 删除卫生服务站
 * DELETE /api/medical_service?id=xx
 *
 * @param {number} id
 * @returns {Promise<{ code: number, message: string }>}
 */
export const deleteMedicalService = (id) => {
  return deleteService("medical", id);
};

export const getCommunityServices = () => getServiceList("community");

export const addCommunityService = (data) => addService("community", data);

export const updateCommunityService = (id, data) =>
  updateService("community", id, data);

export const deleteCommunityService = (id) => deleteService("community", id);

export const getResourceServices = () => getServiceList("resource");

export const addResourceService = (data) => addService("resource", data);

export const updateResourceService = (id, data) =>
  updateService("resource", id, data);

export const deleteResourceService = (id) => deleteService("resource", id);
