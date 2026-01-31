export default defineAppConfig({
  pages: [
    "pages/index/index",
    "Chat/chat/index",
    "PersonalDetails/profile/index",
    "PersonalDetails/profile-info/index",
    "PersonalDetails/about/index",
    "ContactCommunity/Contact/index",
    "PolicyRegulation/index",
    "HealthService/index",
    "ResourceList/index",
    "ServiceMap/index",
    "Feedback/index",
    "HealthGuidance/index",
    "ElderlyCareMeal/index",
    "MoreServices/index",
  ],
  tabBar: {
    custom: true,
    color: "#000000",
    selectedColor: "#FF6B6B",
    backgroundColor: "#ffffff",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
      },
      {
        pagePath: "Chat/chat/index",
        text: "AI聊天",
      },
      {
        pagePath: "PersonalDetails/profile/index",
        text: "我的",
      },
    ],
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
});
