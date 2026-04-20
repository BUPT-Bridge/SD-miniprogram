import { View, Text } from "@tarojs/components";
import Button from "@taroify/core/button";
import Flex from "@taroify/core/flex";
import Phone from "@taroify/icons/Phone";
import Location from "@taroify/icons/Location";
import ArrowLeft from "@taroify/icons/ArrowLeft";
import HomeOutlined from "@taroify/icons/HomeOutlined";
import Taro from "@tarojs/taro";
import { useState, useEffect } from "react";
import { getCommunityServices } from "../../api/community_service";
import "./index.scss";

export default function ContactCommunity() {
  const [communityList, setCommunityList] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      Taro.showLoading({ title: "加载中..." });
      try {
        const res = await getCommunityServices();
        if (res.code === 200 && res.communityServices) {
          // 将后端数据映射为前端展示需要的格式
          const list = res.communityServices.map((item) => ({
            id: item.id,
            name: item.name,
            address: item.address,
            phone: item.phone,
            lat: item.latitude, // 对应 proto 定义的 latitude
            lng: item.longitude, // 对应 proto 定义的 longitude
          }));
          setCommunityList(list);
        }
      } catch (error) {
        console.error("Fetch community services failed", error);
        // 401 已由全局处理，这里处理其他错误
        if (error?.code !== 401) {
          Taro.showToast({ title: "获取列表失败", icon: "none" });
        }
      } finally {
        Taro.hideLoading();
      }
    };

    fetchList();
  }, []);

  const handleBack = () => {
    Taro.navigateBack();
  };

  const handleCall = (phoneNumber) => {
    Taro.makePhoneCall({
      phoneNumber: phoneNumber,
    });
  };

  const handleNavigate = (item) => {
    Taro.openLocation({
      latitude: item.lat,
      longitude: item.lng,
      name: item.name,
      address: item.address,
      scale: 18,
    });
  };

  // 获取状态栏高度，用于适配刘海屏
  // const systemInfo = Taro.getSystemInfoSync();
  // const statusBarHeight = systemInfo.statusBarHeight || 20;

  return (
    <View className="contact-community-page">
      {/* 自定义导航栏背景 */}
      <View className="custom-header">
        <View className="nav-bar">
          <View className="back-btn" onClick={handleBack}>
            <ArrowLeft size={20} />
            <Text>返回</Text>
          </View>
        </View>

        <View className="header-content">
          <View className="title">联系社区</View>
          <View className="subtitle">上地街道各社区联系方式</View>
        </View>
      </View>

      {/* 社区列表 */}
      <View className="community-list" style={{ marginTop: "-4vh" }}>
        {communityList.map((item) => (
          <View key={item.id} className="community-card">
            {/* 头部信息 */}
            <Flex align="center" className="card-header">
              <View className="icon-wrapper">
                <HomeOutlined size={24} color="#fff" />
              </View>
              <View className="info-content">
                <View className="name">{item.name}</View>
                <View className="address">{item.address}</View>
              </View>
            </Flex>

            {/* 电话行 */}
            <View className="phone-row">
              <Phone className="phone-icon" />
              <Text className="label">联系电话：</Text>
              <Text className="number">{item.phone}</Text>
            </View>

            {/* 按钮组 */}
            <Flex className="action-row">
              <Button
                className="action-btn call-btn"
                shape="square"
                onClick={() => handleCall(item.phone)}
              >
                <Phone size={16} style={{ marginRight: 4 }} />
                立即拨打
              </Button>
              <Button
                className="action-btn nav-btn"
                shape="square"
                onClick={() => handleNavigate(item)}
              >
                <Location size={16} style={{ marginRight: 4 }} />
                导航
              </Button>
            </Flex>
          </View>
        ))}
      </View>
    </View>
  );
}
