'use client';

import { useState } from 'react';
import { Copy, Check, FileText, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Prompt } from '@/lib/prompts/types';
import { cn } from '@/lib/utils';

interface CopyButtonsProps {
  prompt: Prompt;
  className?: string;
}

export function CopyButtons({ prompt, className }: CopyButtonsProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopied(true);

      toast({
        title: 'Đã sao chép!',
        description: 'Prompt đã được sao chép.',
      });

      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: 'Lỗi',
        description: 'Không thể sao chép prompt.',
        variant: 'destructive',
      });
    }
  };

  const handleForm = () => {
    toast({
      title: 'Mở form',
      description: 'Tính năng đang được phát triển.',
    });
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: prompt.title || prompt.description,
          text: prompt.prompt,
          url: window.location.href,
        });
      } else {
        // Fallback: copy link
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: 'Đã sao chép link!',
          description: 'Link đã được sao chép vào clipboard.',
        });
      }
    } catch (error) {
      // User cancelled or error occurred
      console.error('Share failed:', error);
    }
  };

  return (
    <div className={cn('flex gap-2', className)}>
      {/* Copy Button - Takes most space */}
      <Button
        onClick={handleCopy}
        variant={copied ? 'default' : 'outline'}
        className={cn(
          'flex-1',
          copied && 'bg-green-500 hover:bg-green-600'
        )}
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 mr-2" />
            Đã chép!
          </>
        ) : (
          <>
            <Copy className="w-4 h-4 mr-2" />
            Sao chép Prompt
          </>
        )}
      </Button>

      {/* Form Button */}
      <Button
        onClick={handleForm}
        variant="outline"
        size="icon"
        className="shrink-0"
        title="Mở form"
      >
        <FileText className="w-4 h-4" />
      </Button>

      {/* Share Button */}
      <Button
        onClick={handleShare}
        variant="outline"
        size="icon"
        className="shrink-0"
        title="Chia sẻ"
      >
        <Share2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
