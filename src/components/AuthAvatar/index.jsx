import Image from "@taroify/core/image";
import User from "@taroify/icons/User";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState, useEffect } from "react";

// 简单的内存缓存，避免重复下载
const AVATAR_CACHE = new Map();

export default function AuthAvatar({
  uuid,
  shape = "circle",
  className,
  style,
  ...props
}) {
  const [src, setSrc] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!uuid) {
      setSrc("");
      return;
    }

    // 检查缓存
    if (AVATAR_CACHE.has(uuid)) {
      setSrc(AVATAR_CACHE.get(uuid));
      setError(false);
      return;
    }

    const downloadAvatar = async () => {
      setLoading(true);
      setError(false);
      try {
        const url = `${process.env.TARO_APP_API}/api/mutil_media/download?uuid=${uuid}`;
        const res = await Taro.downloadFile({
          url,
          header: {
            Authorization: Taro.getStorageSync("token") || "",
          },
        });

        if (res.statusCode === 200) {
          const tempPath = res.tempFilePath;
          AVATAR_CACHE.set(uuid, tempPath); // 写入缓存
          setSrc(tempPath);
        } else {
          console.warn("Avatar download status not 200:", res.statusCode);
          setError(true);
        }
      } catch (e) {
        console.error("Avatar download failed", e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    downloadAvatar();
  }, [uuid]);

  // 当没有UUID，或者加载出错，或者正在加载中且没有缓存时显示默认头像
  // 如果你希望加载时显示Loading占位，可以在这里区分
  if (!uuid || error || (loading && !src)) {
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
      {...props}
    />
  );
}
