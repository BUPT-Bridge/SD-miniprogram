import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { guideHomeTitle, subsidyServices } from "./data";
import "./style.scss";

export default function ElderlyServiceGuideHome() {
  const openService = (service) => {
    if (service.status === "ready") {
      Taro.navigateTo({
        url: `/PolicyRegulation/guide/detail?serviceId=${service.id}`,
      });
      return;
    }

    Taro.navigateTo({
      url: `/PolicyRegulation/guide/placeholder?serviceId=${service.id}`,
    });
  };

  return (
    <View className="guide-page">
      <View className="guide-header">
        <View className="guide-nav">
          <View className="guide-back" onClick={() => Taro.navigateBack()}>
            <Text>&lt; 返回</Text>
          </View>
        </View>
        <View className="guide-header-content">
          <Text className="guide-kicker">养老服务办事指南</Text>
          <Text className="guide-title">{guideHomeTitle}</Text>
          <Text className="guide-subtitle">补贴条件指引</Text>
        </View>
      </View>

      <View className="guide-home-panel">
        <Text className="section-title">请选择您想了解的服务</Text>
        <View className="service-grid">
          {subsidyServices.map((service) => (
            <View
              key={service.id}
              className={`service-entry ${service.status === "ready" ? "ready" : ""}`}
              onClick={() => openService(service)}
            >
              <Text className="service-entry-title">{service.title}</Text>
              <Text className="service-entry-desc">
                {service.status === "ready" ? "查看办理指南" : "流程待完善"}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
