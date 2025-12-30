import React, { useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components';
import { mockIngredients, searchRecipesByIngredients, Recipe } from '../../data/ingredients';
import styles from './index.module.scss';
import ApiService from "@/services/apiService";
import { observer, useLocalObservable } from "mobx-react-lite";
import IngredientSelectorStore, { CategoryId } from './store';
import { CATTEGORIES } from "@/constant/category";
import { getEmojiById } from "@/utils/emoji";

interface IngredientSelectorProps {
  onRecipesChange: (recipes: Recipe[], selectedIngredients: string[]) => void;
}

const IngredientSelector: React.FC<IngredientSelectorProps> = ({ onRecipesChange }) => {

  const selectStore = useLocalObservable(() => new IngredientSelectorStore());

  // 当选中的食材发生变化时，查询相关菜品
  useEffect(() => {
    const recipes = searchRecipesByIngredients(selectStore.selectedIngredients);
    onRecipesChange(recipes, selectStore.selectedIngredients);
  }, [selectStore.selectedIngredients]);


  // 清空所有选择
  const clearSelection = () => {
    selectStore.setSelectedIngredients([]);
  };

  useEffect(() => {
    selectStore.getFoodList();
  }, []);

  return (
    <View className={styles.container}>
      {/* 标题和清空按钮 */}
      <View className={styles.header}>
        <Text className={styles.title}>选择食材组合</Text>
        {selectStore.selectedIngredients.length > 0 && (
          <Text className={styles.clearBtn} onClick={clearSelection}>
            清空选择 ({selectStore.selectedIngredients.length})
          </Text>
        )}
      </View>

      {/* 分类标签 */}
      <View className={styles.categoryTabs}>
        {CATTEGORIES.map(category => (
          <View
            key={category.id}
            className={`${styles.categoryTab} ${selectStore.activeCategory === category.id ? styles.active : ''}`}
            onClick={() => selectStore.setActiveCategory(category.id as CategoryId)}
          >
            <Text className={styles.categoryEmoji}>{category.emoji}</Text>
            <Text className={styles.categoryName}>{category.customName}</Text>
          </View>
        ))}
      </View>

      {/* 食材选择区域 */}
      <View className={styles.ingredientsGrid}>
        {selectStore.getCurrentCategoryIngredients.map(ingredient => (
          <View
            key={ingredient.foodCode}
            className={`${styles.ingredientItem} ${selectStore.selectedIngredients.includes(ingredient.foodCode) ? styles.selected : ''
              }`}
            onClick={() => selectStore.toggleIngredient(ingredient.foodCode)}
          >
            <Text className={styles.ingredientEmoji}>{getEmojiById(ingredient.foodCode)}</Text>
            <Text className={styles.ingredientName}>{ingredient.foodName}</Text>
            {selectStore.selectedIngredients.includes(ingredient.foodCode) && (
              <View className={styles.selectedBadge}>
                <Text className={styles.selectedText}>✓</Text>
              </View>
            )}
          </View>
        ))}
      </View>

      {/* 已选择的食材预览 */}
      {selectStore.selectedIngredients.length > 0 && (
        <View className={styles.selectedPreview}>
          <Text className={styles.previewTitle}>已选择的食材：</Text>
          <View className={styles.selectedList}>
            {selectStore.selectedIngredients.map(ingredientId => {
              const ingredient = selectStore.getCurrentCategoryIngredients
                .find(ing => ing.foodCode === ingredientId);
              return ingredient ? (
                <View key={ingredientId} className={styles.selectedTag}>
                  <Text className={styles.selectedTagText}>
                    {getEmojiById(ingredient.foodCode)} {ingredient.foodName}
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

export default observer(IngredientSelector);
