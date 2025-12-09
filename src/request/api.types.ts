// 与后端接口相关的类型定义
// 注意：如果后端返回结构不同，可根据真实返回结构调整

export interface ServerResponse<T = any> {
  success: boolean
  code: number
  message: string
  timestamp?: string
  data: T
}

export type IngredientCategory = 'vegetable' | 'meat' | 'cookware'

export interface FoodItem {
  id?: string
  name: string
  category?: IngredientCategory
  // 该菜品涉及的食材（可选）
  ingredients?: string[]
  // 标签（例如川菜、家常等）
  tags?: string[]
  imageUrl?: string
  difficulty?: 'easy' | 'medium' | 'hard'
  cookingTime?: number
}

export interface FoodsQueryParams {
  // 三大类分别传，或统一传ingredients皆可，后端以逗号分隔解析
  vegetables?: string[]
  meats?: string[]
  cookware?: string[]
  ingredients?: string[]
  page?: number
  pageSize?: number
}

