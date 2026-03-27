import { View, Text } from "@tarojs/components";
import { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { Button, Tag } from "@taroify/core";
import { ArrowLeft, Arrow, LocationOutlined } from "@taroify/icons";
import { getServiceMapTypes } from "../api/serviceMap";
import "./index.scss";

// 默认兜底数据
const DEFAULT_DATA = [
  {
    id: 1,
    community_name: "上地街道",
    type_sum: 2,
    type_name: JSON.stringify({
      餐饮服务: {
        助餐点: ["阳光餐厅", "幸福食堂"],
        配送范围: "上地东路、上地西路",
      },
      医疗服务: {
        社区卫生站: ["上地卫生服务中心"],
        服务内容: ["健康监测", "慢病管理", "用药指导"],
      },
    }),
    latitude: 40.0355,
    longitude: 116.3184,
    address: "北京市海淀区上地东路5号",
  },
  {
    id: 2,
    community_name: "清河社区",
    type_sum: 3,
    type_name: JSON.stringify({
      文化娱乐: {
        活动中心: ["清河老年活动室"],
        活动项目: ["书法", "太极拳", "合唱团"],
      },
      日间照料: {
        照料站: ["清河日间照料中心"],
        服务项目: ["生活照料", "康复训练"],
      },
      家政服务: {
        服务商: ["安心家政", "乐居家政"],
        服务项目: ["保洁", "陪护", "代购"],
      },
    }),
    latitude: 40.0392,
    longitude: 116.3346,
    address: "北京市海淀区清河中街68号",
  },
];

/**
 * 递归渲染 JSON 层级结构
 * @param {any} data - 要渲染的数据（对象 / 数组 / 基本值）
 * @param {number} depth - 当前嵌套深度
 */
function renderTree(data, depth = 0) {
  if (data === null || data === undefined) return null;

  // 数组：遍历渲染每个元素
  if (Array.isArray(data)) {
    return (
      <View className="tree-array" style={{ paddingLeft: depth > 0 ? 24 : 0 }}>
        {data.map((item, idx) => (
          <View className="tree-array-item" key={idx}>
            {typeof item === "object" ? (
              renderTree(item, depth + 1)
            ) : (
              <View className="tree-leaf">
                <View className="leaf-dot" />
                <Text className="leaf-text">{String(item)}</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    );
  }

  // 对象：遍历 key-value 对
  if (typeof data === "object") {
    const keys = Object.keys(data);
    return (
      <View className="tree-object" style={{ paddingLeft: depth > 0 ? 24 : 0 }}>
        {keys.map((key) => {
          const value = data[key];
          const isLeaf =
            typeof value !== "object" ||
            (Array.isArray(value) && value.every((v) => typeof v !== "object"));

          return (
            <View
              className={`tree-branch depth-${Math.min(depth, 3)}`}
              key={key}
            >
              <View className="branch-header">
                <Arrow size={12} className="branch-arrow" />
                <Text className="branch-key">{key}</Text>
                {isLeaf && !Array.isArray(value) && (
                  <Text className="branch-value">{String(value)}</Text>
                )}
              </View>
              {/* 子节点 */}
              {typeof value === "object" && (
                <View className="branch-children">
                  {renderTree(value, depth + 1)}
                </View>
              )}
            </View>
          );
        })}
      </View>
    );
  }

  // 基本类型
  return (
    <View className="tree-leaf">
      <View className="leaf-dot" />
      <Text className="leaf-text">{String(data)}</Text>
    </View>
  );
}

export default function ServiceMap() {
  const [mapTypes, setMapTypes] = useState(DEFAULT_DATA);
  const [expandedIds, setExpandedIds] = useState(DEFAULT_DATA.map((t) => t.id));

  useEffect(() => {
    getServiceMapTypes()
      .then((res) => {
        if (res?.service_map_types?.length > 0) {
          // 按 id 排序
          const sorted = [...res.service_map_types].sort((a, b) => a.id - b.id);
          setMapTypes(sorted);
          // 默认展开全部一级
          setExpandedIds(sorted.map((t) => t.id));
        }
      })
      .catch(() => {
        // API 未就绪，使用默认数据
        setExpandedIds(DEFAULT_DATA.map((t) => t.id));
      });
  }, []);

  const goBack = () => {
    Taro.navigateBack();
  };

  const handleLocation = (item) => {
    if (item.latitude && item.longitude) {
      Taro.openLocation({
        name: item.community_name,
        address: item.address || item.community_name,
        latitude: item.latitude,
        longitude: item.longitude,
        scale: 16,
      });
    } else {
      // 没有经纬度时，用关键词搜索附近养老服务
      Taro.chooseLocation({
        success: () => {},
      });
    }
  };

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((eid) => eid !== id) : [...prev, id],
    );
  };

  /**
   * 安全解析 type_name JSON 字符串
   */
  const parseTypeName = (typeNameStr) => {
    try {
      return JSON.parse(typeNameStr);
    } catch {
      return null;
    }
  };

  return (
    <View className="service-map-page">
      {/* 头部导航 */}
      <View className="custom-header">
        <View className="nav-bar">
          <View className="back-btn" onClick={goBack}>
            <ArrowLeft size={20} />
            <Text>返回</Text>
          </View>
        </View>
        <View className="header-content">
          <Text className="title">养老服务资源地图</Text>
          <Text className="subtitle">为您提供便捷的养老服务机构信息</Text>
        </View>
      </View>

      {/* 一级目录：每个 service_map_type 条目 */}
      <View className="community-list">
        {mapTypes.map((item) => {
          const parsed = parseTypeName(item.type_name);
          const isExpanded = expandedIds.includes(item.id);
          const typeKeys = parsed ? Object.keys(parsed) : [];

          return (
            <View className="community-card" key={item.id}>
              {/* 一级标题：社区名称 */}
              <View
                className="community-header"
                onClick={() => toggleExpand(item.id)}
              >
                <View className="community-title-row">
                  <Text className="community-icon">🏘️</Text>
                  <Text className="community-name">{item.community_name}</Text>
                  <Tag
                    color="warning"
                    variant="outlined"
                    shape="rounded"
                    size="small"
                    className="type-count-tag"
                  >
                    {item.type_sum} 类服务
                  </Tag>
                </View>
                <View
                  className={`expand-arrow ${isExpanded ? "expanded" : ""}`}
                >
                  <Arrow size={16} />
                </View>
              </View>

              {/* 地图定位按钮 */}
              <View className="community-location">
                <Button
                  className="location-btn"
                  color="warning"
                  variant="outlined"
                  shape="round"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLocation(item);
                  }}
                >
                  <LocationOutlined size={16} style={{ marginRight: 4 }} />
                  查看位置
                </Button>
              </View>

              {/* 二级内容：type_name 解析后的层级 */}
              {isExpanded && parsed && (
                <View className="community-body">
                  {typeKeys.map((key, idx) => (
                    <View className="type-section" key={key}>
                      {/* 二级标题 */}
                      <View className="type-section-header">
                        <View className="section-indicator" />
                        <Text className="type-section-title">{key}</Text>
                      </View>
                      {/* 二级内容：递归渲染 */}
                      <View className="type-section-body">
                        {renderTree(parsed[key], 0)}
                      </View>
                      {idx < typeKeys.length - 1 && (
                        <View className="section-divider" />
                      )}
                    </View>
                  ))}
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
}
