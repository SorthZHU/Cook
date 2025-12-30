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
  /** 已选食材ID列表（使用食材唯一ID） */
  selectedIngredients: string[]
  /** 当前活跃的分类标识 */
  activeCategory: CategoryId
  /** 根据已选食材计算得到的菜谱列表 */
  recipes: Recipe[]
  /** 全局加载状态（数据请求中） */
  loading: boolean
  /** 错误信息（可选） */
  error?: string
}

export class IngredientSelectorStore {
  /** 已选食材ID列表（使用食材唯一ID） */
  selectedIngredients: string[] = []
  /** 当前活跃的分类标识 */
  activeCategory: CategoryId = CATEGORY_MAP.VEGETABLES as CategoryId
  /** 根据已选食材计算得到的菜谱列表 */
  recipes: Recipe[] = []
  /** 全局加载状态（数据请求中） */
  loading = false
  /** 错误信息（可选） */
  error?: string
  /** 所有食材数据列表 */
  foodDataList: ApiServiceResponse.getAllFoodsResponse['body'] = [];
  /** 展开收起分类器 */
  isCategoryExpanded = true;

  constructor() {
    makeAutoObservable(this)
  }

  setIsCategoryExpanded = (isExpanded: boolean) => {
    this.isCategoryExpanded = isExpanded
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



  /**
   * 获取当前活跃分类的食材
   */
  @computed get getCurrentCategoryIngredients() {
    return this.foodDataList.filter(category => category.category === this.activeCategory) || [];
  };

  /**
   * 切换食材选中状态
   * @param ingredientId 食材ID
   */
  toggleIngredient(ingredientId: string) {
    if (this.selectedIngredients.includes(ingredientId)) {
      this.selectedIngredients = this.selectedIngredients.filter(id => id !== ingredientId);
    } else {
      this.selectedIngredients = [...this.selectedIngredients, ingredientId];
    }
  };

  /**
  * 获取所有的食材ID列表 
  */
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

  /**
   * 清空所有数据
   */
  clearAll = () => {
    this.selectedIngredients = []
    this.recipes = []
    this.error = undefined
  }
}

export default IngredientSelectorStore;
