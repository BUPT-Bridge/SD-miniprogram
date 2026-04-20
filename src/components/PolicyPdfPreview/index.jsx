import { WebView, View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useMemo } from "react";
import { buildPolicyPdfViewerUrl } from "../../api/policy";
import "./index.scss";

export default function PolicyPdfPreview({ uuid: uuidProp }) {
  const routerParams = Taro.getCurrentInstance().router?.params || {};

  const uuid = useMemo(
    () => decodeURIComponent(uuidProp || routerParams.uuid || ""),
    [routerParams.uuid, uuidProp],
  );
  const viewerUrl = useMemo(
    () => (uuid ? buildPolicyPdfViewerUrl(uuid) : ""),
    [uuid],
  );

  useEffect(() => {
    if (!viewerUrl) {
      return;
    }

    console.log("[PolicyPreview] pdf viewer request url:", viewerUrl);
  }, [viewerUrl]);

  if (!viewerUrl) {
    return (
      <View className="policy-preview-empty">
        <Text className="policy-preview-empty__text">缺少文件预览参数</Text>
      </View>
    );
  }

  return (
    <WebView
      className="policy-preview-webview"
      src={viewerUrl}
      onLoad={() => {
        console.log("[PolicyPreview] WebView loaded:", viewerUrl);
      }}
      onError={(event) => {
        console.error("[PolicyPreview] WebView load failed:", event);
        Taro.showToast({
          title: "文件预览加载失败",
          icon: "none",
        });
      }}
    />
  );
}
