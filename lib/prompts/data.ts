import { Prompt, CategoryCounts, PromptCategory } from './types';
import allPromptsData from '@/data/prompts/all.json';

// Cache for memoization
let cachedPrompts: Prompt[] | null = null;
let cachedFeaturedIds: Set<string> | null = null;

/**
 * Calculate featured prompts (TOP 10 newest by date)
 * Memoized to avoid recalculation
 */
function calculateFeatured(prompts: Prompt[]): Set<string> {
  if (cachedFeaturedIds) return cachedFeaturedIds;

  const withDates = prompts.filter(p => p.date);
  const sorted = [...withDates].sort((a, b) => {
    const dateA = new Date(a.date || 0);
    const dateB = new Date(b.date || 0);
    return dateB.getTime() - dateA.getTime();
  });

  cachedFeaturedIds = new Set(sorted.slice(0, 10).map(p => p.id));
  return cachedFeaturedIds;
}

/**
 * Get all prompts with featured flag
 * Memoized to prevent recalculation on every render
 */
export function getAllPrompts(): Prompt[] {
  if (cachedPrompts) return cachedPrompts;

  const prompts = allPromptsData as Prompt[];
  const featuredIds = calculateFeatured(prompts);

  cachedPrompts = prompts.map(p => ({
    ...p,
    featured: featuredIds.has(p.id),
    author: p.author || 'AI TEAM',
  }));

  return cachedPrompts;
}

/**
 * Get prompts by category (including 'assistant')
 */
export function getPromptsByCategory(category: PromptCategory): Prompt[] {
  return getAllPrompts().filter(p => p.category === category);
}

/**
 * Get prompt by ID
 */
export function getPromptById(id: string): Prompt | undefined {
  return getAllPrompts().find(p => p.id === id);
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
  const tags = new Set<string>();
  getAllPrompts().forEach(p => p.tags?.forEach(t => tags.add(t)));
  return Array.from(tags).sort();
}

/**
 * Get category counts including assistant
 */
export function getCategoryCounts(): CategoryCounts {
  const prompts = getAllPrompts();
  return {
    all: prompts.length,
    image: prompts.filter(p => p.category === 'image').length,
    office: prompts.filter(p => p.category === 'office').length,
    assistant: prompts.filter(p => p.category === 'assistant').length,
  };
}

/**
 * Get featured prompts
 */
export function getFeaturedPrompts(): Prompt[] {
  return getAllPrompts().filter(p => p.featured);
}

/**
 * Get similar prompts by tags
 */
export function getSimilarPrompts(promptId: string, limit = 4): Prompt[] {
  const prompt = getPromptById(promptId);
  if (!prompt) return [];

  const prompts = getAllPrompts().filter(p => p.id !== promptId);

  // Nhóm "khối" theo prefix id: bỏ phần số cuối cùng
  const getBlockId = (id: string) => {
    const parts = id.split('-');
    const last = parts[parts.length - 1];
    if (/^\d+$/.test(last)) {
      return parts.slice(0, -1).join('-');
    }
    return id;
  };

  const currentBlock = getBlockId(promptId);

  // 1) Ưu tiên các prompt cùng khối (ví dụ: image-anh-chan-dung-xxxx)
  const inSameBlock = prompts.filter(p => getBlockId(p.id) === currentBlock);

  let pool: Prompt[] = [];

  if (inSameBlock.length > 0) {
    pool = inSameBlock;
  } else {
    // 2) Nếu không có khối, ưu tiên cùng category (image/office/assistant)
    pool = prompts.filter(p => p.category === prompt.category);
  }

  // 3) Nếu vẫn chưa đủ, bổ sung từ tất cả prompts còn lại
  if (pool.length < limit) {
    const existingIds = new Set(pool.map(p => p.id));
    const remaining = prompts.filter(p => !existingIds.has(p.id));
    pool = [...pool, ...remaining];
  }

  // Xáo trộn và cắt theo limit
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, limit);
}
