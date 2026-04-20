import Taro from "@tarojs/taro";

/* global wx */

const BASE_URL = (process.env.TARO_APP_API || "").replace(/\/+$/, "");

export const MediaType = {
  FILE: 0, // 普通文件
  IMAGE: 1, // 图片 (compress=true)
  AVATAR: 2, // 头像 (avatar=true)
};

/**
 * 上传多媒体文件
 * POST /api/mutil_media
 * @param {string} filePath - 本地文件路径
 * @param {number} type - 上传类型 (0: File, 1: Image, 2: Avatar)
 * @returns {Promise<object>} - 返回 { uuid, type }
 */
export const uploadMedia = (filePath, type = MediaType.FILE) => {
  let url = `${BASE_URL}/api/mutil_media?`;

  const paramMap = {
    [MediaType.IMAGE]: "compress=true",
    [MediaType.AVATAR]: "avatar=true",
  };

  const param = paramMap[type];
  if (param) {
    url += param;
  }

  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url,
      filePath,
      name: "file",
      header: {
        Authorization: Taro.getStorageSync("token") || "",
        // content-type is customized by Taro/wx for multipart
      },
      success: (res) => {
        // Taro uploadFile returns res.data as String
        try {
          const data = JSON.parse(res.data);
          if (data.code === 200 && data.media) {
            resolve(data.media); // { uuid, type }
          } else {
            reject(new Error(data.message || "Upload failed"));
          }
        } catch (e) {
          reject(e);
        }
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};
