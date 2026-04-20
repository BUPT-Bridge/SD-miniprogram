import { useEffect, useMemo, useState } from "react";
import { View, Text, Video } from "@tarojs/components";
import Taro from "@tarojs/taro";
import PolicyPdfPreview from "../../components/PolicyPdfPreview";
import "./index.scss";

export default function HealthGuidancePreview() {
  const routerParams = Taro.getCurrentInstance().router?.params || {};
  const uuid = useMemo(
    () => decodeURIComponent(routerParams.uuid || ""),
    [routerParams.uuid],
  );
  const title = useMemo(
    () => decodeURIComponent(routerParams.title || "健康指导 PDF 预览"),
    [routerParams.title],
  );
  const fileType = useMemo(
    () =>
      String(decodeURIComponent(routerParams.fileType || "pdf")).toLowerCase(),
    [routerParams.fileType],
  );
  const fileUrl = useMemo(
    () => decodeURIComponent(routerParams.fileUrl || ""),
    [routerParams.fileUrl],
  );

  const isVideo = fileType === "video";
  const [videoUrl, setVideoUrl] = useState("");
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState("");

  useEffect(() => {
    if (!isVideo) {
      return undefined;
    }
    console.log("[HealthGuidance][preview] 准备加载视频，fileUrl:", fileUrl);

    let unmounted = false;
    const loadVideo = () => {
      if (!fileUrl) {
        console.error("[HealthGuidance][preview] 视频地址为空");
        setVideoError("无效文件参数，无法预览视频");
        return;
      }

      setVideoLoading(true);
      setVideoError("");

      try {
        if (unmounted) {
          return;
        }

        console.log("[HealthGuidance][preview] 视频直连地址:", fileUrl);
        setVideoUrl(fileUrl);
      } catch (error) {
        if (unmounted) {
          return;
        }
        console.error("[HealthGuidance][preview] 视频加载失败:", error);
        setVideoError("视频加载失败，请重试");
      } finally {
        if (!unmounted) {
          setVideoLoading(false);
        }
      }
    };

    loadVideo();

    return () => {
      unmounted = true;
    };
  }, [isVideo, fileUrl]);

  if (!isVideo) {
    return <PolicyPdfPreview uuid={uuid} />;
  }

  const goBack = () => {
    Taro.navigateBack();
  };

  return (
    <View className="health-guidance-preview-page">
      <View className="custom-header">
        <View className="nav-bar">
          <View className="back-btn" onClick={goBack}>
            <Text>&lt; 返回</Text>
          </View>
        </View>
        <View className="header-content">
          <Text className="title">{isVideo ? "视频预览" : "PDF 预览"}</Text>
          <Text className="subtitle">{title}</Text>
        </View>
      </View>

      <View className="preview-panel">
        <Text className="status-text">
          {videoLoading ? "正在加载视频..." : "已进入视频预览页面"}
        </Text>
        {videoError ? <Text className="error-text">{videoError}</Text> : null}
        {videoUrl ? (
          <Video
            className="preview-video-player"
            src={videoUrl}
            controls
            autoplay
            showProgress
            objectFit="contain"
            onError={(event) => {
              console.error("[HealthGuidance][preview] video onError:", event);
              setVideoError("视频播放失败，请检查登录状态或文件访问权限");
            }}
            onLoadedMetadata={(event) => {
              console.log(
                "[HealthGuidance][preview] video onLoadedMetadata:",
                event,
              );
            }}
          />
        ) : null}
      </View>
    </View>
  );
}
