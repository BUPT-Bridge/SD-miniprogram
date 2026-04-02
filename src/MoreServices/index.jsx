import { useState } from "react";
import { View, Text } from "@tarojs/components";
import "./index.scss";

export default function MoreServices() {
  const [visible, setVisible] = useState(true);

  return (
    <View className="page">
      {visible ? (
        <View className="popup-mask">
          <View className="popup-card">
            <Text className="popup-title">温馨提示</Text>
            <Text className="popup-content">更多功能敬请期待</Text>
            <View className="popup-btn" onClick={() => setVisible(false)}>
              <Text>我知道了</Text>
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
}
