import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import styles from './index.module.scss'

export default function Profile() {
  useLoad(() => {
    console.log('Profile page loaded.')
  })

  return (
    <View className={styles['container']}>
      <View className={styles['profile-header']}>
        <View className={styles['avatar']}>
          <Text className={styles['avatar-text']}>👤</Text>
        </View>
        <View className={styles['profile-info']}>
          <Text className={styles['username']}>美食爱好者</Text>
          <Text className={styles['user-level']}>🌟 LV.5 资深吃货</Text>
        </View>
      </View>

      <View className={styles['section']}>
        <Text className={styles['section-title']}>📊 我的数据</Text>
        <View className={styles['stats-grid']}>
          <View className={styles['stat-item']}>
            <Text className={styles['stat-number']}>128</Text>
            <Text className={styles['stat-label']}>学会菜谱</Text>
          </View>
          <View className={styles['stat-item']}>
            <Text className={styles['stat-number']}>45</Text>
            <Text className={styles['stat-label']}>收藏菜谱</Text>
          </View>
          <View className={styles['stat-item']}>
            <Text className={styles['stat-number']}>89</Text>
            <Text className={styles['stat-label']}>点餐次数</Text>
          </View>
          <View className={styles['stat-item']}>
            <Text className={styles['stat-number']}>12</Text>
            <Text className={styles['stat-label']}>分享菜谱</Text>
          </View>
        </View>
      </View>

      <View className={styles['section']}>
        <Text className={styles['section-title']}>⚙️ 功能设置</Text>
        <View className={styles['menu-list']}>
          <View className={styles['menu-item']}>
            <Text className={styles['menu-icon']}>❤️</Text>
            <Text className={styles['menu-text']}>我的收藏</Text>
            <Text className={styles['menu-arrow']}>›</Text>
          </View>
          <View className={styles['menu-item']}>
            <Text className={styles['menu-icon']}>📝</Text>
            <Text className={styles['menu-text']}>我的菜谱</Text>
            <Text className={styles['menu-arrow']}>›</Text>
          </View>
          <View className={styles['menu-item']}>
            <Text className={styles['menu-icon']}>🛒</Text>
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
}