import React from 'react';
import { View, Text } from '@tarojs/components';
import { Recipe, getAllIngredients } from '../../data/ingredients';
import styles from './index.module.scss';

interface RecipeResultsProps {
  recipes: Recipe[];
  selectedIngredients: string[];
}

const RecipeResults: React.FC<RecipeResultsProps> = ({ recipes, selectedIngredients }) => {
  // 获取所有食材信息
  const allIngredients = getAllIngredients();

  // 根据食材ID获取食材信息
  const getIngredientInfo = (ingredientId: string) => {
    return allIngredients.find(ingredient => ingredient.id === ingredientId);
  };

  // 获取难度对应的颜色
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '简单':
        return '#28a745';
      case '中等':
        return '#ffc107';
      case '困难':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  // 如果没有选择食材，显示提示
  if (selectedIngredients.length === 0) {
    return (
      <View className={styles.container}>
        <View className={styles.emptyState}>
          <Text className={styles.emptyEmoji}>🍳</Text>
          <Text className={styles.emptyTitle}>选择食材开始烹饪</Text>
          <Text className={styles.emptyDesc}>
            请从上方选择蔬菜、肉类和厨具，我们会为您推荐相应的菜品
          </Text>
        </View>
      </View>
    );
  }

  // 如果没有找到匹配的菜品
  if (recipes.length === 0) {
    return (
      <View className={styles.container}>
        <View className={styles.emptyState}>
          <Text className={styles.emptyEmoji}>😅</Text>
          <Text className={styles.emptyTitle}>暂无匹配菜品</Text>
          <Text className={styles.emptyDesc}>
            试试调整食材组合，或者减少一些食材要求
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className={styles.container}>
      <View className={styles.header}>
        <Text className={styles.title}>推荐菜品</Text>
        <Text className={styles.count}>找到 {recipes.length} 道菜</Text>
      </View>

      <View className={styles.recipeList}>
        {recipes.map(recipe => (
          <View key={recipe.id} className={styles.recipeCard}>
            {/* 菜品基本信息 */}
            <View className={styles.recipeHeader}>
              <Text className={styles.recipeEmoji}>{recipe.emoji}</Text>
              <View className={styles.recipeInfo}>
                <Text className={styles.recipeName}>{recipe.name}</Text>
                <Text className={styles.recipeDesc}>{recipe.description}</Text>
              </View>
            </View>

            {/* 菜品详细信息 */}
            <View className={styles.recipeDetails}>
              <View className={styles.detailItem}>
                <Text className={styles.detailLabel}>难度：</Text>
                <Text 
                  className={styles.detailValue}
                  style={{ color: getDifficultyColor(recipe.difficulty) }}
                >
                  {recipe.difficulty}
                </Text>
              </View>
              <View className={styles.detailItem}>
                <Text className={styles.detailLabel}>时间：</Text>
                <Text className={styles.detailValue}>{recipe.cookingTime}</Text>
              </View>
            </View>

            {/* 所需食材 */}
            <View className={styles.ingredientsSection}>
              <Text className={styles.ingredientsTitle}>所需食材：</Text>
              <View className={styles.ingredientsList}>
                {recipe.ingredients.map(ingredientId => {
                  const ingredient = getIngredientInfo(ingredientId);
                  if (!ingredient) return null;
                  
                  const isSelected = selectedIngredients.includes(ingredientId);
                  
                  return (
                    <View 
                      key={ingredientId} 
                      className={`${styles.ingredientTag} ${isSelected ? styles.selected : styles.missing}`}
                    >
                      <Text className={styles.ingredientTagText}>
                        {ingredient.emoji} {ingredient.name}
                      </Text>
                      {isSelected && (
                        <Text className={styles.checkMark}>✓</Text>
                      )}
                    </View>
                  );
                })}
              </View>
            </View>

            {/* 操作按钮 */}
            <View className={styles.actionButtons}>
              <View className={styles.actionButton}>
                <Text className={styles.actionButtonText}>查看详情</Text>
              </View>
              <View className={`${styles.actionButton} ${styles.primaryButton}`}>
                <Text className={`${styles.actionButtonText} ${styles.primaryButtonText}`}>
                  开始制作
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default RecipeResults;