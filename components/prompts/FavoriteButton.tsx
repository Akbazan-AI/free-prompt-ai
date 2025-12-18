'use client';

import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFavorites } from '@/hooks/use-favorites';
import { useToast } from '@/hooks/use-toast';

interface FavoriteButtonProps {
  promptId: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

export function FavoriteButton({
  promptId,
  className,
  size = 'md',
  showCount = false,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, count } = useFavorites();
  const { toast } = useToast();

  const isActive = isFavorite(promptId);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    toggleFavorite(promptId);

    toast({
      title: isActive ? 'Đã xóa khỏi yêu thích' : 'Đã thêm vào yêu thích!',
      description: isActive
        ? 'Prompt đã được xóa khỏi danh sách yêu thích.'
        : 'Prompt đã được lưu vào danh sách yêu thích.',
    });
  };

  return (
    <button
      onClick={handleClick}
      aria-label={isActive ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={isActive}
      className={cn(
        'inline-flex items-center justify-center rounded-full',
        'bg-white/90 backdrop-blur-sm shadow-md',
        'transition-all duration-200',
        'hover:scale-110 active:scale-95',
        sizeClasses[size],
        className
      )}
    >
      <Heart
        className={cn(
          iconSizes[size],
          'transition-colors',
          isActive ? 'fill-red-500 text-red-500' : 'text-slate-400 hover:text-red-400'
        )}
      />
      {showCount && count > 0 && (
        <span className="ml-1 text-xs font-medium text-slate-600">{count}</span>
      )}
    </button>
  );
}
