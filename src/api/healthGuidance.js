import Taro from "@tarojs/taro";
import request, { withQuery } from "./request";
import proto from "./proto/health_guidance";

const HealthGuideTypeResponse =
  proto.api.health_guidance.HealthGuideTypeResponse;
const HealthGuideContentResponse =
  proto.api.health_guidance.HealthGuideContentResponse;

const toUint8Array = (data) => {
  if (data instanceof Uint8Array) {
    return data;
  }
  if (data instanceof ArrayBuffer) {
    return new Uint8Array(data);
  }
  return null;
};

const parseJsonField = (value, fallback) => {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }
  if (typeof value === "object") {
    return value;
  }
  if (typeof value !== "string") {
    return fallback;
  }
  try {
    return JSON.parse(value);
  } catch (error) {
    return fallback;
  }
};

const normalizeTypeTwoOptions = (rawTypeTwo) => {
  const parsed = parseJsonField(rawTypeTwo, []);
  if (Array.isArray(parsed)) {
    return parsed.map((item) => String(item));
  }
  if (parsed && typeof parsed === "object") {
    return Object.values(parsed).map((item) => String(item));
  }
  if (typeof rawTypeTwo === "string" && rawTypeTwo.trim()) {
    return [rawTypeTwo.trim()];
  }
  return [];
};

const normalizeHealthGuideTypes = (data = {}) => {
  const sourceList = data.healthGuideTypes || data.health_guide_types || [];
  const healthGuideTypes = sourceList.map((item) => {
    const typeName = item.typeName ?? item.type_name ?? "";
    const typeSum = item.typeSum ?? item.type_sum ?? 0;
    const typeTwo = item.typeTwo ?? item.type_two ?? "";
    const description = item.description ?? "";
    const typeOne = item.id ?? 0;
    const typeTwoOptions = normalizeTypeTwoOptions(typeTwo);
    return {
      ...item,
      id: typeOne,
      typeOne,
      type_name: typeName,
      typeName,
      type_sum: typeSum,
      typeSum,
      type_two: typeTwo,
      typeTwo,
      description,
      typeTwoOptions,
    };
  });
  return {
    ...data,
    healthGuideTypes,
    health_guide_types: healthGuideTypes,
  };
};

const normalizeHealthGuideContents = (data = {}) => {
  const sourceList =
    data.healthGuideContents || data.health_guide_contents || [];
  const healthGuideContents = sourceList.map((item) => {
    const typeOne = item.typeOne ?? item.type_one ?? 0;
    const typeTwo = item.typeTwo ?? item.type_two ?? "";
    const rawContent = item.content ?? "";
    return {
      ...item,
      typeOne,
      type_one: typeOne,
      typeTwo,
      type_two: typeTwo,
      content: rawContent,
      contentParsed: parseJsonField(rawContent, {}),
    };
  });
  return {
    ...data,
    healthGuideContents,
    health_guide_contents: healthGuideContents,
  };
};

const decodeTypeResponse = (data) => {
  const payload = toUint8Array(data);
  if (!payload) {
    return normalizeHealthGuideTypes(data || {});
  }
  const message = HealthGuideTypeResponse.decode(payload);
  const result = HealthGuideTypeResponse.toObject(message, {
    longs: String,
    enums: String,
    bytes: String,
  });
  return normalizeHealthGuideTypes(result);
};

const decodeContentResponse = (data) => {
  const payload = toUint8Array(data);
  if (!payload) {
    return normalizeHealthGuideContents(data || {});
  }
  const message = HealthGuideContentResponse.decode(payload);
  const result = HealthGuideContentResponse.toObject(message, {
    longs: String,
    enums: String,
    bytes: String,
  });
  return normalizeHealthGuideContents(result);
};

export const buildHealthGuideFileUrl = (uuid) => {
  const encoded = encodeURIComponent(uuid || "");
  const base = (process.env.TARO_APP_API || "").replace(/\/+$/, "");
  return `${base}/api/mutil_media/download?uuid=${encoded}&bigfile=true`;
};

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

const normalizeLocalFilePath = (filePath = "") => {
  return String(filePath || "")
    .replace(/^http:\/\/tmp\//, "wxfile://tmp/")
    .replace(/^http:\/\/usr\//, "wxfile://usr/");
};

export const getHealthGuideFileBufferByUuid = async (uuid, options = {}) => {
  const { signal } = options;
  const token = Taro.getStorageSync("token") || "";
  const url = buildHealthGuideFileUrl(uuid);
  const fs = Taro.getFileSystemManager();
  throwIfAborted(signal);

  try {
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
    if (requestRes.statusCode === 200) {
      const arrayBuffer = normalizeArrayBuffer(requestRes.data);
      if (arrayBuffer && arrayBuffer.byteLength > 0) {
        return arrayBuffer;
      }
    }
  } catch (error) {
    if (error?.name === "AbortError") {
      throw error;
    }
  }

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
    throw new Error("文件下载失败");
  }
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
  if (!arrayBuffer || arrayBuffer.byteLength === 0) {
    throw new Error("文件内容为空");
  }
  return arrayBuffer;
};

export const getHealthGuideMediaTempFileByUuid = async (uuid, options = {}) => {
  const { signal } = options;
  const token = Taro.getStorageSync("token") || "";
  const url = buildHealthGuideFileUrl(uuid);

  if (!uuid) {
    throw new Error("视频 uuid 不能为空");
  }

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

  if (downloadRes?.statusCode !== 200 || !downloadRes?.tempFilePath) {
    console.error("[HealthGuidance][media-binary] download invalid response:", {
      uuid,
      url,
      statusCode: downloadRes?.statusCode,
      tempFilePath: downloadRes?.tempFilePath,
    });
    throw new Error("视频文件下载失败");
  }

  return normalizeLocalFilePath(downloadRes.tempFilePath);
};

export const getHealthGuideTypes = () => {
  return request({
    url: "/api/health_guide_type",
    method: "GET",
    header: {
      Authorization: Taro.getStorageSync("token") || "",
    },
    responseType: "arraybuffer",
  }).then((res) => decodeTypeResponse(res));
};

export const getHealthGuideTypePairs = async () => {
  const res = await getHealthGuideTypes();
  const list = res.healthGuideTypes || res.health_guide_types || [];
  return list.flatMap((item) => {
    const typeOne = item.typeOne ?? item.id ?? 0;
    const options = item.typeTwoOptions || [];
    if (!options.length) {
      const fallbackTypeTwo = item.typeTwo ?? item.type_two ?? "";
      return fallbackTypeTwo
        ? [{ type_one: typeOne, type_two: fallbackTypeTwo }]
        : [];
    }
    return options.map((typeTwo) => ({
      type_one: typeOne,
      type_two: typeTwo,
    }));
  });
};

export const getHealthGuideContent = (typeOne, typeTwo) => {
  return request({
    url: withQuery("/api/health_guide_content", {
      type_one: typeOne,
      type_two: typeTwo,
    }),
    method: "GET",
    header: {
      Authorization: Taro.getStorageSync("token") || "",
    },
    responseType: "arraybuffer",
  }).then((res) => decodeContentResponse(res));
};

export const getHealthGuideContentsWithFileUrl = async (typeOne, typeTwo) => {
  const res = await getHealthGuideContent(typeOne, typeTwo);
  const list = res.healthGuideContents || res.health_guide_contents || [];
  return list.map((item) => {
    const parsed = item.contentParsed || {};
    const uuid = parsed.uuid || parsed.index || parsed.file_uuid || "";
    return {
      ...item,
      contentParsed: parsed,
      fileUuid: uuid,
      fileUrl: uuid ? buildHealthGuideFileUrl(uuid) : "",
    };
  });
};
