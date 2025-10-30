import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import styles from './index.module.scss'

export default function Tutorial() {
  const [activeCategory, setActiveCategory] = useState('全部')

  useLoad(() => {
    console.log('Tutorial page loaded.')
  })

  const categories = ['全部', '家常菜', '川菜', '粤菜']

  return (
    <View className={styles['container']}>
      <View className={styles['search-bar']}>
        <Text className={styles['search-placeholder']}>🔍 搜索菜谱教程...</Text>
      </View>

      <View className={styles['category-tabs']}>
        {categories.map(category => (
          <Text 
            key={category}
            className={`${styles['category-tab']} ${activeCategory === category ? styles['active'] : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Text>
        ))}
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
}