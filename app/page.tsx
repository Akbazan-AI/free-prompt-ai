'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { SearchBar } from '@/components/prompts/SearchBar';
import { FilterBar } from '@/components/layout/FilterBar';
import { PromptList } from '@/components/prompts/PromptList';
import { getAllPrompts, getCategoryCounts } from '@/lib/prompts/data';
import { createPromptSearch } from '@/lib/search';
import { PromptCategory, getAITools } from '@/lib/prompts/types';
import { SortOption } from '@/components/ui/SortDropdown';
import { useDebounce } from '@/hooks/use-debounce';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<PromptCategory | 'all'>('all');
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [featuredFilter, setFeaturedFilter] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  // Debounce search query for better performance
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const allPrompts = useMemo(() => getAllPrompts(), []);
  const categoryCounts = useMemo(() => getCategoryCounts(), []);

  // Handlers
  const handleTagClick = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  const handleRemoveTag = useCallback((tag: string) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tag));
  }, []);

  const handleRemoveTool = useCallback((tool: string) => {
    setSelectedTools((prev) => prev.filter((t) => t !== tool));
  }, []);

  const handleClearAll = useCallback(() => {
    setSelectedTools([]);
    setSelectedTags([]);
    setFeaturedFilter(false);
  }, []);

  // Memoize Fuse.js search instance for better performance
  const searchInstance = useMemo(() => {
    return createPromptSearch(allPrompts);
  }, [allPrompts]);

  // Filter, search, and sort prompts
  const filteredPrompts = useMemo(() => {
    let prompts = [...allPrompts];

    // 1. Filter by category
    if (activeCategory !== 'all') {
      prompts = prompts.filter((p) => p.category === activeCategory);
    }

    // 2. Filter by AI tools
    if (selectedTools.length > 0) {
      prompts = prompts.filter((p) => {
        if (!p.category) return false;
        const promptToolIds = getAITools(p.category).map((t) => t.id);
        return selectedTools.some((tool) => promptToolIds.includes(tool));
      });
    }

    // 3. Filter by tags
    if (selectedTags.length > 0) {
      prompts = prompts.filter((p) =>
        selectedTags.some((tag) => p.tags?.includes(tag))
      );
    }

    // 4. Filter by featured
    if (featuredFilter) {
      prompts = prompts.filter((p) => p.featured);
    }

    // 5. Apply debounced search
    if (debouncedSearchQuery.trim()) {
      const results = searchInstance.search(debouncedSearchQuery);
      const searchedIds = new Set(results.map(r => r.item.id));
      prompts = prompts.filter(p => searchedIds.has(p.id));
    }

    // 6. Sort
    switch (sortBy) {
      case 'newest':
        prompts.sort((a, b) => {
          const dateA = a.date ? new Date(a.date).getTime() : 0;
          const dateB = b.date ? new Date(b.date).getTime() : 0;
          return dateB - dateA;
        });
        break;
      case 'popular':
        // Placeholder: sort by favorites count when available
        prompts.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
        break;
      case 'alphabetical':
        prompts.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
        break;
      case 'featured':
        prompts.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          // Secondary sort by date
          const dateA = a.date ? new Date(a.date).getTime() : 0;
          const dateB = b.date ? new Date(b.date).getTime() : 0;
          return dateB - dateA;
        });
        break;
    }

    return prompts;
  }, [
    allPrompts,
    activeCategory,
    selectedTools,
    selectedTags,
    featuredFilter,
    debouncedSearchQuery,
    sortBy,
    searchInstance,
  ]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero section with search */}
      <section className="bg-gradient-to-b from-white via-primary-50/30 to-slate-50 border-b border-slate-200 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              75+ Prompts miễn phí
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4 leading-tight">
              Kho Prompts AI
              <span className="block text-primary-600">Chất Lượng Cao</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-6">
              Khám phá {categoryCounts.all} prompts cho hình ảnh, văn phòng và nhiều hơn nữa.
              Hoàn toàn miễn phí, dễ sử dụng.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Tìm kiếm prompts..."
            />
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {/* Image */}
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">
                {categoryCounts.image}
              </div>
              <div className="text-sm text-slate-600 mt-1">Image Prompts</div>
            </div>

            {/* Office */}
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">
                {categoryCounts.office}
              </div>
              <div className="text-sm text-slate-600 mt-1">Office Prompts</div>
            </div>

            {/* Assistant */}
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">
                {categoryCounts.assistant}
              </div>
              <div className="text-sm text-slate-600 mt-1">Assistant Prompts</div>
            </div>

            {/* Free */}
            <div className="text-center col-span-2 md:col-span-1">
              <div className="text-3xl font-bold text-primary-600">100%</div>
              <div className="text-sm text-slate-600 mt-1">Miễn phí</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters and results */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <FilterBar
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              categoryCounts={categoryCounts}
              selectedTools={selectedTools}
              onToolsChange={setSelectedTools}
              selectedTags={selectedTags}
              onRemoveTag={handleRemoveTag}
              featuredFilter={featuredFilter}
              onRemoveFeatured={() => setFeaturedFilter(false)}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onClearAll={handleClearAll}
            />
          </div>

          <PromptList
            prompts={filteredPrompts}
            emptyMessage={
              searchQuery
                ? `Không tìm thấy prompts nào với từ khóa "${searchQuery}"`
                : 'Chưa có prompts nào trong danh mục này.'
            }
            onTagClick={handleTagClick}
          />
        </div>
      </section>
    </div>
  );
}
