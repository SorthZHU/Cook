import { computed, makeAutoObservable, runInAction } from 'mobx'
import { api } from '@/utils/api'
import type { FoodItem, FoodsQueryParams } from '@/request/api.types'
import type { Recipe } from '@/data/ingredients'
import { CATEGORY_MAP } from '@/constant/category'
import { ApiServiceResponse } from "@/services/types"
import ApiService from "@/services/apiService"

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

  foodDataList: ApiServiceResponse.getAllFoodsResponse['body'] = [];

  constructor() {
    makeAutoObservable(this)
  }

  setActiveCategory = (cat: CategoryId) => {
    this.activeCategory = cat
  }

  setFoodDataList = (list: ApiServiceResponse.getAllFoodsResponse['body']) => {
    this.foodDataList = list
  }

  setSelectedIngredients = (list: string[]) => {
    this.selectedIngredients = list;
  }



  // 获取当前活跃分类的食材
  @computed get getCurrentCategoryIngredients() {
    return this.foodDataList.filter(category => category.category === this.activeCategory) || [];
  };

  // 切换食材选中状态
  toggleIngredient(ingredientId: string) {
    if (this.selectedIngredients.includes(ingredientId)) {
      this.selectedIngredients = this.selectedIngredients.filter(id => id !== ingredientId);
    } else {
      this.selectedIngredients = [...this.selectedIngredients, ingredientId];
    }
  };

  // 获取所有的食材ID列表
  getFoodList = () => {
    this.loading = true
    ApiService.getAllFoods({ page: 1, limit: 200 }).then(res => {
      this.setFoodDataList(res.body || [])
    }).catch(err => {
      console.log('获取数据失败', err);
    }).finally(() => {
      this.loading = false
    })
  }

  clearAll = () => {
    this.selectedIngredients = []
    this.recipes = []
    this.error = undefined
  }
}

export default IngredientSelectorStore;
