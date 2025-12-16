'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Image, Briefcase, Sparkles } from 'lucide-react';

interface CategoryTabsProps {
  activeCategory: 'all' | 'image' | 'office';
  onCategoryChange: (category: 'all' | 'image' | 'office') => void;
  counts?: {
    all: number;
    image: number;
    office: number;
  };
}

export function CategoryTabs({ activeCategory, onCategoryChange, counts }: CategoryTabsProps) {
  const categories = [
    { id: 'all' as const, label: 'Tất cả', icon: Sparkles },
    { id: 'image' as const, label: 'Ảnh', icon: Image },
    { id: 'office' as const, label: 'Văn phòng', icon: Briefcase },
  ];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {categories.map(({ id, label, icon: Icon }) => (
        <motion.button
          key={id}
          onClick={() => onCategoryChange(id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            'relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all',
            activeCategory === id
              ? 'bg-primary-500 text-white shadow-md'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          )}
        >
          {activeCategory === id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-primary-500 rounded-full"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {Icon && <Icon className="w-4 h-4" />}
            <span>{label}</span>
            {counts && counts[id] > 0 && (
              <Badge
                variant="secondary"
                className={cn(
                  'ml-1',
                  activeCategory === id
                    ? 'bg-white/20 text-white'
                    : 'bg-white text-slate-600'
                )}
              >
                {counts[id]}
              </Badge>
            )}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
