import { View, Text } from '@tarojs/components'
import { Image, Cell, Button, Flex, Tag } from '@taroify/core'
import { CommentOutlined, FriendsOutlined, SettingOutlined, ShieldOutlined } from '@taroify/icons'
import Taro from '@tarojs/taro'
import './index.scss'

export default function About() {
  
  const handleBack = () => {
    Taro.navigateBack()
  }

  return (
    <View className='about-page'>
      {/* 顶部区域 */}
      <View className='header-section'>
        <Flex direction="column" align="center" className="app-display">
          <View className="logo-wrapper">
             <Image className='logo' src='https://img.yzcdn.cn/vant/cat.jpeg' />
          </View>
          <View className="app-name">上地小e养老</View>
          <View className="version-tag">
            <Text>版本 1.0.0</Text>
          </View>
          <View className="description">
            小e助手是通过智能化数字人虚拟助手为核心抓手，致力于通过科技手段提升为老服务水平，满足老年人日益增长的智能化生活需求。
          </View>
        </Flex>
      </View>

      {/* 应用信息卡片 */}
      <View className='info-card'>
        <Cell title="应用名称" className='info-cell'>上地小e养老</Cell>
        <Cell title="当前版本" className='info-cell'>1.0.0</Cell>
        <Cell title="开发团队" className='info-cell'>北京邮电大学开发团队</Cell>
        <Cell 
          title="联系我们" 
          isLink 
          clickable
          className='info-cell'
          onClick={() => {
            Taro.setClipboardData({
              data: '302511800@qq.com'
            })
          }}
        >
          302511800@qq.com
        </Cell>
      </View>

      {/* 功能特色卡片 */}
      <View className='feature-card'>
        <View className="card-title">功能特色</View>
        <View className="feature-list">
            <View className="feature-item">
                <CommentOutlined className="feature-icon" />
                <Text>AI智能聊天助手</Text>
            </View>
            <View className="feature-item">
                <FriendsOutlined className="feature-icon" />
                <Text>社区服务便民</Text>
            </View>
            <View className="feature-item">
                <SettingOutlined className="feature-icon" />
                <Text>个性化设置</Text>
            </View>
            <View className="feature-item">
                <ShieldOutlined className="feature-icon" />
                <Text>用户隐私保护</Text>
            </View>
        </View>
      </View>

      {/* 底部版权 */}
      <View className='copyright-area'>
        <View>© 2026 北京邮电大学开发团队</View>
        <View>All rights reserved</View>
      </View>

      {/* 底部返回按钮 */}
      <View className='footer-area'>
        <Button 
          shape="round" 
          block 
          style={{ 
            background: "linear-gradient(to right, #86ffbd, #03ffff)", 
            color: "#000000",
            border: "none",
            width: "60%",
            margin: "0 auto"
          }}  
          onClick={handleBack}
        >
          返回
        </Button>
      </View>
    </View>
  )
}