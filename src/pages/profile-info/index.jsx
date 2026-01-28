import { View } from '@tarojs/components'
import { Image, Cell, Button, Flex } from '@taroify/core'
import { Edit } from '@taroify/icons'
import Taro from '@tarojs/taro'
import './index.scss'

export default function ProfileInfo() {
  
  const handleBack = () => {
    Taro.navigateBack()
  }

  return (
    <View className='profile-info-page'>
      {/* 顶部区域 */}
      <View className='header-section'>
        <Flex direction="column" align="center" className="user-display">
          <View className="avatar-wrapper">
             <Image round className='avatar' src='https://img.yzcdn.cn/vant/cat.jpeg' />
             <View className="edit-icon">
                <Edit size={20} color="#fff" />
             </View>
          </View>
          <View className="username-pill">用户PkZzq4</View>
        </Flex>
      </View>

      {/* 信息列表 */}
      <View className='info-card'>
        <Cell title="昵称" titleStyle={{ fontWeight: 'bold' }}>用户PkZzq4</Cell>
        <Cell title="姓名" titleStyle={{ fontWeight: 'bold' }}>未设置</Cell>
        <Cell title="手机号" titleStyle={{ fontWeight: 'bold' }}>未绑定</Cell>
        <Cell title="住址" titleStyle={{ fontWeight: 'bold' }}>未设置</Cell>
        <Cell title="用户ID" titleStyle={{ fontWeight: 'bold' }}>41</Cell>
        <Cell title="注册时间" titleStyle={{ fontWeight: 'bold' }} style={{ borderBottom: 'none' }}>2026年1月28日</Cell>
      </View>

      {/* 底部返回按钮 */}
      <View className='footer-area'>
        <Button 
          shape="round" 
          block 
          style={{ 
            background: "linear-gradient(to right, #fcf380, #ee8b0a)", 
            color: "#000000",
            fontWeight: 500,
            fontSize: '20px',
            border: "none"
          }}
          onClick={handleBack}
        >
          返回
        </Button>
      </View>
    </View>
  )
}