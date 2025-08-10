import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical, Play, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { App } from '@/components/ui/app-card';

interface IndustryAppCardProps {
  app: App;
  onPreview?: (app: App) => void;
  onCustomize?: (app: App) => void;
  onRunDeploy?: (app: App) => void;
  className?: string;
}

export const IndustryAppCard: React.FC<IndustryAppCardProps> = ({
  app,
  onPreview,
  onCustomize,
  onRunDeploy,
  className
}) => {
  return (
    <Card className={cn("group hover-scale card-shadow hover:shadow-lg transition-all duration-200", className)}>
      <CardContent className="p-0">
        {/* Thumbnail */}
        <div className="relative">
          <div className="aspect-video bg-gradient-primary rounded-t-lg flex items-center justify-center">
            {app.thumbnailUrl ? (
              <img 
                src={app.thumbnailUrl} 
                alt={app.name}
                className="w-full h-full object-cover rounded-t-lg"
              />
            ) : (
              <div className="text-white text-lg font-medium">{app.name.charAt(0)}</div>
            )}
          </div>
          
          {/* Three-dot menu - only visible on hover */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-background border border-border shadow-lg">
              <DropdownMenuItem onClick={() => onPreview?.(app)}>
                <Play className="h-4 w-4 mr-2" />
                Preview
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onRunDeploy?.(app)}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Run/Deploy
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{app.name}</h3>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{app.tagline}</p>
          
          {/* Customization Count */}
          {app.customizationCount !== undefined && (
            <div className="text-xs text-muted-foreground mb-3">
              {app.customizationCount.toLocaleString()} people have customized this
            </div>
          )}
          
          {/* CTA Button */}
          <Button 
            onClick={() => onCustomize?.(app)}
            className="w-full"
            variant="default"
          >
            Customize
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};