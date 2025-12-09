import type { Recipe } from '@/data/ingredients'

export type IngredientCategory = 'vegetables' | 'meat' | 'cookware'

export interface IngredientSelectorSnapshot {
  selectedIngredients: string[]
  activeCategory: IngredientCategory
  recipes: Recipe[]
  loading: boolean
  error?: string
}
