import {
  View,
  Text,
  RadioGroup,
  Radio,
  Textarea,
  Input,
  Button,
} from "@tarojs/components";
import { useState } from "react";
import Taro from "@tarojs/taro";
import { submitFeedback } from "../api/feedback";
import "./index.scss";

export default function Feedback() {
  const [feedbackType, setFeedbackType] = useState("suggestion");
  const [content, setContent] = useState("");
  const [contact, setContact] = useState("");

  const handleTypeChange = (event) => {
    setFeedbackType(event.detail.value);
  };

  const handleContentInput = (event) => {
    setContent(event.detail.value);
  };

  const handleContactInput = (event) => {
    setContact(event.detail.value);
  };

  const handleSubmit = async () => {
    if (!content) {
      Taro.showToast({
        title: "反馈内容不能为空",
        icon: "none",
      });
      return;
    }

    try {
      await submitFeedback({
        type: feedbackType,
        content,
        contact,
      });

      Taro.showToast({
        title: "提交成功",
        icon: "success",
      });

      setTimeout(() => {
        Taro.navigateBack();
      }, 1500);
    } catch (error) {
      Taro.showToast({
        title: "提交失败，请稍后重试",
        icon: "none",
      });
    }
  };

  const goBack = () => {
    Taro.navigateBack();
  };

  return (
    <View className="feedback-page">
      <View className="custom-header">
        <View className="nav-bar">
          <View className="back-btn" onClick={goBack}>
            <Text className="at-icon at-icon-chevron-left"></Text>
            <Text>返回</Text>
          </View>
        </View>
        <View className="header-content">
          <Text className="title">意见反馈</Text>
          <Text className="subtitle">我们期待听到您的声音</Text>
        </View>
      </View>

      <View className="feedback-form">
        <View className="form-item">
          <Text className="form-label">反馈类型</Text>
          <RadioGroup className="radio-group" onChange={handleTypeChange}>
            <Radio
              className="radio"
              value="suggestion"
              checked={feedbackType === "suggestion"}
            >
              建议
            </Radio>
            <Radio
              className="radio"
              value="feedback"
              checked={feedbackType === "feedback"}
            >
              反馈
            </Radio>
            <Radio
              className="radio"
              value="other"
              checked={feedbackType === "other"}
            >
              其他
            </Radio>
          </RadioGroup>
        </View>

        <View className="form-item">
          <Text className="form-label">反馈内容</Text>
          <Textarea
            className="content-input"
            value={content}
            onInput={handleContentInput}
            placeholder="请输入您的建议或反馈"
          />
        </View>

        <View className="form-item">
          <Text className="form-label">联系方式</Text>
          <Input
            className="contact-input"
            type="text"
            value={contact}
            onInput={handleContactInput}
            placeholder="选填，便于我们与您联系"
          />
        </View>

        <Button className="submit-btn" onClick={handleSubmit}>
          提交
        </Button>
      </View>
    </View>
  );
}
