import { View, Input } from '@tarojs/components'
import { Image, Cell, Button, Flex, Uploader } from '@taroify/core'
import { Edit } from '@taroify/icons'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import './index.scss'

export default function ProfileInfo() {
  const [userInfo, setUserInfo] = useState({
    avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
    nickname: '用户PkZzq4',
    name: '',
    phone: '',
    address: ''
  })
  const [activeField, setActiveField] = useState(null)
  
  const handleBack = () => {
    Taro.navigateBack()
  }

  const handleUpdate = (field, value) => {
    setUserInfo(prev => ({ ...prev, [field]: value }))
  }

  const handleConfirm = (e) => {
    e.stopPropagation() // 防止冒泡
    setActiveField(null)
    // 这里后续可以添加API调用保存逻辑
    console.log('Saved:', userInfo)
  }

  const handleAvatarClick = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const url = res.tempFilePaths[0]
        handleUpdate('avatar', url)
      }
    })
  }

  const renderEditableCell = (title, field, placeholder = '未设置') => {
    const isEditing = activeField === field
    const value = userInfo[field]
    const displayValue = value || placeholder

    if (isEditing) {
        return (
            <Cell title={title} titleStyle={{ fontWeight: 'bold' }} align="center">
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
        )
    }

    return (
        <Cell 
            title={title} 
            titleStyle={{ fontWeight: 'bold' }} 
            clickable 
            onClick={() => setActiveField(field)}
        >
            <View className={value ? 'cell-value' : 'cell-placeholder'}>{displayValue}</View>
        </Cell>
    )
  }

  return (
    <View className='profile-info-page'>
      {/* 顶部区域 */}
      <View className='header-section'>
        <Flex direction="column" align="center" className="user-display">
          <View className="avatar-wrapper" onClick={handleAvatarClick}>
             <Image round className='avatar' src={userInfo.avatar} />
             <View className="edit-icon">
                <Edit size={20} color="#fff" />
             </View>
          </View>
          <View className="username-pill">{userInfo.nickname || '用户'}</View>
        </Flex>
      </View>

      {/* 信息列表 */}
      <View className='info-card'>
        {renderEditableCell('昵称', 'nickname', '用户PkZzq4')}
        {renderEditableCell('姓名', 'name', '未设置')}
        {renderEditableCell('手机号', 'phone', '未绑定')}
        {renderEditableCell('住址', 'address', '未设置')}
        
        <Cell title="用户ID" titleStyle={{ fontWeight: 'bold' }} style={{ color: '#9aa0a9' }}>41</Cell>
        <Cell title="注册时间" titleStyle={{ fontWeight: 'bold' }} style={{ borderBottom: 'none', color: '#9aa0a9' }}>2026年1月28日</Cell>
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