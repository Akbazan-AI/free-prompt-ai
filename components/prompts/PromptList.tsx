'use client';

import { Prompt } from '@/lib/prompts/types';
import { PromptCard } from './PromptCard';
import { PromptCardSkeleton } from './PromptCardSkeleton';
import { motion } from 'framer-motion';

interface PromptListProps {
  prompts: Prompt[];
  emptyMessage?: string;
  isLoading?: boolean;
  skipAnimation?: boolean;
}

export function PromptList({ prompts, emptyMessage = 'Không tìm thấy prompts nào.', isLoading = false, skipAnimation = false }: PromptListProps) {
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

  if (prompts.length === 0) {
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
    <div className="flex flex-wrap gap-6">
      {prompts.map((prompt, index) => (
        <div
          key={prompt.id}
          className="w-full md:w-[calc(50%-18px)] lg:w-[calc(33.333%-16px)]"
        >
          <PromptCard prompt={prompt} index={index} skipAnimation={skipAnimation} />
        </div>
      ))}
    </div>
  );
}
