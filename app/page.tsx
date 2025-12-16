'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SearchBar } from '@/components/prompts/SearchBar';
import { CategoryTabs } from '@/components/layout/CategoryTabs';
import { PromptList } from '@/components/prompts/PromptList';
import { getAllPrompts, getCategoryCounts } from '@/lib/prompts/data';
import { searchPrompts } from '@/lib/search';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'image' | 'office'>('all');

  const allPrompts = getAllPrompts();
  const categoryCounts = getCategoryCounts();

  // Filter and search prompts
  const filteredPrompts = useMemo(() => {
    // First filter by category
    let prompts = activeCategory === 'all'
      ? allPrompts
      : allPrompts.filter(p => p.category === activeCategory);

    // Then apply search
    if (searchQuery.trim()) {
      prompts = searchPrompts(prompts, searchQuery);
    }

    return prompts;
  }, [allPrompts, activeCategory, searchQuery]);

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
            className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">{categoryCounts.image}</div>
              <div className="text-sm text-slate-600 mt-1">Image Prompts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">{categoryCounts.office}</div>
              <div className="text-sm text-slate-600 mt-1">Office Prompts</div>
            </div>
            <div className="text-center col-span-2 md:col-span-1">
              <div className="text-3xl font-bold text-primary-600">100%</div>
              <div className="text-sm text-slate-600 mt-1">Miễn phí</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category tabs and results */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex justify-center">
            <CategoryTabs
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              counts={categoryCounts}
            />
          </div>

          <PromptList
            prompts={filteredPrompts}
            emptyMessage={
              searchQuery
                ? `Không tìm thấy prompts nào với từ khóa "${searchQuery}"`
                : 'Chưa có prompts nào trong danh mục này.'
            }
          />
        </div>
      </section>
    </div>
  );
}
