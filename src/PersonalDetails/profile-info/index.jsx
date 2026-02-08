import { View, Input, Button as NativeButton } from "@tarojs/components";
import { Cell, Button, Flex, Dialog } from "@taroify/core";
import { Edit } from "@taroify/icons";
import Taro from "@tarojs/taro";
import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext"; // 导入Context Hook
import { getUserInfo, applyPermission } from "../../api/user";
import { uploadMedia, MediaType } from "../../api/media";
import AuthAvatar from "../../components/AuthAvatar";
import "./index.scss";

export default function ProfileInfo() {
  const {
    userInfo: contextUserInfo,
    updateUserInfo,
    updateLocalUserInfo,
  } = useUser(); // 获取全局状态和更新方法
  // const [avatarError, setAvatarError] = useState(false); // AuthAvatar 内部管理错误状态

  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authCode, setAuthCode] = useState("");

  const [userInfo, setUserInfo] = useState({
    avatar: "",
    nickname: "",
    name: "",
    phoneNumber: "",
    address: "",
    permission: "",
  });

  // 当全局 UserInfo 变化时，同步到本地 State
  useEffect(() => {
    if (contextUserInfo) {
      setUserInfo({
        avatar: contextUserInfo.avatar || "",
        nickname: contextUserInfo.nickname || "",
        name: contextUserInfo.name || "",
        phoneNumber: contextUserInfo.phoneNumber || "",
        address: contextUserInfo.address || "",
        permission: contextUserInfo.permission || "普通用户",
      });
      // 重置头像错误状态
      // setAvatarError(false); // AuthAvatar 会在此 userInfo.avatar 变更时自动重置
    }
  }, [contextUserInfo]);

  const [activeField, setActiveField] = useState(null);

  const handleBack = () => {
    Taro.navigateBack();
  };

  const handleUpdate = (field, value) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleConfirm = (e) => {
    e.stopPropagation(); // 防止冒泡
    setActiveField(null);
    // 调用 Context 更新方法，同步保存到 Storage 和 Context
    updateUserInfo(userInfo);
    console.log("Saved & Updated Context:", userInfo);
  };

  const handleAuthUpgrade = async () => {
    if (!authCode) {
      Taro.showToast({ title: "请输入校验码", icon: "none" });
      return;
    }
    console.log("Submit Auth Code:", authCode);

    Taro.showLoading({ title: "校验中..." });
    try {
      const res = await applyPermission(authCode);
      console.log("Apply Permission Res:", res);

      if (res.code === 200) {
        Taro.showToast({ title: "权限提升成功", icon: "success" });
        setAuthDialogOpen(false);
        setAuthCode("");

        // 重新获取用户信息以更新权限显示
        const newUserInfo = await getUserInfo();
        if (newUserInfo && newUserInfo.user) {
          updateLocalUserInfo(newUserInfo.user);
        }
      } else if (res.code === 400) {
        Taro.showToast({ title: res.message || "校验失败", icon: "none" });
      }
    } catch (error) {
      console.error("Auth upgrade failed", error);
      // 避免覆盖全局 401 提示
      if (error?.code !== 401 && error?.statusCode !== 401) {
        Taro.showToast({ title: "校验请求失败", icon: "none" });
      }
    } finally {
      Taro.hideLoading();
    }
  };

  const onChooseAvatar = async (e) => {
    const { avatarUrl } = e.detail;
    if (!avatarUrl) {
      return;
    }

    Taro.showLoading({ title: "上传头像中..." });

    try {
      // 1. 压缩图片
      const compressedRes = await Taro.compressImage({
        src: avatarUrl,
        quality: 80, // 默认80，可调整
      });
      const compressedPath = compressedRes.tempFilePath;

      // 2. 上传文件获取 UUID
      // 根据需求：avatar=true (使用 MediaType.AVATAR = 2)
      const media = await uploadMedia(compressedPath, MediaType.AVATAR);
      const uuid = media.uuid;
      console.log("Avatar Uploaded, UUID:", uuid);

      // 3. 提交 UUID 到用户信息接口
      // 注意：这里我们使用最新的本地 userInfo 状态，将 avatar 字段替换为 UUID 发送
      const updatedInfo = { ...userInfo, avatar: uuid };
      await updateUserInfo(updatedInfo);

      Taro.showToast({ title: "头像更新成功", icon: "success" });
    } catch (error) {
      console.error("Avatar process/upload failed:", error);
      if (error?.code !== 401 && error?.statusCode !== 401) {
        Taro.showToast({ title: "头像上传失败", icon: "none" });
      }
    } finally {
      Taro.hideLoading();
    }
  };

  const renderEditableCell = (title, field, placeholder = "未设置") => {
    const isEditing = activeField === field;
    const value = userInfo[field];
    const displayValue = value || placeholder;

    if (isEditing) {
      return (
        <Cell title={title} titleStyle={{ fontWeight: "bold" }} align="center">
          <Flex align="center" justify="end" className="editable-wrapper">
            <Input
              value={value}
              placeholder={`请输入${title}`}
              onInput={(e) => handleUpdate(field, e.detail.value)}
              className="edit-input"
              focus
            />
            <Button
              size="small"
              className="confirm-btn"
              onClick={handleConfirm}
            >
              确认
            </Button>
          </Flex>
        </Cell>
      );
    }

    return (
      <Cell
        title={title}
        titleStyle={{ fontWeight: "bold" }}
        clickable
        onClick={() => setActiveField(field)}
      >
        <View className={value ? "cell-value" : "cell-placeholder"}>
          {displayValue}
        </View>
      </Cell>
    );
  };

  return (
    <View className="profile-info-page">
      <Dialog open={authDialogOpen} onClose={setAuthDialogOpen}>
        <Dialog.Header>权限提升校验</Dialog.Header>
        <Dialog.Content>
          <View style={{ padding: "10px 0" }}>
            <Input
              placeholder="请输入管理员校验码"
              value={authCode}
              onInput={(e) => setAuthCode(e.detail.value)}
              type="text"
              style={{
                border: "1px solid #ebedf0",
                background: "#fff",
                padding: "10px",
                borderRadius: "8px",
                textAlign: "center",
                fontSize: "16px",
              }}
            />
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onClick={() => setAuthDialogOpen(false)}>取消</Button>
          <Button onClick={handleAuthUpgrade} style={{ color: "#1989fa" }}>
            确认
          </Button>
        </Dialog.Actions>
      </Dialog>

      {/* 顶部区域 */}
      <View className="header-section">
        <Flex direction="column" align="center" className="user-display">
          <NativeButton
            className="avatar-wrapper"
            openType="chooseAvatar"
            onChooseAvatar={onChooseAvatar}
          >
            <AuthAvatar
              uuid={userInfo.avatar}
              className="avatar"
              shape="circle"
            />

            <View className="edit-icon">
              <Edit size={20} color="#fff" />
            </View>
          </NativeButton>
          <View className="username-pill">{userInfo.nickname || "用户"}</View>
        </Flex>
      </View>

      {/* 信息列表 */}
      <View className="info-card">
        {renderEditableCell("昵称", "nickname", "点击设置")}
        {renderEditableCell("姓名", "name", "点击设置")}
        {renderEditableCell("手机号", "phoneNumber", "点击设置")}
        {renderEditableCell("住址", "address", "点击设置")}
        <Cell title="权限" titleStyle={{ fontWeight: "bold" }}>
          <View style={{ color: "#969799" }}>
            {(() => {
              const permissionMap = {
                0: "访客",
                1: "普通用户",
                2: "二级管理员",
                3: "三级管理员",
              };
              return permissionMap[userInfo.permission] || "普通用户";
            })()}
          </View>
        </Cell>
      </View>

      <View style={{ margin: "20px 16px 0" }}>
        <Button
          variant="outlined"
          block
          shape="round"
          style={{
            color: "#1989fa",
            borderColor: "#1989fa",
            background: "#f0f9ff",
            fontSize: "18px",
          }}
          onClick={() => setAuthDialogOpen(true)}
        >
          使用校验码提升权限
        </Button>
      </View>

      {/* 底部返回按钮 */}
      <View className="footer-area">
        <View
          style={{
            textAlign: "center",
            color: "#969799",
            fontSize: "16px",
            marginBottom: "20px",
          }}
        >
          点击对应信息以修改
        </View>
        <Button
          shape="round"
          block
          style={{
            background: "linear-gradient(to right, #fcf380, #ee8b0a)",
            color: "#000000",
            fontWeight: 500,
            fontSize: "20px",
            border: "none",
            marginBottom: "10px",
          }}
          onClick={handleBack}
        >
          返回
        </Button>
      </View>
    </View>
  );
}
