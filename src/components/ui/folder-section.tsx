import React from 'react';
import { cn } from '@/lib/utils';

interface FolderSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const FolderSection: React.FC<FolderSectionProps> = ({
  title,
  children,
  className
}) => {
  return (
    <section className={cn("mb-12", className)}>
      {/* Seamless folder design */}
      <div className="relative">
        {/* Main content rectangle */}
        <div className="relative bg-[hsl(var(--folder-bg))] border border-border rounded-3xl pt-8 pb-8 px-8">
          {children}
        </div>
        
        {/* Folder tab - positioned above the rectangle */}
        <div className="absolute -top-8 left-8 bg-[hsl(var(--folder-bg))] border-l border-t border-r border-border rounded-t-xl px-6 py-2 min-w-fit z-10">
          <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">{title}</span>
        </div>
      </div>
    </section>
  );
};