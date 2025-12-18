'use client';

import { CategoryTabs } from './CategoryTabs';
import { AIToolFilter, ActiveFilters } from '@/components/ui/FilterChips';
import { SortDropdown, SortOption } from '@/components/ui/SortDropdown';
import { PromptCategory, CategoryCounts } from '@/lib/prompts/types';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  // Category
  activeCategory: PromptCategory | 'all';
  onCategoryChange: (category: PromptCategory | 'all') => void;
  categoryCounts?: CategoryCounts;

  // AI Tools
  selectedTools: string[];
  onToolsChange: (tools: string[]) => void;

  // Tags
  selectedTags: string[];
  onRemoveTag: (tag: string) => void;

  // Featured
  featuredFilter: boolean;
  onRemoveFeatured: () => void;

  // Sort
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;

  // Clear all
  onClearAll: () => void;

  className?: string;
}

export function FilterBar({
  activeCategory,
  onCategoryChange,
  categoryCounts,
  selectedTools,
  onToolsChange,
  selectedTags,
  onRemoveTag,
  featuredFilter,
  onRemoveFeatured,
  sortBy,
  onSortChange,
  onClearAll,
  className,
}: FilterBarProps) {
  const handleRemoveTool = (tool: string) => {
    onToolsChange(selectedTools.filter((t) => t !== tool));
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Category Tabs & Sort Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <CategoryTabs
          activeCategory={activeCategory}
          onCategoryChange={onCategoryChange}
          counts={categoryCounts}
        />
        <SortDropdown value={sortBy} onChange={onSortChange} />
      </div>

      {/* AI Tool Filter */}
      <AIToolFilter
        selected={selectedTools}
        onChange={onToolsChange}
        className="border-t border-slate-200 pt-4"
      />

      {/* Active Filters Display */}
      <ActiveFilters
        filters={{
          tags: selectedTags,
          tools: selectedTools,
          featured: featuredFilter,
        }}
        onRemoveTag={onRemoveTag}
        onRemoveTool={handleRemoveTool}
        onRemoveFeatured={onRemoveFeatured}
        onClearAll={onClearAll}
      />
    </div>
  );
}
