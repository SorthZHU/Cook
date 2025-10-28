import { View, Text, Image } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import styles from './index.module.scss'

// Tab配置
const tabs = [
  { id: 'home', name: '首页', icon: '🏠' },
  { id: 'tutorial', name: '教程', icon: '📚' },
  { id: 'order', name: '点餐', icon: '🍽️' },
  { id: 'profile', name: '我的', icon: '👤' }
]

// 首页内容组件
const HomeContent = () => (
  <View className={styles['tab-content']}>
    <View className={styles['banner']}>
      <Text className={styles['banner-title']}>🍳 试试做菜</Text>
      <Text className={styles['banner-subtitle']}>学做菜，享美食</Text>
    </View>

    <View className={styles['feature-grid']}>
      <View className={styles['feature-item']}>
        <Text className={styles['feature-icon']}>📖</Text>
        <Text className={styles['feature-text']}>菜谱教程</Text>
      </View>
      <View className={styles['feature-item']}>
        <Text className={styles['feature-icon']}>🛒</Text>
        <Text className={styles['feature-text']}>在线点餐</Text>
      </View>
      <View className={styles['feature-item']}>
        <Text className={styles['feature-icon']}>⭐</Text>
        <Text className={styles['feature-text']}>收藏菜谱</Text>
      </View>
      <View className={styles['feature-item']}>
        <Text className={styles['feature-icon']}>👨‍🍳</Text>
        <Text className={styles['feature-text']}>成为大厨</Text>
      </View>
    </View>

    <View className={styles['section']}>
      <Text className={styles['section-title']}>🔥 热门推荐</Text>
      <View className={styles['recipe-list']}>
        <View className={styles['recipe-item']}>
          <Text className={styles['recipe-emoji']}>🍖</Text>
          <Text className={styles['recipe-name']}>红烧肉</Text>
        </View>
        <View className={styles['recipe-item']}>
          <Text className={styles['recipe-emoji']}>🐟</Text>
          <Text className={styles['recipe-name']}>清蒸鲈鱼</Text>
        </View>
        <View className={styles['recipe-item']}>
          <Text className={styles['recipe-emoji']}>🥬</Text>
          <Text className={styles['recipe-name']}>蒜蓉小白菜</Text>
        </View>
      </View>
    </View>
  </View>
)

// 教程内容组件
const TutorialContent = () => (
  <View className={styles['tab-content']}>
    <View className={styles['search-bar']}>
      <Text className={styles['search-placeholder']}>🔍 搜索菜谱教程...</Text>
    </View>

    <View className={styles['category-tabs']}>
      <Text className={styles['category-tab active']}>全部</Text>
      <Text className={styles['category-tab']}>家常菜</Text>
      <Text className={styles['category-tab']}>川菜</Text>
      <Text className={styles['category-tab']}>粤菜</Text>
    </View>

    <View className={styles['section']}>
      <Text className={styles['section-title']}>📚 精选教程</Text>
      <View className={styles['tutorial-list']}>
        <View className={styles['tutorial-item']}>
          <Text className={styles['tutorial-emoji']}>🍲</Text>
          <View className={styles['tutorial-info']}>
            <Text className={styles['tutorial-title']}>麻婆豆腐制作教程</Text>
            <Text className={styles['tutorial-meta']}>⏱️ 30分钟 | ⭐ 4.8分</Text>
          </View>
        </View>
        <View className={styles['tutorial-item']}>
          <Text className={styles['tutorial-emoji']}>🍜</Text>
          <View className={styles['tutorial-info']}>
            <Text className={styles['tutorial-title']}>兰州拉面制作秘籍</Text>
            <Text className={styles['tutorial-meta']}>⏱️ 45分钟 | ⭐ 4.9分</Text>
          </View>
        </View>
        <View className={styles['tutorial-item']}>
          <Text className={styles['tutorial-emoji']}>🥟</Text>
          <View className={styles['tutorial-info']}>
            <Text className={styles['tutorial-title']}>手工饺子包法大全</Text>
            <Text className={styles['tutorial-meta']}>⏱️ 60分钟 | ⭐ 4.7分</Text>
          </View>
        </View>
      </View>
    </View>
  </View>
)

// 点餐内容组件
const OrderContent = () => (
  <View className={styles['tab-content']}>
    <View className={styles['location-bar']}>
      <Text className={styles['location-text']}>📍 当前位置：北京市朝阳区</Text>
    </View>

    <View className={styles['section']}>
      <Text className={styles['section-title']}>🏪 附近餐厅</Text>
      <View className={styles['restaurant-list']}>
        <View className={styles['restaurant-item']}>
          <Text className={styles['restaurant-emoji']}>🏮</Text>
          <View className={styles['restaurant-info']}>
            <Text className={styles['restaurant-name']}>川味小厨</Text>
            <Text className={styles['restaurant-meta']}>⭐ 4.6分 | 🚚 30分钟送达</Text>
            <Text className={styles['restaurant-desc']}>正宗川菜，麻辣鲜香</Text>
          </View>
        </View>
        <View className={styles['restaurant-item']}>
          <Text className={styles['restaurant-emoji']}>🥢</Text>
          <View className={styles['restaurant-info']}>
            <Text className={styles['restaurant-name']}>家常菜馆</Text>
            <Text className={styles['restaurant-meta']}>⭐ 4.5分 | 🚚 25分钟送达</Text>
            <Text className={styles['restaurant-desc']}>家常美味，温馨实惠</Text>
          </View>
        </View>
        <View className={styles['restaurant-item']}>
          <Text className={styles['restaurant-emoji']}>🍱</Text>
          <View className={styles['restaurant-info']}>
            <Text className={styles['restaurant-name']}>精品餐厅</Text>
            <Text className={styles['restaurant-meta']}>⭐ 4.8分 | 🚚 40分钟送达</Text>
            <Text className={styles['restaurant-desc']}>精致料理，品质保证</Text>
          </View>
        </View>
      </View>
    </View>
  </View>
)

// 我的内容组件
const ProfileContent = () => (
  <View className={styles['tab-content']}>
    <View className={styles['profile-header']}>
      <View className={styles['avatar']}>
        <Text className={styles['avatar-text']}>张</Text>
      </View>
      <View className={styles['profile-info']}>
        <Text className={styles['username']}>张小厨</Text>
        <Text className={styles['user-level']}>🏆 美食达人</Text>
      </View>
    </View>

    <View className={styles['stats-grid']}>
      <View className={styles['stat-item']}>
        <Text className={styles['stat-number']}>25</Text>
        <Text className={styles['stat-label']}>学会菜谱</Text>
      </View>
      <View className={styles['stat-item']}>
        <Text className={styles['stat-number']}>8</Text>
        <Text className={styles['stat-label']}>收藏菜谱</Text>
      </View>
      <View className={styles['stat-item']}>
        <Text className={styles['stat-number']}>12</Text>
        <Text className={styles['stat-label']}>完成订单</Text>
      </View>
    </View>

    <View className={styles['section']}>
      <Text className={styles['section-title']}>⚙️ 功能菜单</Text>
      <View className={styles['menu-list']}>
        <View className={styles['menu-item']}>
          <Text className={styles['menu-icon']}>📖</Text>
          <Text className={styles['menu-text']}>我的菜谱</Text>
          <Text className={styles['menu-arrow']}>›</Text>
        </View>
        <View className={styles['menu-item']}>
          <Text className={styles['menu-icon']}>❤️</Text>
          <Text className={styles['menu-text']}>我的收藏</Text>
          <Text className={styles['menu-arrow']}>›</Text>
        </View>
        <View className={styles['menu-item']}>
          <Text className={styles['menu-icon']}>📦</Text>
          <Text className={styles['menu-text']}>订单历史</Text>
          <Text className={styles['menu-arrow']}>›</Text>
        </View>
        <View className={styles['menu-item']}>
          <Text className={styles['menu-icon']}>⚙️</Text>
          <Text className={styles['menu-text']}>设置</Text>
          <Text className={styles['menu-arrow']}>›</Text>
        </View>
      </View>
    </View>
  </View>
)

export default function Index() {
  const [activeTab, setActiveTab] = useState('home')

  useLoad(() => {
    console.log('Page loaded.')
  })

  // 渲染当前激活的tab内容
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeContent />
      case 'tutorial':
        return <TutorialContent />
      case 'order':
        return <OrderContent />
      case 'profile':
        return <ProfileContent />
      default:
        return <HomeContent />
    }
  }

  return (
    <View className={styles['container']}>
      {/* 内容区域 */}
      <View className={styles['content']}>
        {renderTabContent()}
      </View>

      {/* 底部导航栏 */}
      <View className={styles['tab-bar']}>
        {tabs.map(tab => (
          <View
            key={tab.id}
            className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <Text className={styles['tab-icon']}>{tab.icon}</Text>
            <Text className={styles['tab-name']}>{tab.name}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}
