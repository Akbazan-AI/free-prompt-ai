"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FavoriteButton } from "./FavoriteButton";
import { AIToolBadges } from "@/components/ui/AIToolBadge";
import { Copy, Check, Eye, Star, FileText, Share2 } from "lucide-react";
import { Prompt } from "@/lib/prompts/types";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface PromptCardProps {
  prompt: Prompt;
  index?: number;
  skipAnimation?: boolean;
  onTagClick?: (tag: string) => void;
  priority?: boolean;
}

export function PromptCard({
  prompt,
  index = 0,
  skipAnimation = false,
  onTagClick,
  priority = false,
}: PromptCardProps) {
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // Image source with fallback
  const getImageSrc = useCallback(() => {
    if (imageError) {
      return `/placeholders/${prompt.category || "default"}.svg`;
    }
    if (prompt.image) {
      return `/examples/${prompt.image}`;
    }
    return `/placeholders/${prompt.category || "default"}.svg`;
  }, [prompt.image, prompt.category, imageError]);

  // Copy handler
  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopied(true);
      toast({
        title: "Đã sao chép!",
        description: "Prompt đã được sao chép vào clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Lỗi",
        description: "Không thể sao chép prompt.",
        variant: "destructive",
      });
    }
  };

  // View handler
  const handleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/prompts/${prompt.id}`);
  };

  // Card click handler
  const handleCardClick = () => {
    router.push(`/prompts/${prompt.id}`);
  };

  // Tag click handler
  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation();
    onTagClick?.(tag);
  };

  // Format date
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return null;
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return null;
    }
  };

  // Animation delay (capped at 0.3s)
  const animDelay = skipAnimation ? 0 : Math.min(index * 0.03, 0.3);

  return (
    <motion.div
      initial={skipAnimation ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: skipAnimation ? 0 : 0.25,
        delay: animDelay,
        ease: "easeOut",
      }}
      className="h-full"
    >
      <Card
        onClick={handleCardClick}
        className={cn(
          "h-full flex flex-col overflow-hidden",
          "hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
          "border-slate-200 cursor-pointer group"
        )}
      >
        {/* Image Section */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100">
          <Image
            src={getImageSrc()}
            alt={prompt.description}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            loading={priority ? "eager" : "lazy"}
          />

          {/* Featured Badge - Top Left */}
          {prompt.featured && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-yellow-400 text-yellow-900 hover:bg-yellow-500 font-semibold px-2 py-1 shadow-sm">
                <Star className="w-3 h-3 mr-1 fill-current" />
                FEATURED
              </Badge>
            </div>
          )}

          {/* Favorite Button - Top Right */}
          <div className="absolute top-3 right-3">
            <FavoriteButton promptId={prompt.id} size="md" />
          </div>
        </div>

        {/* Content Section */}
        <CardContent className="flex-1 flex flex-col space-y-3 w-full pt-6">
          {/* Title */}
          <h3 className="font-semibold text-slate-900 line-clamp-2 leading-tight">
            {prompt.description || prompt.title || "Untitled Prompt"}
          </h3>

          {/* Author & Date */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>BY {prompt.author || "AI TEAM"}</span>
            {formatDate(prompt.date) && (
              <>
                <span className="text-slate-300">|</span>
                <span>{formatDate(prompt.date)}</span>
              </>
            )}
          </div>

          {/* AI Tool Badges */}
          <div className="w-full">
            <AIToolBadges category={prompt.category} size="sm" />
          </div>

          {/* Tags */}
          {prompt.tags && prompt.tags.length > 0 && (
            <div className="w-full flex flex-wrap gap-1.5">
              {prompt.tags.slice(0, 4).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  onClick={(e) => handleTagClick(e, tag)}
                  className={cn(
                    "text-xs font-normal bg-slate-100 text-slate-600",
                    "hover:bg-primary-100 hover:text-primary-700",
                    "cursor-pointer transition-colors"
                  )}
                >
                  #{tag}
                </Badge>
              ))}
              {prompt.tags.length > 4 && (
                <Badge
                  variant="secondary"
                  className="text-xs font-normal bg-slate-100 text-slate-500"
                >
                  +{prompt.tags.length - 4}
                </Badge>
              )}
            </div>
          )}

          {/* Prompt Preview */}
          <div className="w-full space-y-2">
            <div className="relative group/prompt">
              <div className="max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100 hover:scrollbar-thumb-slate-400 rounded border border-slate-200 bg-slate-50 p-3">
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {prompt.prompt}
                </p>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex gap-2 w-full min-w-0">
              <Button
                onClick={handleCopy}
                variant={copied ? "default" : "outline"}
                size="sm"
                className={cn(
                  "flex-1 h-8 text-xs min-w-0",
                  copied && "bg-green-500 hover:bg-green-600"
                )}
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 mr-1.5" />
                    Đã chép!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 mr-1.5" />
                    Sao chép
                  </>
                )}
              </Button>

              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  toast({
                    title: "Mở form",
                    description: "Tính năng đang được phát triển.",
                  });
                }}
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 shrink-0"
                title="Mở form"
              >
                <FileText className="w-3 h-3" />
              </Button>

              <Button
                onClick={async (e) => {
                  e.stopPropagation();
                  try {
                    if (navigator.share) {
                      await navigator.share({
                        title: prompt.title || prompt.description,
                        text: prompt.prompt,
                        url: `${window.location.origin}/prompts/${prompt.id}`,
                      });
                    } else {
                      await navigator.clipboard.writeText(
                        `${window.location.origin}/prompts/${prompt.id}`
                      );
                      toast({
                        title: "Đã sao chép link!",
                        description: "Link đã được sao chép.",
                      });
                    }
                  } catch (error) {
                    console.error("Share failed:", error);
                  }
                }}
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0 shrink-0"
                title="Chia sẻ"
              >
                <Share2 className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />
        </CardContent>
      </Card>
    </motion.div>
  );
}
