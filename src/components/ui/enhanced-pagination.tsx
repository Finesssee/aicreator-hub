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
  // Calculate page range to show (always 5 pages)
  const getPageRange = () => {
    const pagesPerBlock = 5;
    
    // Calculate which block of 5 pages we should show
    const currentBlock = Math.floor((currentPage - 1) / pagesPerBlock);
    const start = currentBlock * pagesPerBlock + 1;
    const end = Math.min(start + pagesPerBlock - 1, totalPages);
    
    const range = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    
    return range;
  };

  const shouldShowPrevious = () => {
    const pageRange = getPageRange();
    return pageRange[0] > 1;
  };

  const shouldShowNext = () => {
    const pageRange = getPageRange();
    return pageRange[pageRange.length - 1] < totalPages;
  };

  const pageRange = getPageRange();

  return (
    <div className={cn("flex justify-center items-center gap-2", className)}>
      {/* Previous Button - show if there are pages before current sequence */}
      {shouldShowPrevious() && (
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

      {/* Next Button - show if there are pages after current sequence */}
      {shouldShowNext() && (
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