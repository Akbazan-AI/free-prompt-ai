"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { SearchBar } from "@/components/prompts/SearchBar";
import { CategoryTabs } from "@/components/layout/CategoryTabs";
import { PromptList } from "@/components/prompts/PromptList";
import { getAllPrompts, getCategoryCounts } from "@/lib/prompts/data";
import { searchPrompts } from "@/lib/search";

const STORAGE_KEY = "prompts_list_state";

export default function PromptsPage() {
  const PAGE_SIZE = 9;

  // Restore state from sessionStorage on mount
  const getInitialState = () => {
    if (typeof window === "undefined") {
      return {
        visibleCount: PAGE_SIZE,
        scrollY: 0,
        category: "all" as const,
        query: "",
      };
    }
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          visibleCount: parsed.visibleCount || PAGE_SIZE,
          scrollY: parsed.scrollY || 0,
          category: parsed.category || "all",
          query: parsed.query || "",
        };
      }
    } catch {}
    return {
      visibleCount: PAGE_SIZE,
      scrollY: 0,
      category: "all" as const,
      query: "",
    };
  };

  const initialState = useRef(getInitialState());
  const isRestoring = useRef(initialState.current.visibleCount > PAGE_SIZE);
  const [searchQuery, setSearchQuery] = useState(initialState.current.query);
  const [activeCategory, setActiveCategory] = useState<
    "all" | "image" | "office"
  >(initialState.current.category as "all" | "image" | "office");
  const [visibleCount, setVisibleCount] = useState(
    initialState.current.visibleCount
  );
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const restoredScroll = useRef(false);
  const [skipAnimation, setSkipAnimation] = useState(isRestoring.current);

  const allPrompts = getAllPrompts();
  const categoryCounts = getCategoryCounts();

  const filteredPrompts = useMemo(() => {
    let prompts =
      activeCategory === "all"
        ? allPrompts
        : allPrompts.filter((p) => p.category === activeCategory);

    if (searchQuery.trim()) {
      prompts = searchPrompts(prompts, searchQuery);
    }

    return prompts;
  }, [allPrompts, activeCategory, searchQuery]);

  const displayedPrompts = filteredPrompts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPrompts.length;

  // Restore scroll position after first render
  useEffect(() => {
    if (!restoredScroll.current && initialState.current.scrollY > 0) {
      restoredScroll.current = true;
      requestAnimationFrame(() => {
        window.scrollTo(0, initialState.current.scrollY);
      });
    }
    // Turn off skipAnimation after first render so new items animate
    if (skipAnimation) {
      requestAnimationFrame(() => setSkipAnimation(false));
    }
  }, [displayedPrompts.length, skipAnimation]);

  // Save state to sessionStorage on changes
  useEffect(() => {
    const saveState = () => {
      try {
        sessionStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            visibleCount,
            scrollY: window.scrollY,
            category: activeCategory,
            query: searchQuery,
          })
        );
      } catch {}
    };
    window.addEventListener("beforeunload", saveState);
    window.addEventListener("pagehide", saveState);

    // Also save periodically and on scroll
    const handleScroll = () => saveState();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      saveState();
      window.removeEventListener("beforeunload", saveState);
      window.removeEventListener("pagehide", saveState);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visibleCount, activeCategory, searchQuery]);

  // Reset visible items when filters change (but not on initial load)
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    setVisibleCount(PAGE_SIZE);
  }, [activeCategory, searchQuery]);

  // Infinite scroll observer
  useEffect(() => {
    const node = loadMoreRef.current;
    if (!node || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisibleCount((prev: number) =>
            Math.min(prev + PAGE_SIZE, filteredPrompts.length)
          );
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [filteredPrompts.length, hasMore]);

  const handleLoadMore = useCallback(() => {
    if (!hasMore) return;
    setVisibleCount((prev: number) =>
      Math.min(prev + PAGE_SIZE, filteredPrompts.length)
    );
  }, [filteredPrompts.length, hasMore]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero section */}
      <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200 py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Tất cả Prompts
            </h1>
            <p className="text-base text-slate-600">
              Khám phá {categoryCounts.all} prompts chất lượng cao cho mọi nhu
              cầu
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
        </div>
      </section>

      {/* Category tabs and results */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8 flex justify-center"
          >
            <CategoryTabs
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              counts={categoryCounts}
            />
          </motion.div>

          <PromptList
            prompts={displayedPrompts}
            emptyMessage={
              searchQuery
                ? `Không tìm thấy prompts nào với từ khóa "${searchQuery}"`
                : "Chưa có prompts nào trong danh mục này."
            }
            skipAnimation={skipAnimation}
          />

          {displayedPrompts.length > 0 && (
            <div className="flex flex-col items-center mt-8 gap-3">
              <div ref={loadMoreRef} className="h-10" />
              {hasMore ? (
                <button
                  onClick={handleLoadMore}
                  className="px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 shadow-sm"
                >
                  Tải thêm
                </button>
              ) : (
                <p className="text-sm text-slate-500">
                  Đã hiển thị tất cả prompts.
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
