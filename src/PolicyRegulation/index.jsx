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
    if (selectedType) {
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
    }
  }, [selectedType]);

  const handleTypeClick = (type) => {
    setSelectedType(type);
  };

  const goBack = () => {
    Taro.navigateBack();
  };

  const openPreview = (file) => {
    if (!file?.index) {
      Taro.showToast({
        title: "当前文件缺少预览标识",
        icon: "none",
      });
      return;
    }
    const title = encodeURIComponent(file.title || "政策文件预览");
    const uuid = encodeURIComponent(file.index);
    Taro.navigateTo({
      url: `/PolicyRegulation/preview/index?uuid=${uuid}&title=${title}`,
    });
  };

  return (
    <View className="policy-regulation-page">
      <View className="custom-header">
        <View className="nav-bar">
          <View className="back-btn" onClick={goBack}>
            <Text>&lt; 返回</Text>
          </View>
        </View>
        <View className="header-content">
          <Text className="title">政策法规</Text>
          <Text className="subtitle">了解最新的政策和规定</Text>
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
              onClick={() => handleTypeClick(policyType.type)}
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
                <Text className="file-title-icon">📄</Text>
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
