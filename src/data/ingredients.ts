// 食材类型定义
export interface Ingredient {
  id: string;
  name: string;
  emoji: string;
  category: 'vegetables' | 'meat' | 'cookware';
}

// 菜品类型定义
export interface Recipe {
  id: string;
  name: string;
  emoji: string;
  ingredients: string[]; // 食材ID数组
  description: string;
  difficulty: '简单' | '中等' | '困难';
  cookingTime: string;
}

// 食材分类定义
export interface IngredientCategory {
  id: string;
  name: string;
  emoji: string;
  ingredients: Ingredient[];
}

// Mock 食材数据
export const mockIngredients: IngredientCategory[] = [
  {
    id: 'vegetables',
    name: '蔬菜',
    emoji: '🥬',
    ingredients: [
      { id: 'potato', name: '土豆', emoji: '🥔', category: 'vegetables' },
      { id: 'tomato', name: '番茄', emoji: '🍅', category: 'vegetables' },
      { id: 'onion', name: '洋葱', emoji: '🧅', category: 'vegetables' },
      { id: 'carrot', name: '胡萝卜', emoji: '🥕', category: 'vegetables' },
      { id: 'cabbage', name: '白菜', emoji: '🥬', category: 'vegetables' },
      { id: 'broccoli', name: '西兰花', emoji: '🥦', category: 'vegetables' },
      { id: 'eggplant', name: '茄子', emoji: '🍆', category: 'vegetables' },
      { id: 'pepper', name: '青椒', emoji: '🫑', category: 'vegetables' },
    ]
  },
  {
    id: 'meat',
    name: '肉类',
    emoji: '🥩',
    ingredients: [
      { id: 'beef', name: '牛肉', emoji: '🥩', category: 'meat' },
      { id: 'pork', name: '猪肉', emoji: '🐷', category: 'meat' },
      { id: 'chicken', name: '鸡肉', emoji: '🐔', category: 'meat' },
      { id: 'fish', name: '鱼肉', emoji: '🐟', category: 'meat' },
      { id: 'shrimp', name: '虾', emoji: '🦐', category: 'meat' },
      { id: 'egg', name: '鸡蛋', emoji: '🥚', category: 'meat' },
      { id: 'duck', name: '鸭肉', emoji: '🦆', category: 'meat' },
      { id: 'lamb', name: '羊肉', emoji: '🐑', category: 'meat' },
    ]
  },
  {
    id: 'cookware',
    name: '厨具',
    emoji: '🍳',
    ingredients: [
      { id: 'wok', name: '铁锅', emoji: '🍳', category: 'cookware' },
      { id: 'airfryer', name: '空气炸锅', emoji: '🔥', category: 'cookware' },
      { id: 'steamer', name: '蒸锅', emoji: '♨️', category: 'cookware' },
      { id: 'oven', name: '烤箱', emoji: '🔥', category: 'cookware' },
      { id: 'ricecooker', name: '电饭煲', emoji: '🍚', category: 'cookware' },
      { id: 'pressure', name: '高压锅', emoji: '⚡', category: 'cookware' },
      { id: 'microwave', name: '微波炉', emoji: '📡', category: 'cookware' },
      { id: 'grill', name: '烧烤架', emoji: '🔥', category: 'cookware' },
    ]
  }
];

// Mock 菜品数据
export const mockRecipes: Recipe[] = [
  {
    id: 'recipe1',
    name: '土豆炖牛肉',
    emoji: '🍲',
    ingredients: ['potato', 'beef', 'wok'],
    description: '经典家常菜，营养丰富',
    difficulty: '中等',
    cookingTime: '45分钟'
  },
  {
    id: 'recipe2',
    name: '番茄炒蛋',
    emoji: '🍳',
    ingredients: ['tomato', 'egg', 'wok'],
    description: '简单易做的家常菜',
    difficulty: '简单',
    cookingTime: '10分钟'
  },
  {
    id: 'recipe3',
    name: '空气炸锅烤鸡',
    emoji: '🍗',
    ingredients: ['chicken', 'airfryer'],
    description: '健康少油的烤鸡做法',
    difficulty: '简单',
    cookingTime: '30分钟'
  },
  {
    id: 'recipe4',
    name: '蒸蛋羹',
    emoji: '🥚',
    ingredients: ['egg', 'steamer'],
    description: '嫩滑的蒸蛋羹',
    difficulty: '简单',
    cookingTime: '15分钟'
  },
  {
    id: 'recipe5',
    name: '红烧茄子',
    emoji: '🍆',
    ingredients: ['eggplant', 'wok'],
    description: '下饭神器',
    difficulty: '中等',
    cookingTime: '20分钟'
  },
  {
    id: 'recipe6',
    name: '胡萝卜炖羊肉',
    emoji: '🥕',
    ingredients: ['carrot', 'lamb', 'pressure'],
    description: '温补的冬季菜品',
    difficulty: '中等',
    cookingTime: '60分钟'
  },
  {
    id: 'recipe7',
    name: '青椒炒肉丝',
    emoji: '🫑',
    ingredients: ['pepper', 'pork', 'wok'],
    description: '经典川菜',
    difficulty: '简单',
    cookingTime: '15分钟'
  },
  {
    id: 'recipe8',
    name: '白菜炖豆腐',
    emoji: '🥬',
    ingredients: ['cabbage', 'wok'],
    description: '清淡营养的素菜',
    difficulty: '简单',
    cookingTime: '20分钟'
  },
  {
    id: 'recipe9',
    name: '烤箱烤鱼',
    emoji: '🐟',
    ingredients: ['fish', 'oven'],
    description: '香嫩的烤鱼',
    difficulty: '中等',
    cookingTime: '35分钟'
  },
  {
    id: 'recipe10',
    name: '蒜蓉西兰花',
    emoji: '🥦',
    ingredients: ['broccoli', 'wok'],
    description: '清爽的蔬菜菜品',
    difficulty: '简单',
    cookingTime: '8分钟'
  },
  {
    id: 'recipe11',
    name: '洋葱炒牛肉',
    emoji: '🧅',
    ingredients: ['onion', 'beef', 'wok'],
    description: '香甜的洋葱配牛肉',
    difficulty: '中等',
    cookingTime: '25分钟'
  },
  {
    id: 'recipe12',
    name: '电饭煲焖饭',
    emoji: '🍚',
    ingredients: ['potato', 'pork', 'ricecooker'],
    description: '一锅出的懒人料理',
    difficulty: '简单',
    cookingTime: '40分钟'
  }
];

// 获取所有食材（扁平化）
export const getAllIngredients = (): Ingredient[] => {
  return mockIngredients.flatMap(category => category.ingredients);
};

// 根据选中的食材搜索菜品
export const searchRecipesByIngredients = (selectedIngredients: string[]): Recipe[] => {
  if (selectedIngredients.length === 0) {
    return [];
  }

  return mockRecipes.filter(recipe => {
    // 检查菜品是否包含至少一个选中的食材
    return selectedIngredients.some(ingredientId => 
      recipe.ingredients.includes(ingredientId)
    );
  });
};