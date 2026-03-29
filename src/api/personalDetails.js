import request, {
  downloadFile,
  setAuthToken,
  uploadFile,
  withQuery,
} from "./request";

const BASE_URL = process.env.TARO_APP_API;

export const registerByJsCode = (js_code) => {
  return request({
    url: withQuery("/api/user/register", { js_code }),
    method: "GET",
    withAuth: false,
  });
};

export const loginByJsCode = (js_code) => {
  return request({
    url: withQuery("/api/user/login", { js_code }),
    method: "GET",
    withAuth: false,
  });
};

export const getUserInfo = () => {
  return request({
    url: "/api/user/info",
    method: "GET",
  });
};

export const modifyUser = (data) => {
  return request({
    url: "/api/user/modify",
    method: "PUT",
    data,
  });
};

export const applyPermissionCode = (apply_type) => {
  return request({
    url: withQuery("/api/user/apply_permission", { apply_type }),
    method: "GET",
  });
};

export const applyPermission = (code) => {
  return request({
    url: withQuery("/api/user/apply_permission", { code }),
    method: "POST",
  });
};

export const saveTokenFromUserResponse = (response) => {
  const token = response?.user?.token;
  if (token) {
    setAuthToken(token);
  }
  return token || "";
};

export const uploadMedia = ({
  filePath,
  compress = false,
  avatar = false,
  bigfile = false,
}) => {
  const params = {
    compress: compress ? true : undefined,
    avatar: avatar ? true : undefined,
    bigfile: bigfile ? true : undefined,
  };

  return uploadFile({
    url: withQuery("/api/mutil_media", params),
    filePath,
    name: "file",
  });
};

export const downloadMedia = ({ uuid, bigfile = false }) => {
  const params = {
    uuid,
    bigfile: bigfile ? true : undefined,
  };

  return downloadFile({
    url: withQuery("/api/mutil_media/download", params),
  });
};

export const buildMediaUrl = ({ uuid, bigfile = false }) => {
  const params = {
    uuid,
    bigfile: bigfile ? true : undefined,
  };

  return `${BASE_URL}${withQuery("/api/mutil_media/download", params)}`;
};
