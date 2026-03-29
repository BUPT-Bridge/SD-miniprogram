import request, { withQuery } from "./request";

export const getPolicyTypes = () => {
  return request({
    url: "/api/policy_type",
    method: "GET",
  });
};

export const addPolicyType = (type) => {
  return request({
    url: "/api/policy_type",
    method: "POST",
    data: { type },
  });
};

export const updatePolicyType = (id, data) => {
  return request({
    url: withQuery("/api/policy_type", { id }),
    method: "PUT",
    data,
  });
};

export const deletePolicyType = (id) => {
  return request({
    url: withQuery("/api/policy_type", { id }),
    method: "DELETE",
  });
};

export const addPolicyFile = (data) => {
  return request({
    url: "/api/policy_file",
    method: "POST",
    data,
  });
};

export const getPolicyFiles = (type) => {
  return request({
    url: withQuery("/api/policy_file", { type }),
    method: "GET",
  });
};

export const updatePolicyFile = (id, data) => {
  return request({
    url: withQuery("/api/policy_file", { id }),
    method: "PUT",
    data,
  });
};

export const deletePolicyFile = (id) => {
  return request({
    url: withQuery("/api/policy_file", { id }),
    method: "DELETE",
  });
};
