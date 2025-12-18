"use client";

import { use, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Share2, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FavoriteButton } from "@/components/prompts/FavoriteButton";
import { AIToolBadges } from "@/components/ui/AIToolBadge";
import { CopyButtons } from "@/components/prompts/CopyButtons";
import { UsageInstructions } from "@/components/prompts/UsageInstructions";
import { SimilarPrompts } from "@/components/prompts/SimilarPrompts";
import { getPromptById } from "@/lib/prompts/data";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function PromptDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const prompt = getPromptById(id);
  const router = useRouter();
  const { toast } = useToast();

  const [imageError, setImageError] = useState(false);

  // Image source with fallback
  const getImageSrc = useCallback(() => {
    if (imageError || !prompt?.image) {
      return `/placeholders/${prompt?.category || "default"}.svg`;
    }
    return `/examples/${prompt.image}`;
  }, [prompt?.image, prompt?.category, imageError]);

  // Format date
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return null;
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } catch {
      return null;
    }
  };

  // Share handler
  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: prompt?.description || "AI Prompt",
          text: `Check out this AI prompt: ${prompt?.description}`,
          url,
        });
      } catch (err) {
        // User cancelled or error
        if ((err as Error).name !== "AbortError") {
          copyToClipboard(url);
        }
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Đã sao chép link!",
        description: "Link đã được sao chép vào clipboard.",
      });
    } catch {
      toast({
        title: "Lỗi",
        description: "Không thể sao chép link.",
        variant: "destructive",
      });
    }
  };

  if (!prompt) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            Không tìm thấy Prompt
          </h1>
          <Link
            href="/"
            className="text-primary-500 hover:text-primary-600 underline"
          >
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8 max-w-8xl">
        {/* Top bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-primary-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </button>

          <div className="flex items-center gap-2">
            <FavoriteButton promptId={prompt.id} size="md" />
            <Button
              onClick={handleShare}
              variant="outline"
              size="icon"
              className="w-10 h-10 rounded-full"
            >
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
        >
          {/* Image */}
          <div className="relative w-full aspect-[4/3] bg-slate-100">
            <Image
              src={getImageSrc()}
              alt={prompt.description || "Prompt image"}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
              priority
              sizes="(max-width: 896px) 100vw, 896px"
            />

            {/* Featured badge */}
            {prompt.featured && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-yellow-400 text-yellow-900 font-semibold px-3 py-1.5 shadow-md">
                  <Star className="w-4 h-4 mr-1.5 fill-current" />
                  FEATURED
                </Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 space-y-6">
            {/* Title & Meta */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                {prompt.description || prompt.title || "Untitled Prompt"}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <span>BY {prompt.author || "AI TEAM"}</span>
                {formatDate(prompt.date) && (
                  <>
                    <span className="text-slate-300">|</span>
                    <span>{formatDate(prompt.date)}</span>
                  </>
                )}
              </div>
            </div>

            {/* AI Tools */}
            {prompt.category && (
              <AIToolBadges category={prompt.category} size="md" />
            )}

            {/* Tags */}
            {prompt.tags && prompt.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {prompt.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/?tags=${tag}`}
                    className={cn(
                      "inline-flex items-center px-3 py-1 rounded-full",
                      "text-sm bg-slate-100 text-slate-600",
                      "hover:bg-primary-100 hover:text-primary-700",
                      "transition-colors"
                    )}
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Prompt code block */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-3">Prompt</h2>
              <div className="relative">
                <pre className="bg-slate-50 border border-slate-200 rounded-lg p-4 overflow-x-auto">
                  <code className="text-sm text-slate-700 whitespace-pre-wrap">
                    {prompt.prompt}
                  </code>
                </pre>
              </div>
            </div>

            {/* Copy buttons */}
            <CopyButtons prompt={prompt} />

            {/* Usage instructions */}
            {prompt.category && (
              <UsageInstructions
                category={prompt.category}
                className="pt-4 border-t border-slate-200"
              />
            )}
          </div>
        </motion.div>

        {/* Similar prompts */}
        <SimilarPrompts promptId={prompt.id} className="mt-12" />
      </div>
    </div>
  );
}
