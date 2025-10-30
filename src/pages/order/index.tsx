import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import styles from './index.module.scss'

export default function Order() {
  const [selectedLocation, setSelectedLocation] = useState('北京市朝阳区')

  useLoad(() => {
    console.log('Order page loaded.')
  })

  return (
    <View className={styles['container']}>
      <View className={styles['location-bar']}>
        <Text className={styles['location-text']}>📍 {selectedLocation}</Text>
        <Text className={styles['change-location']}>切换</Text>
      </View>

      <View className={styles['section']}>
        <Text className={styles['section-title']}>🍽️ 附近餐厅</Text>
        <View className={styles['restaurant-list']}>
          <View className={styles['restaurant-item']}>
            <Text className={styles['restaurant-emoji']}>🍜</Text>
            <View className={styles['restaurant-info']}>
              <Text className={styles['restaurant-name']}>老北京炸酱面</Text>
              <Text className={styles['restaurant-meta']}>⭐ 4.8分 | 📍 500m | 💰 人均25元</Text>
            </View>
          </View>
          <View className={styles['restaurant-item']}>
            <Text className={styles['restaurant-emoji']}>🍲</Text>
            <View className={styles['restaurant-info']}>
              <Text className={styles['restaurant-name']}>川味小厨</Text>
              <Text className={styles['restaurant-meta']}>⭐ 4.6分 | 📍 800m | 💰 人均35元</Text>
            </View>
          </View>
          <View className={styles['restaurant-item']}>
            <Text className={styles['restaurant-emoji']}>🥟</Text>
            <View className={styles['restaurant-info']}>
              <Text className={styles['restaurant-name']}>东北饺子馆</Text>
              <Text className={styles['restaurant-meta']}>⭐ 4.7分 | 📍 1.2km | 💰 人均30元</Text>
            </View>
          </View>
        </View>
      </View>

      <View className={styles['section']}>
        <Text className={styles['section-title']}>🔥 热门菜品</Text>
        <View className={styles['dish-grid']}>
          <View className={styles['dish-item']}>
            <Text className={styles['dish-emoji']}>🍖</Text>
            <Text className={styles['dish-name']}>红烧肉</Text>
            <Text className={styles['dish-price']}>¥28</Text>
          </View>
          <View className={styles['dish-item']}>
            <Text className={styles['dish-emoji']}>🐟</Text>
            <Text className={styles['dish-name']}>糖醋鱼</Text>
            <Text className={styles['dish-price']}>¥35</Text>
          </View>
          <View className={styles['dish-item']}>
            <Text className={styles['dish-emoji']}>🥬</Text>
            <Text className={styles['dish-name']}>清炒菠菜</Text>
            <Text className={styles['dish-price']}>¥15</Text>
          </View>
          <View className={styles['dish-item']}>
            <Text className={styles['dish-emoji']}>🍲</Text>
            <Text className={styles['dish-name']}>麻婆豆腐</Text>
            <Text className={styles['dish-price']}>¥18</Text>
          </View>
        </View>
      </View>
    </View>
  )
}