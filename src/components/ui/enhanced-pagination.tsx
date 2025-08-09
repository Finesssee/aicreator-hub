import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const EnhancedPagination: React.FC<EnhancedPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className
}) => {
  // Calculate page range to show
  const getPageRange = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    // Calculate start and end of the range
    let start = Math.max(1, currentPage - delta);
    let end = Math.min(totalPages, currentPage + delta);

    // Adjust range to always show 5 pages when possible
    if (end - start < 4) {
      if (start === 1) {
        end = Math.min(totalPages, start + 4);
      } else if (end === totalPages) {
        start = Math.max(1, end - 4);
      }
    }

    // Create the range array
    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  const pageRange = getPageRange();

  return (
    <div className={cn("flex justify-center items-center gap-2", className)}>
      {/* Previous Button - only show if not on first page */}
      {currentPage > 1 && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          className="rounded-full h-10 w-10 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      {/* Page numbers */}
      {pageRange.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "outline"}
          size="sm"
          onClick={() => onPageChange(page)}
          className="rounded-full h-10 w-10 p-0"
        >
          {page}
        </Button>
      ))}

      {/* Next Button - only show if not on last page */}
      {currentPage < totalPages && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          className="rounded-full h-10 w-10 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};