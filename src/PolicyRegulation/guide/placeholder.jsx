import { View, Text } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";
import { getServiceById } from "./data";
import "./style.scss";

export default function ElderlyServiceGuidePlaceholder() {
  const { serviceId = "" } = useRouter().params || {};
  const service = getServiceById(serviceId);

  return (
    <View className="guide-page">
      <View className="guide-header compact">
        <View className="guide-nav">
          <View className="guide-back" onClick={() => Taro.navigateBack()}>
            <Text>&lt; 返回</Text>
          </View>
        </View>
        <View className="guide-header-content">
          <Text className="guide-kicker">养老服务办事指南</Text>
          <Text className="guide-title">{service?.title || "服务流程"}</Text>
        </View>
      </View>

      <View className="empty-state elevated">
        <Text className="empty-title">该服务流程待完善</Text>
        <Text className="empty-desc">后续可在配置中补充该服务的办理流程。</Text>
        <View className="primary-action" onClick={() => Taro.navigateBack()}>
          <Text>返回上一页</Text>
        </View>
      </View>
    </View>
  );
}
