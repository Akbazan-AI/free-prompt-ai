'use client';

import { Suspense } from 'react';
import { Prompt } from '@/lib/prompts/types';
import { PromptCard } from './PromptCard';
import { PromptCardSkeleton } from './PromptCardSkeleton';
import { Pagination, usePagination } from '@/components/ui/Pagination';
import { motion } from 'framer-motion';

interface PromptListProps {
  prompts: Prompt[];
  emptyMessage?: string;
  isLoading?: boolean;
  skipAnimation?: boolean;
  showPagination?: boolean;
  itemsPerPage?: number;
  onTagClick?: (tag: string) => void;
}

function PromptListContent({
  prompts,
  emptyMessage = 'Không tìm thấy prompts nào.',
  isLoading = false,
  skipAnimation = false,
  showPagination = false,
  itemsPerPage = 20,
  onTagClick,
}: PromptListProps) {
  // Use pagination if enabled
  const { items, totalItems } = showPagination
    ? usePagination(prompts, itemsPerPage)
    : { items: prompts, totalItems: prompts.length };

  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="w-full md:w-[calc(50%-18px)] lg:w-[calc(33.333%-16px)]">
            <PromptCardSkeleton />
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <p className="text-slate-500 text-lg">{emptyMessage}</p>
      </motion.div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap gap-6">
        {items.map((prompt, index) => (
          <div
            key={prompt.id}
            className="w-full md:w-[calc(50%-18px)] lg:w-[calc(33.333%-16px)]"
          >
            <PromptCard
              prompt={prompt}
              index={index}
              skipAnimation={skipAnimation}
              onTagClick={onTagClick}
              priority={index < 3}
            />
          </div>
        ))}
      </div>

      {showPagination && totalItems > itemsPerPage && (
        <div className="mt-8">
          <Pagination totalItems={totalItems} itemsPerPage={itemsPerPage} />
        </div>
      )}
    </>
  );
}

export function PromptList(props: PromptListProps) {
  // Only wrap in Suspense if using pagination
  if (props.showPagination) {
    return (
      <Suspense fallback={<PromptListSkeleton />}>
        <PromptListContent {...props} />
      </Suspense>
    );
  }

  return <PromptListContent {...props} />;
}

function PromptListSkeleton() {
  return (
    <div className="flex flex-wrap gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="w-full md:w-[calc(50%-18px)] lg:w-[calc(33.333%-16px)]">
          <PromptCardSkeleton />
        </div>
      ))}
    </div>
  );
}
