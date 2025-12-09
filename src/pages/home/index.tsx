import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import IngredientSelector from '../../components/IngredientSelector'
import RecipeResults from '../../components/RecipeResults'
import ApiTest from '../../components/ApiTest'
import { Recipe, searchRecipesByIngredients } from '../../data/ingredients'
import styles from './index.module.scss'

export default function Home() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
  const [searchResults, setSearchResults] = useState<Recipe[]>([])

  useLoad(() => {
    console.log('Home page loaded.')
  })

  // 处理菜品搜索结果变化
  const handleRecipesChange = (recipes: Recipe[], ingredients: string[]) => {
    setSearchResults(recipes)
    setSelectedIngredients(ingredients)
  }

  return (
    <View className={styles['container']}>
      <View className={styles['banner']}>
        <Text className={styles['banner-title']}>🍳 试试做菜</Text>
        <Text className={styles['banner-subtitle']}>学做菜，享美食</Text>
      </View>

      {/* 食材选择器 */}
      <View className={styles['ingredient-section']}>
        <IngredientSelector onRecipesChange={handleRecipesChange} />
      </View>

      {/* 菜品搜索结果 */}
      <View className={styles['results-section']}>
        <RecipeResults
          recipes={searchResults}
          selectedIngredients={selectedIngredients}
        />
      </View>

      {/* API测试组件 */}
      {/* <View className={styles['api-test-section']}>
        <ApiTest />
      </View> */}

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
