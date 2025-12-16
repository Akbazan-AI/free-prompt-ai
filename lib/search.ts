import Fuse from 'fuse.js';
import { Prompt } from './prompts/types';

/**
 * Create a Fuse.js instance for searching prompts
 */
export function createPromptSearch(prompts: Prompt[]) {
  return new Fuse(prompts, {
    keys: [
      { name: 'title', weight: 2 },
      { name: 'description', weight: 1.5 },
      { name: 'prompt', weight: 1 },
      { name: 'tags', weight: 1.5 },
    ],
    threshold: 0.4, // 0.0 = exact match, 1.0 = match anything
    includeScore: true,
    minMatchCharLength: 2,
  });
}

/**
 * Search prompts with query string
 */
export function searchPrompts(prompts: Prompt[], query: string): Prompt[] {
  if (!query || query.trim().length === 0) {
    return prompts;
  }

  const fuse = createPromptSearch(prompts);
  const results = fuse.search(query);

  return results.map(result => result.item);
}
