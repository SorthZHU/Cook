import { api } from '../utils/api'
import { ApiServiceResponse } from "./types"

// 定义API响应类型
export interface ApiResponse<T = any> {
  success: boolean
  data: T
  message: string
  code: number
}

export interface HealthData {
  status: string
  message: string
  timestamp: string
  server: string
  version: string
}

export interface RecipeData {
  id: string
  name: string
  description: string
  ingredients: string[]
  difficulty: 'easy' | 'medium' | 'hard'
  cookingTime: number
  image?: string
}

// API服务类
export class ApiService {
  // 健康检查
  static async checkHealth(): Promise<HealthData> {
    try {
      const response = await api.health()
      return response.data
    } catch (error) {
      console.error('健康检查失败:', error)
      throw new Error('服务器连接失败')
    }
  }

  // 获取菜谱列表
  static async getAllFoods(params?: {
    page?: number
    limit?: number
    category?: string
  }): Promise<ApiServiceResponse.getAllFoodsResponse> {
    try {
      const response = await api.get('/api/foods', { params })
      return response.data || []
    } catch (error) {
      console.error('获取菜谱失败:', error)
      throw new Error('获取菜谱数据失败')
    }
  }

  // 搜索菜谱（示例接口）
  static async searchRecipes(query: string): Promise<RecipeData[]> {
    try {
      const response = await api.get(`/api/recipes/search`, {
        params: { q: query }
      })
      return response.data.data || []
    } catch (error) {
      console.error('搜索菜谱失败:', error)
      throw new Error('搜索菜谱失败')
    }
  }

  // 获取菜谱详情（示例接口）
  static async getRecipeDetail(id: string): Promise<RecipeData> {
    try {
      const response = await api.get(`/api/recipes/${id}`)
      return response.data.data
    } catch (error) {
      console.error('获取菜谱详情失败:', error)
      throw new Error('获取菜谱详情失败')
    }
  }

  // 通用GET请求
  static async get<T = any>(url: string, params?: any): Promise<T> {
    try {
      const response = await api.get(url, { params })
      return response.data
    } catch (error) {
      console.error(`GET ${url} 失败:`, error)
      throw error
    }
  }

  // 通用POST请求
  static async post<T = any>(url: string, data?: any): Promise<T> {
    try {
      const response = await api.post(url, data)
      return response.data
    } catch (error) {
      console.error(`POST ${url} 失败:`, error)
      throw error
    }
  }
}

export default ApiService
