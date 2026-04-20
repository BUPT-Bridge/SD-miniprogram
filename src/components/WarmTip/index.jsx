import { View } from "@tarojs/components";
import NoticeBar from "@taroify/core/notice-bar";
import "@taroify/core/notice-bar/style";
import "./index.scss";

/**
 * 温馨提示滚动组件
 * @param {string} text - 要显示的提示文本
 */
export default function WarmTip({ text = "欢迎来到小程序" }) {
  return (
    <View className="warm-tip-wrapper">
      <View className="warm-tip-container">
        <View className="warm-tip-icon">
          <View className="icon-star">★</View>
        </View>
        <NoticeBar
          style={{ color: "#000000", fontSize: "16px", fontWeight: "900" }}
          className="warm-tip-notice"
          scrollable
          speed={50}
          delay={500}
        >
          {text}
        </NoticeBar>
      </View>
    </View>
  );
}

WarmTip.options = {
  addGlobalClass: true,
  styleIsolation: "shared",
};
