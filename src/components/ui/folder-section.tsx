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
        {/* Tab portion - seamlessly connected */}
        <div className="relative bg-muted/30 border border-border rounded-3xl">
          {/* Folder tab with title inside */}
          <div className="absolute -top-6 left-8 bg-muted/30 border-l border-t border-r border-border rounded-t-xl px-6 py-2 min-w-fit">
            <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">{title}</span>
          </div>
          
          {/* Main content area */}
          <div className="pt-8 pb-8 px-8">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};