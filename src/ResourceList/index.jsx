import { useEffect, useMemo, useState } from "react";
import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import Button from "@taroify/core/button";
import ArrowLeft from "@taroify/icons/ArrowLeft";
import Clock from "@taroify/icons/Clock";
import Contact from "@taroify/icons/Contact";
import LocationOutlined from "@taroify/icons/LocationOutlined";
import Phone from "@taroify/icons/Phone";
import { getResourceServices } from "../api/healthService";
import "./index.scss";

export default function ResourceList() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);

  const hasData = useMemo(() => resources.length > 0, [resources]);

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      try {
        const res = await getResourceServices();
        const list = Array.isArray(res?.resource_services)
          ? res.resource_services
          : Array.isArray(res?.resourceServices)
            ? res.resourceServices
            : [];
        setResources(list);
      } catch (error) {
        setResources([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const goBack = () => {
    Taro.navigateBack();
  };

  const handleCall = (phone) => {
    if (!phone) return;
    Taro.makePhoneCall({ phoneNumber: String(phone) });
  };

  const handleLocation = (item) => {
    const latitude = Number(item?.latitude);
    const longitude = Number(item?.longitude);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      Taro.showToast({ title: "暂无可用定位", icon: "none" });
      return;
    }

    Taro.openLocation({
      name: item?.name || "资源点位",
      address: item?.address || "",
      latitude,
      longitude,
      scale: 18,
    });
  };

  return (
    <View className="resource-list-page">
      <View className="custom-header">
        <View className="nav-bar">
          <View className="back-btn" onClick={goBack}>
            <ArrowLeft size={20} />
            <Text>返回</Text>
          </View>
        </View>
        <View className="header-content">
          <Text className="title">资源清单</Text>
          <Text className="subtitle">社区资源点位一览</Text>
        </View>
      </View>

      <View className="resource-list">
        {!loading && !hasData ? (
          <View className="empty-card">
            <Text className="empty-text">暂无资源信息</Text>
          </View>
        ) : null}

        {resources.map((item) => (
          <View className="resource-card" key={item.id}>
            <View className="resource-name">
              <Text className="name-icon">📚</Text>
              <Text className="name-text">{item.name || "未命名资源"}</Text>
            </View>

            <View className="resource-info-row">
              <LocationOutlined size="16" color="#3f8ef2" />
              <Text className="info-text">{item.address || "暂无地址"}</Text>
            </View>

            <View className="resource-info-row">
              <Phone size="16" color="#3f8ef2" />
              <Text className="info-text">{item.phone || "暂无电话"}</Text>
            </View>

            <View className="resource-info-row">
              <Clock size="16" color="#3f8ef2" />
              <Text className="info-text">
                {item.service_time || "服务时间待补充"}
              </Text>
            </View>

            <View className="resource-info-row">
              <Contact size="16" color="#3f8ef2" />
              <Text className="info-text">负责人：{item.boss || "暂无"}</Text>
            </View>

            <View className="resource-actions">
              <Button
                className="action-btn call-btn"
                color="primary"
                shape="round"
                size="small"
                onClick={() => handleCall(item.phone)}
              >
                <Phone size={16} style={{ marginRight: 4 }} />
                立即拨打
              </Button>
              <Button
                className="action-btn location-btn"
                color="primary"
                variant="outlined"
                shape="round"
                size="small"
                onClick={() => handleLocation(item)}
              >
                <LocationOutlined size={16} style={{ marginRight: 4 }} />
                查看位置
              </Button>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
