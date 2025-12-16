// 提供 id 与 emoji 的映射，以及基于 id 的可重复生成策略
// 说明：优先使用明确的映射，其次使用生成规则作为兜底

// 已知的食材/厨具 id → emoji 映射
export const emojiMap: Record<string, string> = {
  // vegetables
  potato: '🥔',
  tomato: '🍅',
  onion: '🧅',
  carrot: '🥕',
  cabbage: '🥬',
  broccoli: '🥦',
  eggplant: '🍆',
  pepper: '🫑',
  // meat
  beef: '🥩',
  pork: '🐷',
  chicken: '🐔',
  fish: '🐟',
  shrimp: '🦐',
  egg: '🥚',
  duck: '🦆',
  lamb: '🐑',
  // cookware
  wok: '🍳',
  airfryer: '🔥',
  steamer: '♨️',
  oven: '🔥',
  ricecooker: '🍚',
  pressure: '⚡',
  microwave: '📡',
  grill: '🔥',
}

// 作为兜底的可重复生成表：保证相同 id 总能映射到同一个 emoji
const fallbackEmojis: string[] = [
  '🍽️', '🍲', '🍳', '🥗', '🥘', '🍜', '🍝', '🍚', '🥟', '🍖',
  '🥓', '🧀', '🥞', '🍤', '🍗', '🌶️', '🧄', '🧅', '🥬', '🥕',
]

// 根据 id 生成稳定索引（简单哈希），用于选择 fallback emoji
const hashIdToIndex = (id: string, mod: number): number => {
  let h = 0
  for (let i = 0; i < id.length; i++) {
    h = (h * 31 + id.charCodeAt(i)) >>> 0
  }
  return h % mod
}

// 兜底生成：保证同一个 id 映射到同一个 fallback emoji
export const generateEmojiFromId = (id: string): string => {
  const idx = hashIdToIndex(id, fallbackEmojis.length)
  return fallbackEmojis[idx]
}

// 主入口：优先使用明确的映射，否则使用兜底生成
export const getEmojiById = (id: string): string => {
  return emojiMap[id] || generateEmojiFromId(id)
}

// 如果已有数据集中包含 emoji，可用此方法从数据集中取（当映射未覆盖时）
// 注意：该方法需要在调用处传入数据源（例如 mockIngredients）
import type { IngredientCategory as IngredientCategoryData } from '@/data/ingredients'

export const getIngredientEmoji = (
  id: string,
  categories?: IngredientCategoryData[]
): string => {
  if (emojiMap[id]) return emojiMap[id]
  if (categories && categories.length) {
    for (const cat of categories) {
      const found = cat.ingredients.find(ing => ing.id === id)
      if (found?.emoji) return found.emoji
    }
  }
  return generateEmojiFromId(id)
}

