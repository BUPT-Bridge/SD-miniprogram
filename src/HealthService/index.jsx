import { View, Text } from "@tarojs/components";
import { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { Button } from "@taroify/core";
import { ArrowLeft, Phone, LocationOutlined, Clock } from "@taroify/icons";
import { getMedicalServices } from "../api/healthService";
import "./index.scss";

export default function HealthService() {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    getMedicalServices()
      .then((res) => {
        const list = Array.isArray(res?.medical_services)
          ? res.medical_services
          : Array.isArray(res?.medicalServices)
            ? res.medicalServices
            : [];
        setStations(list);
      })
      .catch(() => {
        setStations([]);
      });
  }, []);

  const goBack = () => {
    Taro.navigateBack();
  };

  const handleCall = (phone) => {
    Taro.makePhoneCall({ phoneNumber: phone });
  };

  const handleLocation = (station) => {
    Taro.openLocation({
      name: station.name,
      address: station.address,
      latitude: station.latitude,
      longitude: station.longitude,
      scale: 18,
    });
  };

  return (
    <View className="health-service-page">
      {/* 头部导航 */}
      <View className="custom-header">
        <View className="nav-bar">
          <View className="back-btn" onClick={goBack}>
            <ArrowLeft size={20} />
            <Text>返回</Text>
          </View>
        </View>
        <View className="header-content">
          <Text className="title">卫生服务中心</Text>
          <Text className="subtitle">为您提供便捷的医疗服务</Text>
        </View>
      </View>

      {/* 卫生服务站列表 */}
      <View className="station-list">
        {stations.map((station) => (
          <View className="station-card" key={station.id}>
            {/* 名称 */}
            <View className="station-name">
              <Text className="name-icon">🏥</Text>
              <Text className="name-text">{station.name}</Text>
            </View>

            {/* 地址 */}
            <View className="station-info-row">
              <LocationOutlined size="16" color="#ff7a2e" />
              <Text className="info-text">{station.address}</Text>
            </View>

            {/* 联系电话 */}
            <View className="station-info-row">
              <Phone size="16" color="#ff7a2e" />
              <Text className="info-text">{station.phone}</Text>
            </View>

            {/* 服务时间 */}
            <View className="station-info-row">
              <Clock size="16" color="#ff7a2e" />
              <Text className="info-text">{station.service_time}</Text>
            </View>

            {/* 操作按钮 */}
            <View className="station-actions">
              <Button
                className="action-btn call-btn"
                color="warning"
                shape="round"
                size="small"
                onClick={() => handleCall(station.phone)}
              >
                <Phone size={16} style={{ marginRight: 4 }} />
                立即拨打
              </Button>
              <Button
                className="action-btn location-btn"
                color="warning"
                variant="outlined"
                shape="round"
                size="small"
                onClick={() => handleLocation(station)}
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
