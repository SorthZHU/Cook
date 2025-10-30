# 食材选择与菜品查询功能文档

## 功能概述

本功能在首页实现了一个智能的食材选择器，用户可以通过选择不同的食材组合来查询相应的菜品。该功能包含三个主要分类：蔬菜、肉类和厨具，每个分类下都有相应的基础食材选项。

## 功能特性

### 1. 食材分类
- **蔬菜类** 🥬：土豆、番茄、洋葱、胡萝卜、白菜、西兰花、茄子、青椒
- **肉类** 🥩：牛肉、猪肉、鸡肉、鱼肉、虾、鸡蛋、鸭肉、羊肉
- **厨具** 🍳：铁锅、空气炸锅、蒸锅、烤箱、电饭煲、高压锅、微波炉、烧烤架

### 2. 交互功能
- **多选支持**：用户可以同时选择多个食材
- **分类切换**：通过标签页切换不同的食材分类
- **实时搜索**：选择食材后立即显示匹配的菜品
- **选择预览**：显示当前已选择的所有食材
- **一键清空**：快速清除所有选择

### 3. 智能匹配
- **包含匹配**：只要菜品包含任一选中食材就会显示
- **详细信息**：显示菜品的难度、制作时间、所需食材等
- **食材状态**：区分已选择和缺失的食材

## 技术架构

### 文件结构
```
src/
├── components/
│   ├── IngredientSelector/          # 食材选择器组件
│   │   ├── index.tsx
│   │   └── index.module.scss
│   └── RecipeResults/               # 菜品结果展示组件
│       ├── index.tsx
│       └── index.module.scss
├── data/
│   └── ingredients.ts               # 食材和菜品数据
└── pages/
    └── home/
        ├── index.tsx                # 首页集成
        └── index.module.scss
```

### 数据结构

#### 食材接口 (Ingredient)
```typescript
interface Ingredient {
  id: string;                        // 唯一标识
  name: string;                      // 食材名称
  emoji: string;                     // 表情符号
  category: 'vegetables' | 'meat' | 'cookware'; // 分类
}
```

#### 菜品接口 (Recipe)
```typescript
interface Recipe {
  id: string;                        // 唯一标识
  name: string;                      // 菜品名称
  emoji: string;                     // 表情符号
  ingredients: string[];             // 所需食材ID数组
  description: string;               // 菜品描述
  difficulty: '简单' | '中等' | '困难'; // 难度等级
  cookingTime: string;               // 制作时间
}
```

#### 食材分类接口 (IngredientCategory)
```typescript
interface IngredientCategory {
  id: string;                        // 分类ID
  name: string;                      // 分类名称
  emoji: string;                     // 分类图标
  ingredients: Ingredient[];         // 该分类下的食材列表
}
```

### 核心函数

#### 1. getAllIngredients()
```typescript
export const getAllIngredients = (): Ingredient[] => {
  return mockIngredients.flatMap(category => category.ingredients);
};
```
- **功能**：获取所有食材的扁平化列表
- **返回值**：所有食材的数组

#### 2. searchRecipesByIngredients()
```typescript
export const searchRecipesByIngredients = (selectedIngredients: string[]): Recipe[] => {
  if (selectedIngredients.length === 0) {
    return [];
  }

  return mockRecipes.filter(recipe => {
    return selectedIngredients.some(ingredientId => 
      recipe.ingredients.includes(ingredientId)
    );
  });
};
```
- **功能**：根据选中的食材搜索匹配的菜品
- **参数**：selectedIngredients - 选中的食材ID数组
- **返回值**：匹配的菜品数组
- **匹配逻辑**：只要菜品包含任一选中食材就会被返回

## 组件详解

### 1. IngredientSelector 组件

#### Props
```typescript
interface IngredientSelectorProps {
  onRecipesChange: (recipes: Recipe[], selectedIngredients: string[]) => void;
}
```

#### 主要状态
- `selectedIngredients`: 当前选中的食材ID数组
- `activeCategory`: 当前激活的分类ID

#### 核心方法
- `toggleIngredient()`: 切换食材的选中状态
- `clearSelection()`: 清空所有选择
- `getCurrentCategoryIngredients()`: 获取当前分类的食材列表

### 2. RecipeResults 组件

#### Props
```typescript
interface RecipeResultsProps {
  recipes: Recipe[];                 // 搜索结果菜品列表
  selectedIngredients: string[];     // 当前选中的食材
}
```

#### 主要功能
- 显示搜索到的菜品列表
- 区分已选择和缺失的食材
- 提供菜品详细信息展示
- 空状态处理（无选择、无结果）

#### 核心方法
- `getIngredientInfo()`: 根据ID获取食材信息
- `getDifficultyColor()`: 根据难度获取对应颜色

## 样式设计

### 设计原则
- **响应式设计**：适配不同屏幕尺寸
- **直观交互**：清晰的选中状态和视觉反馈
- **信息层次**：合理的信息架构和视觉层次
- **用户友好**：简洁的操作流程和明确的状态提示

### 主要样式特性
- **卡片式布局**：使用圆角和阴影营造层次感
- **颜色编码**：不同状态使用不同颜色区分
- **动画效果**：点击和状态切换的平滑过渡
- **网格布局**：食材选择使用响应式网格

## 使用方法

### 基本使用
1. 在首页顶部找到食材选择器
2. 点击分类标签切换不同类型的食材
3. 点击食材图标进行选择（可多选）
4. 查看下方自动显示的匹配菜品
5. 使用"清空选择"按钮重置所有选择

### 高级功能
- **组合搜索**：选择多种不同类型的食材进行组合搜索
- **食材状态查看**：在菜品详情中查看哪些食材已选择，哪些还需要
- **难度筛选**：通过颜色编码快速识别菜品难度

## Mock 数据说明

当前使用的是模拟数据，包含：
- **12道菜品**：涵盖不同难度和制作时间
- **24种食材**：分布在三个主要分类中
- **真实场景模拟**：数据结构设计考虑了实际使用场景

### 示例菜品
- 土豆炖牛肉（中等难度，45分钟）
- 番茄炒蛋（简单，10分钟）
- 空气炸锅烤鸡（简单，30分钟）
- 蒸蛋羹（简单，15分钟）

## 扩展性

### 数据扩展
- 可以轻松添加新的食材分类
- 支持增加更多食材和菜品
- 可以扩展菜品属性（如营养信息、价格等）

### 功能扩展
- 可以添加食材过滤功能
- 支持菜品收藏和评分
- 可以集成真实的后端API
- 支持用户自定义食材组合

### 性能优化
- 使用React.memo优化组件渲染
- 可以添加虚拟滚动处理大量数据
- 支持懒加载和分页

## 注意事项

1. **依赖管理**：确保正确导入所有必要的组件和数据
2. **状态同步**：父子组件间的状态传递需要保持一致
3. **错误处理**：对空数据和异常情况进行适当处理
4. **性能考虑**：避免不必要的重新渲染和计算

## 未来规划

1. **后端集成**：替换mock数据为真实API调用
2. **用户个性化**：添加用户偏好和历史记录
3. **智能推荐**：基于用户行为的智能菜品推荐
4. **社交功能**：用户分享和评论功能
5. **营养分析**：添加营养成分分析功能