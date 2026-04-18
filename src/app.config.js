export default defineAppConfig({
  pages: [
    "pages/index/index",
    "Chat/chat/index",
    "PersonalDetails/profile/index",
    "PersonalDetails/profile-info/index",
    "PersonalDetails/about/index",
    "ContactCommunity/Contact/index",
    "HealthService/index",
    "ResourceList/index",
    "ServiceMap/index",
    "Feedback/index",
    "HealthGuidance/index",
    "HealthGuidance/preview/index",
    "PolicyPreview/index",
    "ElderlyCareMeal/index",
    "MoreServices/index",
  ],
  subPackages: [
    {
      root: "PolicyRegulation",
      pages: ["index"],
    },
  ],
  preloadRule: {
    "PolicyRegulation/index": {
      network: "all",
      packages: ["PolicyRegulation"],
    },
  },
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
