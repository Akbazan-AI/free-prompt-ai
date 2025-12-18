'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Suspense, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  totalItems: number;
  itemsPerPage?: number;
  maxButtons?: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

function PaginationContent({
  totalItems,
  itemsPerPage = 20,
  maxButtons = 7,
  onPageChange,
  className,
}: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentPage = Number(searchParams.get('page')) || 1;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Generate page numbers with ellipsis
  const pageNumbers = useMemo(() => {
    const pages: (number | 'ellipsis')[] = [];
    const delta = Math.floor((maxButtons - 3) / 2); // Pages around current

    if (totalPages <= maxButtons) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Always show page 1
    pages.push(1);

    // Start ellipsis
    if (currentPage - delta > 2) {
      pages.push('ellipsis');
    }

    // Middle pages
    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    // End ellipsis
    if (currentPage + delta < totalPages - 1) {
      pages.push('ellipsis');
    }

    // Always show last page
    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages, maxButtons]);

  const createPageUrl = useCallback(
    (pageNumber: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (pageNumber === 1) {
        params.delete('page');
      } else {
        params.set('page', pageNumber.toString());
      }
      const queryString = params.toString();
      return queryString ? `${pathname}?${queryString}` : pathname;
    },
    [searchParams, pathname]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage < 1 || newPage > totalPages) return;

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Update URL
      router.push(createPageUrl(newPage));

      // Callback if provided
      onPageChange?.(newPage);
    },
    [totalPages, router, createPageUrl, onPageChange]
  );

  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Pagination navigation"
      className={cn('flex items-center justify-center gap-1', className)}
    >
      {/* Previous button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        className={cn(
          'inline-flex items-center justify-center w-10 h-10 rounded-lg',
          'text-sm font-medium transition-colors',
          currentPage === 1
            ? 'text-slate-300 cursor-not-allowed'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
        )}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((page, idx) =>
          page === 'ellipsis' ? (
            <span
              key={`ellipsis-${idx}`}
              className="w-10 h-10 flex items-center justify-center text-slate-400"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              aria-current={currentPage === page ? 'page' : undefined}
              aria-label={`Go to page ${page}`}
              className={cn(
                'inline-flex items-center justify-center w-10 h-10 rounded-lg',
                'text-sm font-medium transition-colors',
                currentPage === page
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              )}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* Next button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        className={cn(
          'inline-flex items-center justify-center w-10 h-10 rounded-lg',
          'text-sm font-medium transition-colors',
          currentPage === totalPages
            ? 'text-slate-300 cursor-not-allowed'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
        )}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </nav>
  );
}

// Export with Suspense wrapper (required for useSearchParams)
export function Pagination(props: PaginationProps) {
  return (
    <Suspense fallback={<PaginationSkeleton />}>
      <PaginationContent {...props} />
    </Suspense>
  );
}

function PaginationSkeleton() {
  return (
    <div className="flex items-center justify-center gap-1">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="w-10 h-10 rounded-lg bg-slate-100 animate-pulse" />
      ))}
    </div>
  );
}

// Hook for getting paginated data
export function usePagination<T>(items: T[], itemsPerPage = 20) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  return {
    items: paginatedItems,
    currentPage,
    totalPages: Math.ceil(items.length / itemsPerPage),
    totalItems: items.length,
  };
}
