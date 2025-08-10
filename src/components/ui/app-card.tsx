import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical, Play, Copy, ExternalLink, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ConnectorDefaultInputs = Record<string, string | number | boolean | null>;
export interface ReplicateConnector {
  provider: 'replicate';
  owner: string;
  model: string;
  version?: string;
  defaultInputs?: ConnectorDefaultInputs;
}
export type Connector = ReplicateConnector;

export interface App {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description?: string;
  category: string;
  useCases?: string[];
  techStack?: string[];
  tags?: string[];
  license?: string;
  thumbnailUrl?: string;
  readmeMarkdown?: string;
  connector?: Connector;
  createdAt: string;
  customizationCount?: number;
}

interface AppCardProps {
  app: App;
  onPreview?: (app: App) => void;
  onClone?: (app: App) => void;
  onRun?: (app: App) => void;
  onOpenReplicate?: (app: App) => void;
  onOpenLovable?: (app: App) => void;
  onRemix?: (app: App) => void;
  className?: string;
}

export const AppCard: React.FC<AppCardProps> = ({
  app,
  onPreview,
  onClone,
  onRun,
  onOpenReplicate,
  onOpenLovable,
  onRemix,
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
          
          {/* Three-dot menu */}
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
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => onPreview?.(app)}>
                <Play className="h-4 w-4 mr-2" />
                Preview
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onClone?.(app)}>
                <Copy className="h-4 w-4 mr-2" />
                Clone
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onRun?.(app)}>
                <Play className="h-4 w-4 mr-2" />
                Run/Deploy
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onOpenReplicate?.(app)}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Open in Replicate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onOpenLovable?.(app)}>
                <Edit className="h-4 w-4 mr-2" />
                Open in Lovable
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onRemix?.(app)}>
                <Copy className="h-4 w-4 mr-2" />
                Remix
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{app.name}</h3>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{app.tagline}</p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            <Badge variant="secondary" className="text-xs">
              {app.category}
            </Badge>
            {app.techStack?.slice(0, 2).map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
          
          {/* Customization Count */}
          {app.customizationCount !== undefined && (
            <div className="text-xs text-muted-foreground">
              {app.customizationCount} customizations
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};