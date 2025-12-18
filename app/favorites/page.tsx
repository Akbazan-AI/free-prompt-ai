'use client';

import { useMemo, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { PromptList } from '@/components/prompts/PromptList';
import { Pagination, usePagination } from '@/components/ui/Pagination';
import { useFavorites } from '@/hooks/use-favorites';
import { getAllPrompts } from '@/lib/prompts/data';

function FavoritesContent() {
  const { favorites } = useFavorites();
  const allPrompts = getAllPrompts();

  // Get favorited prompts
  const favoritedPrompts = useMemo(() => {
    return allPrompts.filter((p) => favorites.includes(p.id));
  }, [allPrompts, favorites]);

  // Paginate
  const { items: paginatedPrompts, totalItems } = usePagination(favoritedPrompts, 20);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200 py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-primary-500 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại trang chủ
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center">
              <Heart className="w-7 h-7 text-red-500 fill-red-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Prompts Yêu Thích</h1>
              <p className="text-slate-600 mt-1">
                {totalItems > 0
                  ? `${totalItems} prompts đã lưu`
                  : 'Chưa có prompts nào được lưu'}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {totalItems > 0 ? (
            <>
              <PromptList prompts={paginatedPrompts} />
              {totalItems > 20 && (
                <div className="mt-8">
                  <Pagination totalItems={totalItems} itemsPerPage={20} />
                </div>
              )}
            </>
          ) : (
            <EmptyFavorites />
          )}
        </div>
      </section>
    </div>
  );
}

function EmptyFavorites() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16"
    >
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-100 flex items-center justify-center">
        <Heart className="w-10 h-10 text-slate-300" />
      </div>
      <h2 className="text-xl font-semibold text-slate-700 mb-2">
        Chưa có prompts yêu thích
      </h2>
      <p className="text-slate-500 mb-6 max-w-md mx-auto">
        Click vào biểu tượng trái tim trên các prompt card để lưu vào danh sách yêu thích của bạn.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
      >
        Khám phá Prompts
      </Link>
    </motion.div>
  );
}

export default function FavoritesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="animate-pulse text-slate-400">Đang tải...</div>
        </div>
      }
    >
      <FavoritesContent />
    </Suspense>
  );
}
