"use client";

import { useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PromptCard } from "./PromptCard";
import { getSimilarPrompts } from "@/lib/prompts/data";

interface SimilarPromptsProps {
  promptId: string;
  limit?: number;
  className?: string;
}

export function SimilarPrompts({
  promptId,
  limit = 20,
  className,
}: SimilarPromptsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Lấy tối đa "limit" prompts tương tự:
  // - Ưu tiên cùng khối (ví dụ: image-anh-chan-dung-xxxx)
  // - Nếu thiếu thì lấy thêm cùng category
  // - Cuối cùng mới lấy random các prompt khác
  const similarPrompts = useMemo(
    () => getSimilarPrompts(promptId, limit),
    [promptId, limit]
  );

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const scrollAmount = 400;
    const newPosition =
      scrollRef.current.scrollLeft +
      (direction === "left" ? -scrollAmount : scrollAmount);

    scrollRef.current.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });
  };

  // Auto-slide effect - đơn giản: cuộn ngang liên tục, loop từ cuối về đầu
  // Dừng khi hover, chạy lại khi rời chuột
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || similarPrompts.length === 0) return;

    let frameId: number | null = null;
    const baseScrollSpeed = 0.7; // tăng nhẹ để dễ thấy đang chạy
    let isHovered = false;

    const handleMouseEnter = () => {
      isHovered = true;
    };
    const handleMouseLeave = () => {
      isHovered = false;
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    const step = () => {
      if (!container) return;

      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      const maxScroll = scrollWidth - clientWidth;

      if (!isHovered && maxScroll > 0) {
        // tăng scrollLeft
        container.scrollLeft += baseScrollSpeed;

        // nếu gần cuối thì quay lại đầu
        if (container.scrollLeft >= maxScroll - 1) {
          container.scrollLeft = 0;
        }
      }

      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);

    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [similarPrompts.length]);

  if (similarPrompts.length === 0) return null;

  return (
    <section className={className}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900">Prompts Tương Tự</h2>

        {/* Navigation buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            className="h-9 w-9 rounded-full"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            className="h-9 w-9 rounded-full"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Carousel container */}
      <div className="relative overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
            scrollBehavior: "auto", // Disable smooth scroll for manual control
          }}
        >
          {/* Set 1 - for seamless loop */}
          {similarPrompts.map((prompt, index) => (
            <motion.div
              key={`set1-${prompt.id}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex-none w-[calc(100%-16px)] sm:w-[calc(50%-12px)] md:w-[calc(40%-12px)] lg:w-[calc(33.333%-12px)] xl:w-[calc(30%-12px)] 2xl:w-[calc(25%-12px)] min-w-[280px]"
            >
              <PromptCard prompt={prompt} index={index} skipAnimation />
            </motion.div>
          ))}

          {/* Set 2 - middle (main viewing area) */}
          {similarPrompts.map((prompt, index) => (
            <motion.div
              key={`set2-${prompt.id}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex-none w-[calc(100%-16px)] sm:w-[calc(50%-12px)] md:w-[calc(40%-12px)] lg:w-[calc(33.333%-12px)] xl:w-[calc(30%-12px)] 2xl:w-[calc(25%-12px)] min-w-[280px]"
            >
              <PromptCard prompt={prompt} index={index} skipAnimation />
            </motion.div>
          ))}

          {/* Set 3 - for seamless loop */}
          {similarPrompts.map((prompt, index) => (
            <motion.div
              key={`set3-${prompt.id}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex-none w-[calc(100%-16px)] sm:w-[calc(50%-12px)] md:w-[calc(40%-12px)] lg:w-[calc(33.333%-12px)] xl:w-[calc(30%-12px)] 2xl:w-[calc(25%-12px)] min-w-[280px]"
            >
              <PromptCard prompt={prompt} index={index} skipAnimation />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
