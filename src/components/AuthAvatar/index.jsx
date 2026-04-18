import Image from "@taroify/core/image";
import User from "@taroify/icons/User";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../api/user";
import { downloadFile, withQuery, getAuthToken } from "../../api/request";

const AVATAR_CACHE = new Map();
const fileSystemManager = Taro.getFileSystemManager();

const isDomainListError = (error) =>
  error?.errno === 600002 ||
  /url not in domain list/i.test(error?.errMsg || error?.message || "");

const checkFileExists = (filePath) => {
  return new Promise((resolve) => {
    if (!filePath) {
      resolve(false);
      return;
    }

    fileSystemManager.access({
      path: filePath,
      success: () => resolve(true),
      fail: () => resolve(false),
    });
  });
};

// 构建带鉴权的头像 URL
const buildAvatarUrl = (uuid) => {
  const token = getAuthToken();
  const BASE_URL = (process.env.TARO_APP_API || "").replace(/\/+$/, "");
  return `${BASE_URL}${withQuery("/api/mutil_media/download", { uuid, token })}`;
};

export default function AuthAvatar({
  uuid,
  src: explicitSrc,
  shape = "circle",
  className,
  style,
  ...props
}) {
  const [resolvedUuid, setResolvedUuid] = useState("");
  const [src, setSrc] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [useDirectUrl, setUseDirectUrl] = useState(false);

  useEffect(() => {
    if (explicitSrc) {
      setSrc(explicitSrc);
      setError(false);
      setLoading(false);
    }
  }, [explicitSrc]);

  useEffect(() => {
    let cancelled = false;

    const syncAvatarUuid = async () => {
      try {
        // 如果外部传入了 uuid，优先使用外部的
        if (uuid) {
          if (!cancelled) {
            setResolvedUuid(uuid);
          }
          return;
        }

        const res = await getUserInfo();
        const nextUuid = res?.user?.avatar || "";

        if (!cancelled) {
          setResolvedUuid(nextUuid);
          if (!nextUuid) {
            setSrc("");
            setError(false);
          }
        }
      } catch (e) {
        if (!cancelled) {
          console.error("Fetch avatar uuid failed", e);
          setResolvedUuid("");
          setSrc("");
          setError(true);
        }
      }
    };

    syncAvatarUuid();

    return () => {
      cancelled = true;
    };
  }, [uuid]);

  useEffect(() => {
    if (!resolvedUuid) {
      return;
    }

    if (explicitSrc) {
      return;
    }

    let cancelled = false;

    const loadAvatar = async () => {
      setLoading(true);
      setError(false);

      try {
        // 如果已经切换到直接使用 URL 模式
        if (useDirectUrl) {
          const url = buildAvatarUrl(resolvedUuid);
          if (!cancelled) {
            setSrc(url);
            setLoading(false);
          }
          return;
        }

        const cachedPath = AVATAR_CACHE.get(resolvedUuid);
        if (cachedPath) {
          const exists = await checkFileExists(cachedPath);
          if (exists) {
            if (!cancelled) {
              setSrc(cachedPath);
              setLoading(false);
            }
            return;
          }
          AVATAR_CACHE.delete(resolvedUuid);
        }

        const res = await downloadFile({
          url: withQuery("/api/mutil_media/download", { uuid: resolvedUuid }),
        });

        if (cancelled) {
          return;
        }

        if (res.statusCode === 200 && res.tempFilePath) {
          AVATAR_CACHE.set(resolvedUuid, res.tempFilePath);
          setSrc(res.tempFilePath);
        } else {
          console.warn("Avatar download status not 200:", res.statusCode);
          setError(true);
        }
      } catch (e) {
        console.warn("Avatar download failed", e);
        // 下载失败时，回退到直接使用 URL
        if (!cancelled) {
          if (isDomainListError(e)) {
            setError(true);
          } else {
            setUseDirectUrl(true);
            const url = buildAvatarUrl(resolvedUuid);
            setSrc(url);
          }
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadAvatar();

    return () => {
      cancelled = true;
    };
  }, [explicitSrc, resolvedUuid, useDirectUrl]);

  if ((!resolvedUuid && !src) || error || (loading && !src)) {
    return (
      <View
        className={className}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f7f8fa",
          borderRadius: shape === "circle" ? "50%" : "4px",
          ...style,
        }}
      >
        <User size="60%" color="#dcdee0" />
      </View>
    );
  }

  return (
    <Image
      src={src}
      shape={shape}
      className={className}
      style={style}
      onError={() => {
        // 如果使用 URL 方式加载失败，显示默认头像
        setError(true);
      }}
      {...props}
    />
  );
}
