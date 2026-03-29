import request, { withQuery } from "./request";

const buildServiceApi = (serviceName) => `/api/${serviceName}_service`;

const getServiceList = (serviceName) => {
  return request({
    url: buildServiceApi(serviceName),
    method: "GET",
  });
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
