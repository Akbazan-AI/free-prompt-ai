import { cn } from '@/lib/utils';
import { AITool, getAITools, PromptCategory } from '@/lib/prompts/types';

interface AIToolBadgeProps {
  tool: AITool;
  size?: 'sm' | 'md';
  onClick?: () => void;
  className?: string;
}

export function AIToolBadge({
  tool,
  size = 'sm',
  onClick,
  className,
}: AIToolBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  const Component = onClick ? 'button' : 'span';

  return (
    <Component
      onClick={onClick}
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        'transition-colors',
        tool.bgColor,
        tool.color,
        sizeClasses[size],
        onClick && 'cursor-pointer hover:opacity-80',
        className
      )}
    >
      {tool.name}
    </Component>
  );
}

// Helper component to render all badges for a category
interface AIToolBadgesProps {
  category: PromptCategory;
  size?: 'sm' | 'md';
  onToolClick?: (toolId: string) => void;
  className?: string;
}

export function AIToolBadges({
  category,
  size = 'sm',
  onToolClick,
  className,
}: AIToolBadgesProps) {
  const tools = getAITools(category);

  if (tools.length === 0) return null;

  return (
    <div className={cn('flex flex-wrap gap-1', className)}>
      {tools.map((tool) => (
        <AIToolBadge
          key={tool.id}
          tool={tool}
          size={size}
          onClick={onToolClick ? () => onToolClick(tool.id) : undefined}
        />
      ))}
    </div>
  );
}
