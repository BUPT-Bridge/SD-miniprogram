import { View, Text } from '@tarojs/components'
import { Cell, Button, Image, Tag, Flex, Dialog, ShareSheet } from '@taroify/core'
import { User, Scan, InfoOutlined, Manager, UnderwayOutlined, LocationOutlined, ContactOutlined, Passed, Close, ShareOutlined } from '@taroify/icons'
import { useLoad } from '@tarojs/taro'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import './index.scss'
import { Warning } from 'postcss'

export default function Profile() {
  const [open, setOpen] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)

  useLoad(() => {
    console.log('Profile Page loaded.')
  })

  return (
    <View className='profile-page'>
      <ShareSheet open={shareOpen} onClose={setShareOpen} style={{ zIndex: 10000 }}>
        <ShareSheet.Header title="立即分享给好友" />
        <ShareSheet.Options>
          <ShareSheet.Option icon="wechat" name="微信" openType="share" />
          {/* <ShareSheet.Option icon="poster" name="海报" />
          <ShareSheet.Option icon="link" name="链接" />
          <ShareSheet.Option icon="weapp-qrcode" name="小程序码" /> */}
        </ShareSheet.Options>
        <ShareSheet.Button type="cancel" onClick={() => setShareOpen(false)}>取消</ShareSheet.Button>
      </ShareSheet>
      <Dialog open={open} onClose={setOpen}>
        <Dialog.Content>
            <View style={{ textAlign: 'center', marginBottom: '10px', fontSize: '16px', color: '#333' }}>长按识别二维码关注</View>
            <View style={{ background: '#fff7e6', padding: '4vw', borderRadius: '12px' }}>
                <Image 
                    src='https://img.yzcdn.cn/vant/cat.jpeg' 
                    showMenuByLongpress
                    style={{ width: '100%', height: 'auto', aspectRatio: '1/1', display: 'block', margin: '0 auto' }} 
                />
            </View>
        </Dialog.Content>
        <Dialog.Actions>
            <Button onClick={() => setOpen(false)} style={{ color: '#ee0a24' }}>确认</Button>
        </Dialog.Actions>
      </Dialog>

      {/* 用户卡片 */}
      <View className='user-card'>
        <View className='avatar-container'>
          <Image round className='avatar' src='https://img.yzcdn.cn/vant/cat.jpeg' />
        </View>
        
        <Flex direction="column" align="center" className='user-info'>
          <Cell className='nickname-box' clickable center={false}>
            未登录
          </Cell>
          
          <Flex direction="column" align="center" className='status-row'>
            <Flex align="center" className='status-item'>
              <UnderwayOutlined /> 
              <Text className='label'>注册时间: </Text>
              <Text className='value'>未登录</Text>
            </Flex>
            <Flex align="center" className='status-item'>
              <LocationOutlined />
              <Text className='label'>社区: </Text>
              <Text className='value'>上地街道</Text>
            </Flex>
          </Flex>
          <Tag color="warning" shape="rounded" size="large">
             <Close />
              未登录
          </Tag>
          {/* <Tag color="warning" shape="rounded" size="large">
             <Passed />
              已登录
          </Tag> */}
        </Flex>
      </View>

      {/* 功能列表 */}
      <View className='action-list'>
        <Cell 
          align="center" 
          title="个人信息" 
          icon={<ContactOutlined className="icon-orange" />} 
          isLink 
          size="large" 
          clickable 
          onClick={() => Taro.navigateTo({ url: '/pages/profile-info/index' })} 
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
          size="large" Share
          clickable
          onClick={() => Taro.navigateTo({ url: '/pages/about/index' })} 
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

      {/* 底部登录按钮 */}
      <View className='footer-action'>
        <Button 
          shape="round" 
          block 
          style={{ 
            background: "linear-gradient(to right, #ff6034, #ee0a24)", 
            color: "#fff",
            border: "none"
          }}
        >
          <User size={30} style={{ marginRight: 8 }} />
          点击登录
        </Button>
      </View>
    </View>
  )
}
