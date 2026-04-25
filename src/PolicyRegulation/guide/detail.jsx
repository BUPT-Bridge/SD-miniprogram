import { View, Text } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";
import { getGuideByServiceId } from "./data";
import "./style.scss";

export default function ElderlyServiceGuideDetail() {
  const { serviceId = "home-care-bed" } = useRouter().params || {};
  const guide = getGuideByServiceId(serviceId);

  if (!guide) {
    return (
      <View className="guide-page">
        <View className="empty-state">
          <Text className="empty-title">该服务流程待完善</Text>
          <View className="primary-action" onClick={() => Taro.navigateBack()}>
            <Text>返回</Text>
          </View>
        </View>
      </View>
    );
  }

  const openBranch = (branchId) => {
    Taro.navigateTo({
      url: `/PolicyRegulation/guide/content?serviceId=${guide.id}&branch=${branchId}`,
    });
  };

  return (
    <View className="guide-page">
      <View className="guide-header compact">
        <View className="guide-nav">
          <View className="guide-back" onClick={() => Taro.navigateBack()}>
            <Text>&lt; 返回首页</Text>
          </View>
        </View>
        <View className="guide-header-content">
          <Text className="guide-kicker">办事指南</Text>
          <Text className="guide-title">{guide.title}</Text>
          <Text className="guide-subtitle">{guide.subtitle}</Text>
        </View>
      </View>

      <View className="guide-card-list">
        {guide.branches.map((branch) => (
          <View
            key={branch.id}
            className="branch-card"
            onClick={() => openBranch(branch.id)}
          >
            <View>
              <Text className="branch-title">{branch.title}</Text>
              <Text className="branch-desc">{branch.description}</Text>
            </View>
            <Text className="branch-arrow">›</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
