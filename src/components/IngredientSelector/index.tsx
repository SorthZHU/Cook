import React, { useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components';
import { mockIngredients, searchRecipesByIngredients, Recipe } from '../../data/ingredients';
import styles from './index.module.scss';
import ApiService from "@/services/apiService";

interface IngredientSelectorProps {
  onRecipesChange: (recipes: Recipe[], selectedIngredients: string[]) => void;
}

const IngredientSelector: React.FC<IngredientSelectorProps> = ({ onRecipesChange }) => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('vegetables');

  // 当选中的食材发生变化时，查询相关菜品
  useEffect(() => {
    const recipes = searchRecipesByIngredients(selectedIngredients);
    onRecipesChange(recipes, selectedIngredients);
  }, [selectedIngredients]);

  // 切换食材选中状态
  const toggleIngredient = (ingredientId: string) => {
    setSelectedIngredients(prev => {
      if (prev.includes(ingredientId)) {
        return prev.filter(id => id !== ingredientId);
      } else {
        return [...prev, ingredientId];
      }
    });
  };

  // 清空所有选择
  const clearSelection = () => {
    setSelectedIngredients([]);
  };

  // 获取当前活跃分类的食材
  const getCurrentCategoryIngredients = () => {
    return mockIngredients.find(category => category.id === activeCategory)?.ingredients || [];
  };

  useEffect(() => {
    ApiService.getAllFoods().then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  }, []);

  return (
    <View className={styles.container}>
      {/* 标题和清空按钮 */}
      <View className={styles.header}>
        <Text className={styles.title}>选择食材组合</Text>
        {selectedIngredients.length > 0 && (
          <Text className={styles.clearBtn} onClick={clearSelection}>
            清空选择 ({selectedIngredients.length})
          </Text>
        )}
      </View>

      {/* 分类标签 */}
      <View className={styles.categoryTabs}>
        {mockIngredients.map(category => (
          <View
            key={category.id}
            className={`${styles.categoryTab} ${activeCategory === category.id ? styles.active : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            <Text className={styles.categoryEmoji}>{category.emoji}</Text>
            <Text className={styles.categoryName}>{category.name}</Text>
          </View>
        ))}
      </View>

      {/* 食材选择区域 */}
      <View className={styles.ingredientsGrid}>
        {getCurrentCategoryIngredients().map(ingredient => (
          <View
            key={ingredient.id}
            className={`${styles.ingredientItem} ${selectedIngredients.includes(ingredient.id) ? styles.selected : ''
              }`}
            onClick={() => toggleIngredient(ingredient.id)}
          >
            <Text className={styles.ingredientEmoji}>{ingredient.emoji}</Text>
            <Text className={styles.ingredientName}>{ingredient.name}</Text>
            {selectedIngredients.includes(ingredient.id) && (
              <View className={styles.selectedBadge}>
                <Text className={styles.selectedText}>✓</Text>
              </View>
            )}
          </View>
        ))}
      </View>

      {/* 已选择的食材预览 */}
      {selectedIngredients.length > 0 && (
        <View className={styles.selectedPreview}>
          <Text className={styles.previewTitle}>已选择的食材：</Text>
          <View className={styles.selectedList}>
            {selectedIngredients.map(ingredientId => {
              const ingredient = mockIngredients
                .flatMap(cat => cat.ingredients)
                .find(ing => ing.id === ingredientId);
              return ingredient ? (
                <View key={ingredientId} className={styles.selectedTag}>
                  <Text className={styles.selectedTagText}>
                    {ingredient.emoji} {ingredient.name}
                  </Text>
                </View>
              ) : null;
            })}
          </View>
        </View>
      )}
    </View>
  );
};

export default IngredientSelector;
