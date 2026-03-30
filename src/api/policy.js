import Taro from "@tarojs/taro";
import request from "./request";
import proto from "./proto/policy";

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
    header: {
      Authorization: Taro.getStorageSync("token") || "",
    },
    responseType: "arraybuffer",
  }).then((res) => decodePolicyTypeResponse(res));
};

export const getPolicyFile = (type) => {
  return request({
    url: `/api/policy_file?type=${encodeURIComponent(type)}`,
    method: "GET",
    header: {
      Authorization: Taro.getStorageSync("token") || "",
    },
    responseType: "arraybuffer",
  }).then((res) => decodePolicyFileResponse(res));
};

//文件内容列表
export const getPolicyFileIndexList = async (type) => {
  const res = await getPolicyFile(type);
  const files = res.policyFiles || res.policy_files || [];
  return files.map((file) => file.index).filter(Boolean);
};

//uuid拼接函数
const createAbortError = () => {
  const error = new Error("请求已取消");
  error.name = "AbortError";
  return error;
};

const throwIfAborted = (signal) => {
  if (signal?.aborted) {
    throw createAbortError();
  }
};

export const getPolicyPdfBufferByUuid = async (uuid, options = {}) => {
  const { signal } = options;
  const token = Taro.getStorageSync("token") || "";
  const encoded = encodeURIComponent(uuid || "");
  const candidateUrls = [
    `${process.env.TARO_APP_API}/api/mutil_media/download?uuid=${encoded}&bigfile=true`,
  ];

  const fs = Taro.getFileSystemManager();
  const normalizeArrayBuffer = (fileData) => {
    if (fileData instanceof ArrayBuffer) {
      return fileData;
    }
    if (fileData instanceof Uint8Array) {
      return fileData.buffer.slice(
        fileData.byteOffset,
        fileData.byteOffset + fileData.byteLength,
      );
    }
    return null;
  };

  const containsPdfMagic = (arrayBuffer) => {
    if (!arrayBuffer) {
      return false;
    }
    const bytes = new Uint8Array(arrayBuffer);
    const max = Math.min(bytes.length - 4, 1024);
    for (let i = 0; i <= max; i += 1) {
      if (
        bytes[i] === 0x25 &&
        bytes[i + 1] === 0x50 &&
        bytes[i + 2] === 0x44 &&
        bytes[i + 3] === 0x46
      ) {
        return true;
      }
    }
    return false;
  };

  const containsPdfEof = (arrayBuffer) => {
    if (!arrayBuffer) {
      return false;
    }
    const bytes = new Uint8Array(arrayBuffer);
    if (bytes.length < 5) {
      return false;
    }
    const start = Math.max(0, bytes.length - 2048);
    for (let i = bytes.length - 5; i >= start; i -= 1) {
      if (
        bytes[i] === 0x25 &&
        bytes[i + 1] === 0x25 &&
        bytes[i + 2] === 0x45 &&
        bytes[i + 3] === 0x4f &&
        bytes[i + 4] === 0x46
      ) {
        return true;
      }
    }
    return false;
  };

  const isValidPdfBuffer = (arrayBuffer) => {
    if (!arrayBuffer || arrayBuffer.byteLength === 0) {
      return false;
    }
    if (!containsPdfMagic(arrayBuffer)) {
      return false;
    }
    return containsPdfEof(arrayBuffer);
  };

  const tryRequestBinary = async (url) => {
    throwIfAborted(signal);
    const requestRes = await new Promise((resolve, reject) => {
      const onAbort = () => {
        if (task && typeof task.abort === "function") {
          task.abort();
        }
        reject(createAbortError());
      };
      let task = null;
      if (signal) {
        signal.addEventListener("abort", onAbort, { once: true });
      }
      task = Taro.request({
        url,
        method: "GET",
        responseType: "arraybuffer",
        header: {
          Authorization: token,
        },
        success: (res) => {
          if (signal) {
            signal.removeEventListener("abort", onAbort);
          }
          resolve(res);
        },
        fail: (error) => {
          if (signal) {
            signal.removeEventListener("abort", onAbort);
          }
          reject(error);
        },
      });
    });
    throwIfAborted(signal);
    if (requestRes.statusCode !== 200) {
      return null;
    }
    const arrayBuffer = normalizeArrayBuffer(requestRes.data);
    if (!isValidPdfBuffer(arrayBuffer)) {
      return null;
    }
    return arrayBuffer;
  };

  const tryDownload = async (url) => {
    throwIfAborted(signal);
    const downloadRes = await new Promise((resolve, reject) => {
      const onAbort = () => {
        if (task && typeof task.abort === "function") {
          task.abort();
        }
        reject(createAbortError());
      };
      let task = null;
      if (signal) {
        signal.addEventListener("abort", onAbort, { once: true });
      }
      task = Taro.downloadFile({
        url,
        header: {
          Authorization: token,
        },
        success: (res) => {
          if (signal) {
            signal.removeEventListener("abort", onAbort);
          }
          resolve(res);
        },
        fail: (error) => {
          if (signal) {
            signal.removeEventListener("abort", onAbort);
          }
          reject(error);
        },
      });
    });
    throwIfAborted(signal);
    if (downloadRes.statusCode !== 200) {
      return null;
    }
    const fileInfo = await new Promise((resolve, reject) => {
      fs.getFileInfo({
        filePath: downloadRes.tempFilePath,
        success: resolve,
        fail: reject,
      });
    });
    if (!fileInfo?.size) {
      return null;
    }
    throwIfAborted(signal);
    const fileData = await new Promise((resolve, reject) => {
      fs.readFile({
        filePath: downloadRes.tempFilePath,
        encoding: "",
        success: (res) => resolve(res.data),
        fail: (error) => reject(error),
      });
    });
    throwIfAborted(signal);
    const arrayBuffer = normalizeArrayBuffer(fileData);
    if (!isValidPdfBuffer(arrayBuffer)) {
      return null;
    }
    return arrayBuffer;
  };

  for (const url of candidateUrls) {
    throwIfAborted(signal);
    try {
      const requestBuffer = await tryRequestBinary(url);
      if (requestBuffer) {
        return requestBuffer;
      }
      const buffer = await tryDownload(url);
      if (buffer) {
        return buffer;
      }
    } catch (error) {
      if (error?.name === "AbortError") {
        throw error;
      }
    }
  }

  throw new Error("PDF 文件为空或参数名不匹配（请确认后端使用 uuid 还是 uid）");
};
