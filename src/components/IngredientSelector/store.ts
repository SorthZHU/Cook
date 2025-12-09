import { makeAutoObservable, runInAction } from 'mobx'
import { api } from '@/utils/api'
import type { FoodItem, FoodsQueryParams } from '@/request/api.types'
import type { Recipe } from '@/data/ingredients'
import { CATEGORY_MAP } from '@/constant/category'

// 分类ID类型与组件一致（字符串枚举）
export type CategoryId = 'vegetables' | 'meat' | 'cookware'

export interface IngredientSelectorSnapshot {
  selectedIngredients: string[]
  activeCategory: CategoryId
  recipes: Recipe[]
  loading: boolean
  error?: string
}

export class IngredientSelectorStore {
  selectedIngredients: string[] = []
  activeCategory: CategoryId = CATEGORY_MAP.VEGETABLES as CategoryId
  recipes: Recipe[] = []
  loading = false
  error?: string

  constructor() {
    makeAutoObservable(this)
  }

  setActiveCategory = (cat: CategoryId) => {
    this.activeCategory = cat
  }

  setIngredients = (list: string[]) => {
    this.selectedIngredients = Array.from(new Set(list))
  }

  toggleIngredient = (name: string) => {
    const exists = this.selectedIngredients.includes(name)
    this.selectedIngredients = exists
      ? this.selectedIngredients.filter(i => i !== name)
      : [...this.selectedIngredients, name]
  }

  clearAll = () => {
    this.selectedIngredients = []
    this.recipes = []
    this.error = undefined
  }

  // 将后端 FoodItem 映射为现有 Recipe 结构最小集
  private mapFoodToRecipe = (item: FoodItem): Recipe => {
    const diff = item.difficulty === 'hard'
      ? '困难'
      : item.difficulty === 'medium'
        ? '中等'
        : '简单'

    const timeStr = item.cookingTime ? `${item.cookingTime}分钟` : '20分钟'

    return {
      id: item.id ?? item.name,
      name: item.name,
      emoji: '🍽️',
      ingredients: item.ingredients ?? [],
      description: item.tags?.length ? item.tags.join('、') : '',
      difficulty: diff,
      cookingTime: timeStr,
    }
  }

  // 从后端按食材组合查询
  fetchRecipes = async () => {
    const ingredients = this.selectedIngredients
    if (ingredients.length === 0) {
      runInAction(() => {
        this.recipes = []
        this.error = undefined
      })
      return
    }

    this.loading = true
    this.error = undefined
    try {
      const params: FoodsQueryParams = { ingredients }
      const res = await api.foods(params)
      const foods: FoodItem[] = res.data?.data || []
      const recipes: Recipe[] = foods.map(this.mapFoodToRecipe)
      runInAction(() => {
        this.recipes = recipes
      })
    } catch (err: any) {
      runInAction(() => {
        this.recipes = []
        this.error = err?.message || '查询失败'
      })
    } finally {
      runInAction(() => {
        this.loading = false
      })
    }
  }

  // 快照导出（便于调试或持久化）
  snapshot = (): IngredientSelectorSnapshot => ({
    selectedIngredients: [...this.selectedIngredients],
    activeCategory: this.activeCategory,
    recipes: [...this.recipes],
    loading: this.loading,
    error: this.error,
  })
}

export const createIngredientSelectorStore = () => new IngredientSelectorStore()
