import Taro from "@tarojs/taro";
import { Component } from "react";
import Tabbar from "@taroify/core/tabbar";
import HomeOutlined from "@taroify/icons/HomeOutlined";
import ChatOutlined from "@taroify/icons/ChatOutlined";
import ManagerOutlined from "@taroify/icons/ManagerOutlined";
import "@taroify/core/tabbar/style";
import "@taroify/icons/styles/icon.scss";
import "./index.scss";

export default class CustomTabBar extends Component {
  constructor(props) {
    super(props);

    // 在初始化时就根据当前页面设置正确的 active
    const pages = Taro.getCurrentPages();
    let initialActive = 0;

    if (pages.length > 0) {
      const currentPage = pages[pages.length - 1];
      const currentPath = "/" + currentPage.route;

      const pathMap = {
        "/pages/index/index": 0,
        "/Chat/chat/index": 1,
        "/PersonalDetails/profile/index": 2,
      };

      initialActive =
        pathMap[currentPath] !== undefined ? pathMap[currentPath] : 0;
      console.log(
        "[TabBar] constructor - initialActive:",
        initialActive,
        "from path:",
        currentPath,
      );
    }

    this.state = {
      active: initialActive,
    };
  }

  componentDidMount() {
    console.log("[TabBar] componentDidMount");
  }

  componentDidShow() {
    console.log("[TabBar] componentDidShow");
    this.updateActive();
  }

  updateActive = () => {
    const pages = Taro.getCurrentPages();
    console.log("[TabBar] updateActive - pages length:", pages.length);

    if (pages.length === 0) return;

    const currentPage = pages[pages.length - 1];
    const currentPath = "/" + currentPage.route;
    console.log("[TabBar] updateActive - currentPath:", currentPath);

    const pathMap = {
      "/pages/index/index": 0,
      "/Chat/chat/index": 1,
      "/PersonalDetails/profile/index": 2,
    };

    const active = pathMap[currentPath];
    console.log(
      "[TabBar] updateActive - mapped active:",
      active,
      "current state.active:",
      this.state.active,
    );

    if (active !== undefined && active !== this.state.active) {
      console.log("[TabBar] setState active:", active);
      this.setState({ active });
    }
  };

  onChange = (value) => {
    console.log("[TabBar] onChange - value:", value);

    const urls = [
      "/pages/index/index",
      "/Chat/chat/index",
      "/PersonalDetails/profile/index",
    ];

    const url = urls[value];
    console.log("[TabBar] switchTab to:", url);

    if (url) {
      Taro.switchTab({ url });
    }
  };

  render() {
    console.log("[TabBar] render - active:", this.state.active);
    return (
      <Tabbar
        value={this.state.active}
        onChange={this.onChange}
        className="custom-tabbar"
        fixed
      >
        <Tabbar.TabItem value={0} icon={<HomeOutlined />}>
          首页
        </Tabbar.TabItem>
        <Tabbar.TabItem value={1} icon={<ChatOutlined />}>
          AI聊天
        </Tabbar.TabItem>
        <Tabbar.TabItem value={2} icon={<ManagerOutlined />}>
          我的
        </Tabbar.TabItem>
      </Tabbar>
    );
  }
}
