import { View, Text } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";
import { getGuideByServiceId } from "./data";
import "./style.scss";

const renderTargetContent = (content) => (
  <>
    <View className="content-card intro-card">
      <Text className="content-intro">{content.intro}</Text>
    </View>

    <View className="condition-list">
      {content.items.map((item, index) => (
        <View key={item} className="condition-card">
          <Text className="condition-index">{index + 1}</Text>
          <Text className="condition-text">{item}</Text>
        </View>
      ))}
    </View>

    <View className="notice-card">
      <Text className="notice-title">提示</Text>
      <Text className="notice-text">{content.notice}</Text>
    </View>
  </>
);

const renderSubsidyContent = (content) => (
  <>
    <View className="content-card intro-card">
      <Text className="content-intro">{content.intro}</Text>
    </View>

    <View className="module-list">
      {content.modules.map((module) => (
        <View key={module.title} className="content-card subsidy-module">
          <Text className="module-title">{module.title}</Text>
          {module.items.map((item) => (
            <Text key={item} className="module-item">
              {item}
            </Text>
          ))}
        </View>
      ))}
    </View>

    <Text className="bottom-note">{content.note}</Text>
  </>
);

const renderProcessContent = (content) => (
  <View className="timeline">
    {content.steps.map((step, index) => (
      <View key={step.title} className="timeline-item">
        <View className="timeline-marker">
          <Text>{index + 1}</Text>
        </View>
        <View className="timeline-card">
          <Text className="timeline-title">{step.title}</Text>
          <Text className="timeline-desc">{step.description}</Text>
        </View>
      </View>
    ))}
  </View>
);

export default function ElderlyServiceGuideContent() {
  const { serviceId = "home-care-bed", branch = "target" } =
    useRouter().params || {};
  const guide = getGuideByServiceId(serviceId);
  const content = guide?.content?.[branch];

  if (!guide || !content) {
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

  return (
    <View className="guide-page">
      <View className="guide-header compact">
        <View className="guide-nav">
          <View className="guide-back" onClick={() => Taro.navigateBack()}>
            <Text>&lt; 返回详情</Text>
          </View>
        </View>
        <View className="guide-header-content">
          <Text className="guide-kicker">养老家庭照护床位</Text>
          <Text className="guide-title">{content.title}</Text>
        </View>
      </View>

      <View className="content-wrap">
        {branch === "target" && renderTargetContent(content)}
        {branch === "subsidy" && renderSubsidyContent(content)}
        {branch === "process" && renderProcessContent(content)}
      </View>
    </View>
  );
}
