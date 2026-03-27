import request from "./request";

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
  });
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
  });
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
    url: `/api/service_map_type?id=${id}`,
    method: "PUT",
    data,
  });
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
    url: `/api/service_map_type?id=${id}`,
    method: "DELETE",
  });
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
    url: `/api/service_map_content?type_one=${typeOne}&type_two=${encodeURIComponent(typeTwo)}`,
    method: "GET",
  });
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
  });
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
    url: `/api/service_map_content?type_one=${typeOne}&type_two=${encodeURIComponent(typeTwo)}`,
    method: "PUT",
    data,
  });
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
    url: `/api/service_map_content?type_one=${typeOne}&type_two=${encodeURIComponent(typeTwo)}`,
    method: "DELETE",
  });
};
