import React from 'react';
import { cn } from '@/lib/utils';

interface FolderSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'trending';
}

export const FolderSection: React.FC<FolderSectionProps> = ({
  title,
  children,
  className,
  variant = 'default'
}) => {
  const bgClass = variant === 'trending' ? 'bg-trending-background/50' : 'bg-muted/30';
  return (
    <section className={cn("mb-12", className)}>
      {/* Seamless folder design */}
      <div className="relative">
        {/* Main content rectangle */}
        <div className={cn("relative border border-border rounded-3xl pt-8 pb-8 px-8", bgClass)}>
          {children}
        </div>
        
        {/* Folder tab - positioned above the rectangle */}
        <div className={cn("absolute -top-8 left-8 border-l border-t border-r border-border rounded-t-xl px-6 py-2 min-w-fit z-10", bgClass)}>
          <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">{title}</span>
        </div>
      </div>
    </section>
  );
};