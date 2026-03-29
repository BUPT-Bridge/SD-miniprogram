# AGENTS.md

本项目为 AI 编码助手提供的项目指南。

## 项目概述

**上地街道小e助手** 是一个基于 Taro 框架开发的微信小程序，为北京市海淀区上地街道居民提供社区服务。项目包含首页服务导航、AI 聊天助手、个人中心等功能模块。

- **项目名称**: ShangDi-Taro
- **应用ID**: wx7e506f876c30f9d3 (生产环境)
- **技术栈**: Taro 4.1.9 + React 18 + Webpack5 + SCSS
- **UI 组件库**: Taroify
- **状态管理**: React Context
- **数据传输**: Protocol Buffers (protobufjs)

## 项目结构

```
SD-miniprogram/
├── config/                 # Taro 构建配置
│   ├── index.js           # 主配置（区分开发和生产环境）
│   ├── dev.js             # 开发环境配置
│   └── prod.js            # 生产环境配置
├── src/                   # 源代码目录
│   ├── api/               # API 接口层
│   │   ├── proto/         # Protobuf 定义文件 (.proto) 和生成的 JS
│   │   ├── request.js     # 统一请求封装
│   │   ├── user.js        # 用户相关 API
│   │   ├── feedback.js    # 反馈相关 API
│   │   ├── healthService.js # 健康服务 API
│   │   └── index.js       # API 统一导出
│   ├── components/        # 公共组件
│   │   ├── AuthAvatar/    # 授权头像组件
│   │   ├── BannerSwiper/  # 轮播图组件
│   │   ├── ServiceGrid/   # 服务网格组件
│   │   └── WarmTip/       # 温馨提示组件
│   ├── context/           # React Context
│   │   └── UserContext.js # 用户状态管理
│   ├── custom-tab-bar/    # 自定义 TabBar
│   ├── pages/             # 首页（Tab页）
│   ├── Chat/              # AI 聊天页面
│   ├── PersonalDetails/   # 个人中心相关页面
│   ├── ContactCommunity/  # 联系社区
│   ├── PolicyRegulation/  # 政策法规
│   ├── HealthService/     # 卫生服务
│   ├── ResourceList/      # 资源清单
│   ├── ServiceMap/        # 服务地图
│   ├── Feedback/          # 意见反馈
│   ├── HealthGuidance/    # 健康指导
│   ├── ElderlyCareMeal/   # 养老用餐
│   ├── MoreServices/      # 更多服务
│   ├── static/            # 静态资源
│   ├── app.config.js      # 应用全局配置（页面路由、TabBar等）
│   ├── app.js             # 应用入口
│   ├── app.scss           # 全局样式
│   └── index.html         # H5 入口
├── dist/                  # 编译输出目录（微信开发者工具指向此目录）
├── .env.development       # 开发环境变量
├── .env.example           # 环境变量示例
└── package.json           # 项目依赖和脚本
```

## 开发环境配置

### 前置要求

- **Node.js**: v20.19.6 (见 `.nvmrc`)
- **包管理器**: Yarn (推荐) 或 npm

### 初始化项目

```bash
yarn install
```

### 环境变量

创建 `.env.development` 文件（开发环境）：

```
TARO_APP_ID=wx8a2d90a5103413d8
TARO_APP_API=http://123.56.99.128:8000
```

生产环境使用 `.env.production` 文件。

可用环境变量：

- `TARO_APP_ID`: 微信小程序 AppID
- `TARO_APP_API`: 后端 API 地址

## 常用命令

```bash
# 开发模式（热重载）
yarn dev

# 构建生产版本
yarn build

# 创建新页面/组件
yarn new

# 代码格式化（Prettier + ESLint + Stylelint）
yarn fmt
```

## 技术架构详解

### 1. 路由配置

页面路由在 `src/app.config.js` 中定义：

```javascript
pages: [
  "pages/index/index", // 首页
  "Chat/chat/index", // AI 聊天
  "PersonalDetails/profile/index", // 个人中心
  // ... 其他页面
];
```

TabBar 配置（自定义样式）：

- 首页 (`pages/index/index`)
- AI聊天 (`Chat/chat/index`)
- 我的 (`PersonalDetails/profile/index`)

### 2. 状态管理

使用 React Context 进行全局状态管理：

```javascript
// 获取用户状态
import { useUser } from "../../context/UserContext";

function MyComponent() {
  const { userInfo, isLogged, login, logout, updateUserInfo } = useUser();
  // ...
}
```

Context 功能：

- `userInfo`: 当前用户信息
- `isLogged`: 登录状态
- `login(user)`: 登录
- `logout()`: 登出
- `updateUserInfo(newInfo)`: 更新用户信息（调用后端 API）
- `updateLocalUserInfo(user)`: 仅更新本地状态

### 3. API 请求层

#### 基础请求 (`src/api/request.js`)

```javascript
import request from "../../api/request";

// 普通 JSON 请求
const data = await request({
  url: "/api/example",
  method: "GET",
  data: { key: "value" },
});
```

#### Protobuf 通信

项目使用 Protocol Buffers 进行前后端通信，API 层负责编解码：

```javascript
// 接收 protobuf 响应
export const getUserInfo = () => {
  return request({
    url: "/api/user/info",
    method: "GET",
    responseType: "arraybuffer", // 关键：声明接收二进制
  }).then((res) => decodeUserResponse(res));
};

// 发送 protobuf 请求
export const modifyUserInfo = (userInfo) => {
  const message = UserRequest.create(userInfo);
  const buffer = UserRequest.encode(message).finish();

  return request({
    url: "/api/user/modify",
    method: "PUT",
    header: {
      "Content-Type": "application/x-protobuf",
      Authorization: Taro.getStorageSync("token") || "",
    },
    data: buffer.buffer.slice(
      buffer.byteOffset,
      buffer.byteOffset + buffer.byteLength,
    ),
    responseType: "arraybuffer",
  }).then((res) => decodeUserResponse(res));
};
```

**Protobuf 文件位置**: `src/api/proto/`

- `.proto` 文件：协议定义
- `.js` 文件：`protobufjs` 生成的编解码文件

### 4. 认证流程

1. **登录**: 调用 `performWechatLogin()` 获取微信 code，后端换取 token
2. **Token 存储**: 保存到本地存储 (`Taro.setStorageSync`) 和内存
3. **自动验证**: 应用启动时自动验证 token 有效性
4. **401 处理**: 全局监听 `auth:logout` 事件，自动登出并提示重新登录

### 5. 页面配置

每个页面可包含以下文件：

- `index.jsx`: 页面组件
- `index.scss`: 页面样式
- `index.config.js`: 页面配置（导航栏标题等）

示例 (`index.config.js`):

```javascript
export default definePageConfig({
  navigationBarTitleText: "页面标题",
});
```

## 代码规范

### ESLint 配置 (`.eslintrc`)

- 继承 `taro/react` 规则
- JSX 使用双引号
- 支持 `definePageConfig` 和 `defineAppConfig` 全局变量

### Stylelint 配置 (`stylelint.config.mjs`)

- 使用 `stylelint-config-standard-scss`
- 支持 SCSS 语法（双斜杠注释、@use/@forward）
- 允许 BEM 命名和第三方库的 class 命名
- 支持 `:global` 伪类

### Prettier

默认配置，格式化：

- JavaScript/TypeScript/JSX/TSX
- JSON/Markdown/YAML
- CSS/SCSS/Sass

### 提交规范

使用 Conventional Commits 规范，通过 Husky + lint-staged 在提交前自动格式化代码。

```bash
# 提交前会自动运行
yarn lint-staged
```

## 开发指南

### 添加新页面

1. 在 `src/` 下创建页面目录（如 `src/NewPage/index.jsx`）
2. 在 `src/app.config.js` 的 `pages` 数组中添加路由
3. 如需 TabBar，在 `tabBar.list` 中配置

### 使用 Taroify 组件

```javascript
import { Button, Cell } from "@taroify/core";
import { HomeOutlined } from "@taroify/icons";

// 引用组件
<Button color="primary">按钮</Button>
<HomeOutlined />
```

### 样式开发

- 使用 SCSS 语法
- 全局样式在 `app.scss` 中定义
- 页面/组件样式使用局部 class，避免全局污染
- Taroify 主题变量可通过 `@use` 引入

### 图片资源

- 静态图片放在 `src/static/`
- 远程图片直接使用 URL
- 生产环境图片建议上传 CDN

## 部署流程

### 开发环境

1. 运行 `yarn dev` 启动开发服务器
2. 使用微信开发者工具打开 `dist/` 目录
3. 配置项目设置（AppID 等）

### 生产部署

1. 运行 `yarn build` 构建生产版本
2. 在微信开发者工具中上传代码
3. 登录微信公众平台提交审核

## 注意事项

1. **Protobuf 变更**: 修改 `.proto` 文件后需重新生成 `.js` 文件（使用 `protobufjs` CLI）
2. **API 地址**: 开发/生产环境在 `config/dev.js` 和 `config/prod.js` 中配置
3. **Node 版本**: 必须使用 Node.js v20.19.6，使用 nvm 切换：`nvm use`
4. **Git 提交**: 提交前会自动格式化代码，确保 lint 通过

## 相关链接

- [Taro 文档](https://docs.taro.zone/)
- [Taroify 文档](https://taroify.gitee.io/taroify.com/)
- [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [Protocol Buffers 文档](https://developers.google.com/protocol-buffers)
