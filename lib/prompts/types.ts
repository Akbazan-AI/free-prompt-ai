// TypeScript types for Prompt data structure

export interface Prompt {
  id: string;
  description: string;
  prompt: string;
  tags: string[];
  category: 'image' | 'office';
  language?: string;
  author?: string;
  createdAt?: string;
}

export interface PromptCategory {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

export interface Guide {
  id: string;
  title: string;
  content: string;
  category: 'image' | 'office';
  tags: string[];
}

export interface SearchFilters {
  category?: 'image' | 'office' | 'all';
  tags?: string[];
  query?: string;
}

export interface ParsedMarkdown {
  prompts: Prompt[];
  metadata?: {
    totalCount: number;
    category: string;
    parsedAt: string;
  };
}
