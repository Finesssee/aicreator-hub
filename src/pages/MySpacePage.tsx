import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FolderSection } from '@/components/ui/folder-section';
import { SEOWrapper } from '@/components/seo/SEOWrapper';
import { Navigation } from '@/components/layout/Navigation';
import { ExternalLink, Share2, Play, Code, Sparkles, Plus, Star } from 'lucide-react';
import { toast } from 'sonner';

interface MyApp {
  id: number;
  name: string;
  tagline: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  isPublic: boolean;
  originalApp: string | null;
}

// Sample apps data
const myClonedApps: MyApp[] = [
  {
    id: 1,
    name: "Custom Chat Assistant",
    tagline: "Personalized AI chat with custom training",
    description: "Enhanced version of ChatGPT clone with custom personality and responses",
    image: "/src/assets/my-app-chat-assistant.jpg",
    category: "Chat & Agents",
    tags: ["AI", "Chat", "Custom"],
    isPublic: false,
    originalApp: "ChatGPT Clone"
  },
  {
    id: 2,
    name: "Brand Image Generator",
    tagline: "AI image generation for brand assets",
    description: "Customized image generator with brand-specific styles and templates",
    image: "/src/assets/my-app-image-creator.jpg",
    category: "Image & Video",
    tags: ["AI", "Images", "Branding"],
    isPublic: true,
    originalApp: "SDXL Image Generator"
  }
];

const myOriginalApps: MyApp[] = [
  {
    id: 3,
    name: "Task Manager Pro",
    tagline: "Smart productivity with AI insights",
    description: "Built from scratch productivity app with AI-powered task prioritization",
    image: "/src/assets/my-app-task-manager.jpg",
    category: "Developer Tools & Automation",
    tags: ["Productivity", "AI", "Management"],
    isPublic: false,
    originalApp: null
  }
];

const MySpacePage: React.FC = () => {
  const [hoveredApp, setHoveredApp] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'original' | 'customized'>('all');

  const handleShare = (app: MyApp, e: React.MouseEvent) => {
    e.stopPropagation();
    if (app.isPublic) {
      toast.success(`${app.name} is already shared publicly`);
    } else {
      toast.success(`${app.name} has been shared to the community!`);
      // In real implementation, this would update the database
    }
  };

  const handleOpenInEditor = (app: MyApp, editor: string) => {
    const url = editor === 'lovable' 
      ? `https://lovable.dev/editor/${app.id}`
      : `https://cursor.sh/project/${app.id}`;
    
    window.open(url, '_blank');
    toast.success(`Opening ${app.name} in ${editor}`);
  };

  const filteredApps = [...myOriginalApps, ...myClonedApps].filter(app => {
    if (activeCategory === 'original') return !app.originalApp;
    if (activeCategory === 'customized') return !!app.originalApp;
    return true;
  });

  const AppCard = ({ app, showOriginal = false }: { app: MyApp; showOriginal?: boolean }) => (
    <Card 
      className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setHoveredApp(app.id)}
      onMouseLeave={() => setHoveredApp(null)}
    >
      <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
        <img 
          src={app.image} 
          alt={app.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Share button - appears on hover */}
        {hoveredApp === app.id && (
          <div className="absolute top-3 right-3 flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={(e) => handleShare(app, e)}
              className="h-8 px-3 bg-background/90 backdrop-blur-sm hover:bg-background"
            >
              <Share2 className="h-3 w-3 mr-1" />
              {app.isPublic ? 'Shared' : 'Share'}
            </Button>
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {app.isPublic && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Public
            </Badge>
          )}
          {!app.originalApp && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 flex items-center gap-1">
              <Star className="h-3 w-3" />
              Original
            </Badge>
          )}
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
            {app.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">{app.tagline}</p>
          {showOriginal && app.originalApp && (
            <p className="text-xs text-muted-foreground mb-2">
              Based on: <span className="font-medium">{app.originalApp}</span>
            </p>
          )}
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {app.tags.slice(0, 3).map((tag: string) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        {/* Action buttons - always visible on mobile, on hover for desktop */}
        <div className={`flex gap-2 transition-all duration-200 ${
          hoveredApp === app.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 sm:opacity-100 sm:translate-y-0'
        }`}>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleOpenInEditor(app, 'lovable')}
            className="flex-1"
          >
            <Code className="h-3 w-3 mr-1" />
            Lovable
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleOpenInEditor(app, 'cursor')}
            className="flex-1"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            Cursor
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <SEOWrapper 
      title="My Space - Manage Your AI Applications"
      description="View and manage your cloned and custom AI applications. Share with the community and continue development."
      keywords="my apps, AI development, app management, custom applications"
    >
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-3xl font-bold mb-2">My Space</h1>
              <p className="text-muted-foreground">
                Manage your cloned apps and original creations
              </p>
            </div>

            <div className="flex gap-4 items-center">
              {/* Category Filter Buttons */}
              <div className="flex gap-2">
                <Button
                  variant={activeCategory === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveCategory('all')}
                >
                  All Apps
                </Button>
                <Button
                  variant={activeCategory === 'original' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveCategory('original')}
                >
                  Original Work
                </Button>
                <Button
                  variant={activeCategory === 'customized' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveCategory('customized')}
                >
                  Customized Apps
                </Button>
              </div>

              <Button variant="create-filled" asChild>
                <Link to="/publish">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New App
                </Link>
              </Button>
            </div>
          </div>

          {/* All Apps in One Space */}
          <div className="mt-8">
            {filteredApps.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Sort by recent work first - using reverse order to show newer items first */}
                {filteredApps
                  .sort((a, b) => b.id - a.id)
                  .map((app) => (
                    <AppCard key={app.id} app={app} showOriginal={!!app.originalApp} />
                  ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Sparkles className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No apps yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start by creating or cloning apps from the community
                </p>
                <div className="flex gap-4 justify-center">
                  <Button asChild variant="outline">
                    <Link to="/explore">
                      Browse Apps
                    </Link>
                  </Button>
                  <Button asChild variant="create-filled">
                    <Link to="/publish">
                      <Plus className="h-4 w-4 mr-2" />
                      Create App
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </SEOWrapper>
  );
};

export default MySpacePage;