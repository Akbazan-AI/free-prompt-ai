'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, Check, Image as ImageIcon } from 'lucide-react';
import { Prompt } from '@/lib/prompts/types';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface PromptCardProps {
  prompt: Prompt;
  index?: number;
  skipAnimation?: boolean;
}

export function PromptCard({ prompt, index = 0, skipAnimation = false }: PromptCardProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopied(true);
      toast({
        title: "Đã sao chép!",
        description: "Prompt đã được sao chép vào clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể sao chép prompt. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
  };

  // Cap delay at 0.3s max to avoid very long waits
  const animDelay = skipAnimation ? 0 : Math.min(index * 0.03, 0.3);

  return (
    <motion.div
      initial={skipAnimation ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: skipAnimation ? 0 : 0.25,
        delay: animDelay,
        ease: "easeOut"
      }}
      className="break-inside-avoid h-full"
    >
      <Card className="h-full flex flex-col group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-slate-200 cursor-pointer"
        onClick={(e) => {
          // Allow click to detail page, but prevent if clicking button
          if (!(e.target as HTMLElement).closest('button')) {
            window.location.href = `/prompts/${prompt.id}`;
          }
        }}
      >
      <CardHeader className="pb-3 space-y-3">
        <div className="w-full h-48 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-primary-600 group-hover:from-primary-200 group-hover:to-primary-300 transition-all">
          <ImageIcon className="w-12 h-12" />
        </div>
        <CardTitle className="text-base line-clamp-2 text-slate-900">{prompt.description}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 flex-1 flex flex-col">

        {prompt.tags && prompt.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {prompt.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs font-normal bg-slate-100 text-slate-700 hover:bg-slate-200"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="relative p-3 bg-slate-50 rounded-lg border border-slate-100 flex-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCopy();
            }}
            className="absolute top-2 right-2 h-8 w-8 inline-flex items-center justify-center rounded-md border border-slate-200 bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-50"
            aria-label="Copy prompt"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4 text-slate-600" />
            )}
          </button>
          <p className="text-xs text-slate-600 font-mono whitespace-pre-line leading-relaxed overflow-hidden pr-10"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 10,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {prompt.prompt}
          </p>
        </div>

        <Button
          onClick={handleCopy}
          className={cn(
            'w-full rounded-lg font-medium transition-all',
            copied
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-primary-500 hover:bg-primary-600 text-white shadow-sm hover:shadow'
          )}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Đã sao chép!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Sao chép Prompt
            </>
          )}
        </Button>
      </CardContent>
    </Card>
    </motion.div>
  );
}
