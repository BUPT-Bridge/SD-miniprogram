import request, { withQuery } from "./request";
import proto from "./proto/policy";

const BASE_URL = (process.env.TARO_APP_API || "").replace(/\/+$/, "");
const PolicyTypeResponse = proto.api.policy.PolicyTypeResponse;
const PolicyFileResponse = proto.api.policy.PolicyFileResponse;

const normalizePolicyTypes = (data) => {
  const policyTypes = data.policyTypes || data.policy_types || [];
  return {
    ...data,
    policyTypes,
    policy_types: policyTypes,
  };
};

const normalizePolicyFiles = (data) => {
  const sourceFiles = data.policyFiles || data.policy_files || [];
  const policyFiles = sourceFiles.map((item) => {
    const createTime = item.createTime || item.create_time || "";
    const index = item.index || "";
    return {
      ...item,
      index,
      createTime,
      create_time: createTime,
    };
  });
  return {
    ...data,
    policyFiles,
    policy_files: policyFiles,
  };
};

const decodePolicyTypeResponse = (data) => {
  if (!(data instanceof ArrayBuffer) && !(data instanceof Uint8Array)) {
    return normalizePolicyTypes(data || {});
  }
  const message = PolicyTypeResponse.decode(
    data instanceof Uint8Array ? data : new Uint8Array(data),
  );
  const result = PolicyTypeResponse.toObject(message, {
    longs: String,
    enums: String,
    bytes: String,
  });
  return normalizePolicyTypes(result);
};

const decodePolicyFileResponse = (data) => {
  if (!(data instanceof ArrayBuffer) && !(data instanceof Uint8Array)) {
    return normalizePolicyFiles(data || {});
  }
  const message = PolicyFileResponse.decode(
    data instanceof Uint8Array ? data : new Uint8Array(data),
  );
  const result = PolicyFileResponse.toObject(message, {
    longs: String,
    enums: String,
    bytes: String,
  });
  return normalizePolicyFiles(result);
};

export const getPolicyType = () => {
  return request({
    url: "/api/policy_type",
    method: "GET",
    responseType: "arraybuffer",
  }).then((res) => decodePolicyTypeResponse(res));
};

export const getPolicyFile = (type) => {
  return request({
    url: withQuery("/api/policy_file", { type }),
    method: "GET",
    responseType: "arraybuffer",
  }).then((res) => decodePolicyFileResponse(res));
};

export const getPolicyFileIndexList = async (type) => {
  const res = await getPolicyFile(type);
  const files = res.policyFiles || res.policy_files || [];
  return files.map((file) => file.index).filter(Boolean);
};

export const buildPolicyPdfViewerUrl = (uuid) => {
  return `${BASE_URL}${withQuery("/api/mutil_media/pdf_viewer", {
    uuid,
    bigfile: true,
  })}`;
};
