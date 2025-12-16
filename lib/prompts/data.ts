import { Prompt } from './types';
import allPromptsData from '@/data/prompts/all.json';

/**
 * Get all prompts
 */
export function getAllPrompts(): Prompt[] {
  return allPromptsData as Prompt[];
}

/**
 * Get prompts by category
 */
export function getPromptsByCategory(category: 'image' | 'office'): Prompt[] {
  const allPrompts = getAllPrompts();
  return allPrompts.filter(p => p.category === category);
}

/**
 * Get prompt by ID
 */
export function getPromptById(id: string): Prompt | undefined {
  const allPrompts = getAllPrompts();
  return allPrompts.find(p => p.id === id);
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
  const allPrompts = getAllPrompts();
  const tags = new Set<string>();

  allPrompts.forEach(prompt => {
    prompt.tags?.forEach(tag => tags.add(tag));
  });

  return Array.from(tags).sort();
}

/**
 * Get category counts
 */
export function getCategoryCounts(): { all: number; image: number; office: number } {
  const allPrompts = getAllPrompts();

  return {
    all: allPrompts.length,
    image: allPrompts.filter(p => p.category === 'image').length,
    office: allPrompts.filter(p => p.category === 'office').length,
  };
}
