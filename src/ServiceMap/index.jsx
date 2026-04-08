import { View, Text } from "@tarojs/components";
import { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import Button from "@taroify/core/button";
import Tag from "@taroify/core/tag";
import ArrowLeft from "@taroify/icons/ArrowLeft";
import Arrow from "@taroify/icons/Arrow";
import LocationOutlined from "@taroify/icons/LocationOutlined";
import { getServiceMapTypes } from "../api/serviceMap";
import { getCommunityServices } from "../api/community_service";
import "./index.scss";

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
  const [mapTypes, setMapTypes] = useState([]);
  const [expandedIds, setExpandedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  const normalizeCommunityKey = (name) => {
    return String(name || "")
      .trim()
      .replace(/\s+/g, "")
      .replace(/社区$/u, "");
  };

  const toFiniteNumber = (value) => {
    const n = Number(value);
    return Number.isFinite(n) ? n : NaN;
  };

  useEffect(() => {
    setLoading(true);
    setErrorText("");
    Promise.all([
      getServiceMapTypes(),
      getCommunityServices().catch(() => null),
    ])
      .then(([res, communityRes]) => {
        if (res?.code && res.code !== 200) {
          setErrorText(res?.message || "服务地图接口返回异常");
        }

        const communityList = Array.isArray(communityRes?.communityServices)
          ? communityRes.communityServices
          : Array.isArray(communityRes?.data)
            ? communityRes.data
            : [];

        const communityMap = communityList.reduce((acc, item) => {
          const key = normalizeCommunityKey(item?.name);
          if (!key) {
            return acc;
          }
          acc[key] = {
            address: item?.address || "",
            latitude: toFiniteNumber(item?.latitude ?? item?.lat),
            longitude: toFiniteNumber(item?.longitude ?? item?.lng),
          };
          return acc;
        }, {});

        const resolveCommunityFallback = (communityName) => {
          const key = normalizeCommunityKey(communityName);
          if (!key) {
            return null;
          }

          if (communityMap[key]) {
            return communityMap[key];
          }

          const fuzzyKey = Object.keys(communityMap).find(
            (nameKey) => nameKey.includes(key) || key.includes(nameKey),
          );
          return fuzzyKey ? communityMap[fuzzyKey] : null;
        };

        const rawList = Array.isArray(res?.service_map_types)
          ? res.service_map_types
          : Array.isArray(res?.serviceMapTypes)
            ? res.serviceMapTypes
            : Array.isArray(res?.data)
              ? res.data
              : [];
        const list = rawList
          .map((item, index) => ({
            ...item,
            id: item?.id ?? item?.typeOne ?? index,
            community_name:
              item?.community_name || item?.communityName || "未命名社区",
            type_sum: item?.type_sum ?? item?.typeSum ?? 0,
            type_name: item?.type_name ?? item?.typeName ?? "",
            address: item?.address || item?.community_address || "",
            latitude: toFiniteNumber(item?.latitude ?? item?.lat),
            longitude: toFiniteNumber(item?.longitude ?? item?.lng),
          }))
          .map((item) => {
            const fallback = resolveCommunityFallback(item.community_name);
            return {
              ...item,
              address: item.address || fallback?.address || item.community_name,
              latitude: Number.isFinite(item.latitude)
                ? item.latitude
                : fallback?.latitude,
              longitude: Number.isFinite(item.longitude)
                ? item.longitude
                : fallback?.longitude,
            };
          })
          .sort((a, b) => (a.id || 0) - (b.id || 0));
        setMapTypes(list);
        setExpandedIds(list.map((t) => t.id).filter(Boolean));

        if (!list.length && res?.message && (!res?.code || res.code !== 200)) {
          setErrorText(res.message);
        }
      })
      .catch(() => {
        setMapTypes([]);
        setExpandedIds([]);
        setErrorText("服务地图数据加载失败，请稍后重试");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const goBack = () => {
    Taro.navigateBack();
  };

  const handleLocation = (item) => {
    const latitude = Number(item?.latitude);
    const longitude = Number(item?.longitude);

    if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
      Taro.openLocation({
        name: item.community_name,
        address: item.address || item.community_name,
        latitude,
        longitude,
        scale: 16,
      });
    } else {
      Taro.showToast({
        title: "该社区暂无坐标信息，请联系管理员补充",
        icon: "none",
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
    if (!typeNameStr && typeNameStr !== 0) {
      return null;
    }

    if (typeof typeNameStr === "object") {
      return typeNameStr;
    }

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
        {loading ? (
          <Text className="state-text">正在加载服务地图...</Text>
        ) : null}
        {!loading && errorText ? (
          <Text className="state-text">{errorText}</Text>
        ) : null}
        {!loading && !errorText && !mapTypes.length ? (
          <Text className="state-text">暂无服务地图数据</Text>
        ) : null}

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
