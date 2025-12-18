'use client';

import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AI_TOOLS } from '@/lib/prompts/types';

interface FilterChipsProps {
  label?: string;
  options: Array<{ id: string; label: string; color?: string; bgColor?: string }>;
  selected: string[];
  onChange: (selected: string[]) => void;
  className?: string;
}

export function FilterChips({
  label,
  options,
  selected,
  onChange,
  className,
}: FilterChipsProps) {
  const toggleOption = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {label && (
        <span className="text-xs font-medium text-slate-500 mr-1">{label}:</span>
      )}
      {options.map((option) => {
        const isSelected = selected.includes(option.id);
        return (
          <button
            key={option.id}
            onClick={() => toggleOption(option.id)}
            className={cn(
              'inline-flex items-center gap-1 px-3 py-1.5 rounded-full',
              'text-xs font-medium transition-all',
              isSelected
                ? option.bgColor
                  ? `${option.bgColor} ${option.color}`
                  : 'bg-primary-500 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            )}
          >
            {option.label}
            {isSelected && <X className="w-3 h-3 ml-0.5" />}
          </button>
        );
      })}
    </div>
  );
}

// Pre-configured AI tool filter chips
interface AIToolFilterProps {
  selected: string[];
  onChange: (selected: string[]) => void;
  className?: string;
}

export function AIToolFilter({ selected, onChange, className }: AIToolFilterProps) {
  const toolOptions = Object.values(AI_TOOLS).map((tool) => ({
    id: tool.id,
    label: tool.name,
    color: tool.color,
    bgColor: tool.bgColor,
  }));

  return (
    <FilterChips
      label="AI Tool"
      options={toolOptions}
      selected={selected}
      onChange={onChange}
      className={className}
    />
  );
}

// Active filters display with remove functionality
interface ActiveFiltersProps {
  filters: {
    tags: string[];
    tools: string[];
    featured: boolean;
  };
  onRemoveTag: (tag: string) => void;
  onRemoveTool: (tool: string) => void;
  onRemoveFeatured: () => void;
  onClearAll: () => void;
  className?: string;
}

export function ActiveFilters({
  filters,
  onRemoveTag,
  onRemoveTool,
  onRemoveFeatured,
  onClearAll,
  className,
}: ActiveFiltersProps) {
  const hasFilters =
    filters.tags.length > 0 || filters.tools.length > 0 || filters.featured;

  if (!hasFilters) return null;

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <span className="text-xs font-medium text-slate-500">Đang lọc:</span>

      {/* Tag filters */}
      {filters.tags.map((tag) => (
        <button
          key={`tag-${tag}`}
          onClick={() => onRemoveTag(tag)}
          className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-200 text-slate-700 text-xs hover:bg-slate-300 transition-colors"
        >
          #{tag}
          <X className="w-3 h-3" />
        </button>
      ))}

      {/* Tool filters */}
      {filters.tools.map((tool) => {
        const toolInfo = AI_TOOLS[tool];
        return (
          <button
            key={`tool-${tool}`}
            onClick={() => onRemoveTool(tool)}
            className={cn(
              'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs',
              'hover:opacity-80 transition-opacity',
              toolInfo?.bgColor || 'bg-slate-200',
              toolInfo?.color || 'text-slate-700'
            )}
          >
            {toolInfo?.name || tool}
            <X className="w-3 h-3" />
          </button>
        );
      })}

      {/* Featured filter */}
      {filters.featured && (
        <button
          onClick={onRemoveFeatured}
          className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs hover:bg-yellow-200 transition-colors"
        >
          Featured
          <X className="w-3 h-3" />
        </button>
      )}

      {/* Clear all */}
      <button
        onClick={onClearAll}
        className="text-xs text-slate-500 hover:text-slate-700 underline ml-2"
      >
        Xóa tất cả
      </button>
    </div>
  );
}
