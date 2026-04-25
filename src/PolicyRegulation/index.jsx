import { View, Text } from "@tarojs/components";
import { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { getPolicyType, getPolicyFile } from "../api";
import "./index.scss";

export default function PolicyRegulation() {
  const [policyTypes, setPolicyTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [policyFiles, setPolicyFiles] = useState([]);

  useEffect(() => {
    const fetchPolicyTypes = async () => {
      try {
        const res = await getPolicyType();
        const types = res.policyTypes || res.policy_types || [];
        setPolicyTypes(types);
        if (types.length > 0) {
          setSelectedType(types[0].type);
        }
      } catch (error) {
        console.error("Failed to fetch policy types", error);
      }
    };

    fetchPolicyTypes();
  }, []);

  useEffect(() => {
    if (!selectedType) {
      return;
    }

    const fetchPolicyFiles = async () => {
      try {
        const res = await getPolicyFile(selectedType);
        const files = res.policyFiles || res.policy_files || [];
        setPolicyFiles(files);
      } catch (error) {
        console.error("Failed to fetch policy files", error);
        setPolicyFiles([]);
      }
    };

    fetchPolicyFiles();
  }, [selectedType]);

  const openPreview = (file) => {
    if (!file?.index) {
      Taro.showToast({
        title: "当前文件缺少预览标识",
        icon: "none",
      });
      return;
    }

    const previewUrl = `/PolicyPreview/index?uuid=${encodeURIComponent(file.index)}`;
    console.log("[PolicyRegulation] preview navigate url:", previewUrl);
    console.log("[PolicyRegulation] preview file:", file);

    Taro.navigateTo({
      url: previewUrl,
      fail: (err) => {
        console.error("[PolicyRegulation] navigateTo failed:", err);
        Taro.showToast({
          title: "页面跳转失败",
          icon: "none",
        });
      },
    });
  };

  const openElderlyServiceGuide = () => {
    Taro.navigateTo({
      url: "/PolicyRegulation/guide/index",
      fail: (err) => {
        console.error("[PolicyRegulation] guide navigate failed:", err);
        Taro.showToast({
          title: "页面跳转失败",
          icon: "none",
        });
      },
    });
  };

  return (
    <View className="policy-regulation-page">
      <View className="custom-header">
        <View className="nav-bar">
          <View className="back-btn" onClick={() => Taro.navigateBack()}>
            <Text>&lt; 返回</Text>
          </View>
        </View>
        <View className="header-content">
          <Text className="title">政策法规</Text>
          <Text className="subtitle">了解最新的政策和规定</Text>
        </View>
      </View>

      <View className="guide-entry-card" onClick={openElderlyServiceGuide}>
        <View className="guide-entry-content">
          <Text className="guide-entry-tag">补贴条件指引</Text>
          <Text className="guide-entry-title">养老服务办事指南</Text>
          <Text className="guide-entry-desc">
            按服务类型查看办理条件、补贴标准和流程
          </Text>
        </View>
        <View className="guide-entry-action">
          <Text>进入</Text>
        </View>
      </View>

      <View className="form-item">
        <Text className="form-label">政策类型</Text>
        <View className="type-group">
          {policyTypes.map((policyType) => (
            <View
              key={policyType.id}
              className={`type-button ${
                selectedType === policyType.type ? "active" : ""
              }`}
              onClick={() => setSelectedType(policyType.type)}
            >
              {policyType.type}
            </View>
          ))}
        </View>
      </View>

      <View className="policy-files-list">
        {policyFiles.map((file) => (
          <View key={file.id} className="policy-file-item">
            <View className="file-head">
              <View className="file-title-wrap">
                <Text className="file-title-icon">文件</Text>
                <Text className="file-title">{file.title}</Text>
              </View>
              <View className="preview-btn" onClick={() => openPreview(file)}>
                <Text>查看文件</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
