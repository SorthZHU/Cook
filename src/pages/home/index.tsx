import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import styles from './index.module.scss'

export default function Home() {
  useLoad(() => {
    console.log('Home page loaded.')
  })

  return (
    <View className={styles['container']}>
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
}