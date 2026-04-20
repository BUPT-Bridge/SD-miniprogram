import { View } from "@tarojs/components";
import Cell from "@taroify/core/cell";
import Button from "@taroify/core/button";
import Image from "@taroify/core/image";
import Tag from "@taroify/core/tag";
import Flex from "@taroify/core/flex";
import Dialog from "@taroify/core/dialog";
import ShareSheet from "@taroify/core/share-sheet";
import User from "@taroify/icons/User";
import Scan from "@taroify/icons/Scan";
import InfoOutlined from "@taroify/icons/InfoOutlined";
import ContactOutlined from "@taroify/icons/ContactOutlined";
import ShareOutlined from "@taroify/icons/ShareOutlined";
import Taro, { useLoad } from "@tarojs/taro";
import { useState } from "react";
import "./index.scss";
import { performWechatLogin } from "../../api/user.js";
import { useUser } from "../../context/UserContext";
import AuthAvatar from "../../components/AuthAvatar";
import qrCodeImg from "../../static/QR_code.jpg";

export default function Profile() {
  const { userInfo, isLogged, login, logout } = useUser();
  const [open, setOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  useLoad(() => {
    console.log("Profile Page loaded.");
  });

  const handleLogout = () => {
    Taro.showModal({
      title: "提示",
      content: "确定要退出登录吗？",
      success: function (res) {
        if (res.confirm) {
          logout();
          Taro.showToast({ title: "已退出", icon: "none" });
        }
      },
    });
  };

  const handleLogin = async () => {
    if (isLogged) return;
    Taro.showLoading({ title: "登录中..." });
    try {
      const user = await performWechatLogin();
      login(user);
      console.log("登录成功", user);
    } catch (e) {
      console.error(e);
    } finally {
      Taro.hideLoading();
    }
  };

  return (
    <View className="profile-page">
      <ShareSheet
        open={shareOpen}
        onClose={setShareOpen}
        style={{ zIndex: 10000 }}
      >
        <ShareSheet.Header title="立即分享给好友" />
        <ShareSheet.Options>
          <ShareSheet.Option icon="wechat" name="微信" openType="share" />
          {/* <ShareSheet.Option icon="poster" name="海报" />
          <ShareSheet.Option icon="link" name="链接" />
          <ShareSheet.Option icon="weapp-qrcode" name="小程序码" /> */}
        </ShareSheet.Options>
        <ShareSheet.Button type="cancel" onClick={() => setShareOpen(false)}>
          取消
        </ShareSheet.Button>
      </ShareSheet>
      <Dialog open={open} onClose={setOpen}>
        <Dialog.Content>
          <View
            style={{
              textAlign: "center",
              marginBottom: "10px",
              fontSize: "16px",
              color: "#333",
            }}
          >
            长按识别二维码关注
          </View>
          <View
            style={{
              background: "#fff7e6",
              padding: "4vw",
              borderRadius: "12px",
            }}
          >
            <Image
              src={qrCodeImg}
              showMenuByLongpress
              style={{
                width: "100%",
                height: "auto",
                aspectRatio: "1/1",
                display: "block",
                margin: "0 auto",
              }}
            />
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onClick={() => setOpen(false)} style={{ color: "#ee0a24" }}>
            确认
          </Button>
        </Dialog.Actions>
      </Dialog>

      {/* 用户卡片 */}
      <View className="user-card">
        <View className="avatar-container">
          <AuthAvatar
            uuid={isLogged ? userInfo?.avatar : null}
            className="avatar"
            shape="circle"
          />
        </View>

        <Flex direction="column" align="center" className="user-info">
          <Cell className="nickname-box" clickable center={false}>
            {isLogged ? userInfo?.nickname || "微信用户" : "未登录"}
          </Cell>
          {/*
          <Flex direction="column" align="center" className="status-row">
            <Flex align="center" className="status-item">
              <LocationOutlined />
              <Text className="label">社区: </Text>
              {isLogged ? (
                <Text className="value">上地街道</Text>
              ) : (
                <Text className="value">未登录</Text>
              )}
            </Flex>
          </Flex> */}
          {isLogged ? (
            <Tag color="success" shape="rounded" size="large">
              已登录
            </Tag>
          ) : (
            <Tag color="warning" shape="rounded" size="large">
              未登录
            </Tag>
          )}
        </Flex>
      </View>

      {/* 功能列表 */}
      <View className="action-list">
        <Cell
          align="center"
          title="个人信息"
          icon={<ContactOutlined className="icon-orange" />}
          isLink
          size="large"
          clickable
          onClick={() =>
            Taro.navigateTo({ url: "/PersonalDetails/profile-info/index" })
          }
        />
        <Cell
          align="center"
          title="关注公众号"
          icon={<Scan className="icon-orange" />}
          isLink
          size="large"
          clickable
          onClick={() => setOpen(true)}
        />
        <Cell
          title="关于我们"
          icon={<InfoOutlined className="icon-orange" />}
          isLink
          size="large"
          Share
          clickable
          onClick={() =>
            Taro.navigateTo({ url: "/PersonalDetails/about/index" })
          }
        />
        <Cell
          align="center"
          title="分享小程序"
          icon={<ShareOutlined className="icon-orange" />}
          isLink
          size="large"
          clickable
          onClick={() => setShareOpen(true)}
        />
      </View>

      {/* 底部登录/退出按钮 */}
      <View className="footer-action">
        {isLogged ? (
          <Button
            shape="round"
            block
            style={{
              background: "#FFD21E",
              color: "#ffffff",
              border: "1px solid #ffffff",
            }}
            onClick={handleLogout}
          >
            退出登录
          </Button>
        ) : (
          <Button
            shape="round"
            block
            style={{
              background: "linear-gradient(to right, #FFD21E, #FFD21E)",
              color: "#fff",
              border: "none",
            }}
            onClick={handleLogin}
          >
            <User size={30} style={{ marginRight: 8 }} />
            点击登录
          </Button>
        )}
      </View>
    </View>
  );
}
