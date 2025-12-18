// TypeScript types for Prompt data structure

export type PromptCategory = 'image' | 'office' | 'assistant';

export interface Prompt {
  id: string;
  description: string;
  prompt: string;
  tags: string[];
  category: PromptCategory;
  // New fields
  date?: string;       // YYYY-MM-DD format for sorting
  author?: string;     // Default "AI TEAM"
  image?: string;      // Filename in /public/examples/
  title?: string;      // Legacy field from parser
  // Computed at runtime (not in markdown)
  featured?: boolean;  // Calculated: TOP 10 newest
  language?: string;   // Unused, keep for compat
  createdAt?: string;  // Unused, keep for compat
}

// AI tool badges configuration
export interface AITool {
  id: string;
  name: string;
  color: string;
  bgColor: string;
}

export const AI_TOOLS: Record<string, AITool> = {
  chatgpt: { id: 'chatgpt', name: 'ChatGPT', color: 'text-green-700', bgColor: 'bg-green-100' },
  midjourney: { id: 'midjourney', name: 'Midjourney', color: 'text-purple-700', bgColor: 'bg-purple-100' },
  'dall-e': { id: 'dall-e', name: 'DALL-E', color: 'text-blue-700', bgColor: 'bg-blue-100' },
  'stable-diffusion': { id: 'stable-diffusion', name: 'Stable Diffusion', color: 'text-orange-700', bgColor: 'bg-orange-100' },
};

// Get AI tools based on category
export function getAITools(category: PromptCategory): AITool[] {
  const toolsMap: Record<PromptCategory, string[]> = {
    image: ['midjourney', 'dall-e', 'stable-diffusion'],
    office: ['chatgpt'],
    assistant: ['chatgpt'],
  };
  return (toolsMap[category] || []).map(id => AI_TOOLS[id]);
}

export interface PromptCategoryInfo {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

export interface Guide {
  id: string;
  title: string;
  content: string;
  category: PromptCategory;
  tags: string[];
}

export interface SearchFilters {
  category?: PromptCategory | 'all';
  tags?: string[];
  query?: string;
  tools?: string[];
  sortBy?: 'newest' | 'popular' | 'alphabetical' | 'featured';
}

export interface ParsedMarkdown {
  prompts: Prompt[];
  metadata?: {
    totalCount: number;
    category: string;
    parsedAt: string;
  };
}

// Category counts including assistant
export interface CategoryCounts {
  all: number;
  image: number;
  office: number;
  assistant: number;
}
