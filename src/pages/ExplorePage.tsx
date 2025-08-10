import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AppCard, type App } from '@/components/ui/app-card';
import { FolderSection } from '@/components/ui/folder-section';
import { EnhancedPagination } from '@/components/ui/enhanced-pagination';
import { SEOWrapper } from '@/components/seo/SEOWrapper';
import { Navigation } from '@/components/layout/Navigation';
import { Search, Filter, ChevronDown, Plus, TrendingUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

const categories = [
  'Chat & Agents',
  'Image & Video', 
  'Audio & Music',
  'Text & Content',
  'Developer Tools & Automation',
  'Creative & Fun'
];

const ExplorePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const trendingItemsPerPage = 4;

  // Fetch all apps from Supabase for proper pagination
  const { data: allApps = [], isLoading, error } = useQuery({
    queryKey: ['apps', selectedCategory],
    queryFn: async () => {
      if (selectedCategory) {
        const result = await supabase.from('apps').select('*').eq('category', selectedCategory);
        return result.data || [];
      } else {
        // Get all apps by using a large range
        const result = await supabase.from('apps').select('*').range(0, 999);
        return result.data || [];
      }
    }
  });

  // Apply search filtering on client side
  const filteredApps = searchQuery
    ? allApps.filter(app =>
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allApps;

  // Handle keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        document.getElementById('search-input')?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAppAction = useCallback((action: string, app: App) => {
    toast.success(`${action} action for ${app.name}`);
    // TODO: Implement actual actions
  }, []);

  const trendingApps = filteredApps.slice(0, trendingItemsPerPage);
  const mainApps = filteredApps.slice(trendingItemsPerPage);
  const totalPages = Math.ceil(mainApps.length / itemsPerPage);
  const paginatedMainApps = mainApps.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (error) {
    toast.error('Failed to load apps');
  }

  return (
    <SEOWrapper 
      title="Explore AI Apps - Browse and Deploy AI Applications"
      description="Discover thousands of AI applications. Search by category, tech stack, and use case. Clone and deploy with one click."
      keywords="AI apps, explore AI, AI marketplace, machine learning applications, AI tools"
    >
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-3xl font-bold mb-2">Explore All AI Apps</h1>
              <div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search-input"
                    placeholder="Search for AI applications... (Press '/' to focus)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" className="min-w-[120px]">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => setSelectedCategory(null)}>
                      All Apps
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedCategory('trending')}>
                      Trending
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedCategory('recent')}>
                      Recent
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedCategory('popular')}>
                      Most Popular
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Category <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 grid grid-cols-1 gap-1">
                    <DropdownMenuItem onClick={() => setSelectedCategory(null)}>
                      All Categories
                    </DropdownMenuItem>
                    {categories.map((category) => (
                      <DropdownMenuItem key={category} onClick={() => setSelectedCategory(category)}>
                        {category}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <Button variant="outline" asChild>
              <Link to="/publish">
                <Plus className="h-4 w-4 mr-2" />
                Create
              </Link>
            </Button>
          </div>

          {/* Active Filter Display */}
          {selectedCategory && (
            <div className="mb-6">
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="mr-2"
              >
                {selectedCategory} ✕
              </Button>
            </div>
          )}

          {/* Trending Section with spacing */}
          <div className="mt-16">
            {trendingApps.length > 0 && (
              <FolderSection title="Most Trendy AI Applications" variant="trending">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {trendingApps.map((app) => (
                    <AppCard
                      key={app.id}
                      app={app}
                      onPreview={(app) => handleAppAction('Preview', app)}
                      onClone={(app) => handleAppAction('Clone', app)}
                      onRun={(app) => handleAppAction('Run', app)}
                      onOpenReplicate={(app) => handleAppAction('Open in Replicate', app)}
                      onOpenLovable={(app) => handleAppAction('Open in Lovable', app)}
                      onRemix={(app) => handleAppAction('Remix', app)}
                    />
                  ))}
                </div>
              </FolderSection>
            )}
          </div>

          {/* Main Apps Grid */}
          <section>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 12 }).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="aspect-video bg-muted rounded-t-lg" />
                    <CardContent className="p-4">
                      <div className="h-5 bg-muted rounded mb-2" />
                      <div className="h-4 bg-muted rounded mb-3" />
                      <div className="flex gap-2">
                        <div className="h-6 w-16 bg-muted rounded" />
                        <div className="h-6 w-12 bg-muted rounded" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredApps.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="text-xl font-semibold mb-2">No apps found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery || selectedCategory 
                    ? "Try adjusting your search or filters" 
                    : "Be the first to publish an AI app!"
                  }
                </p>
                <Button asChild variant="create">
                  <Link to="/publish">
                    <Plus className="h-4 w-4 mr-2" />
                    Create First App
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedMainApps.map((app) => (
                  <AppCard
                    key={app.id}
                    app={app}
                    onPreview={(app) => handleAppAction('Preview', app)}
                    onClone={(app) => handleAppAction('Clone', app)}
                    onRun={(app) => handleAppAction('Run', app)}
                    onOpenReplicate={(app) => handleAppAction('Open in Replicate', app)}
                    onOpenLovable={(app) => handleAppAction('Open in Lovable', app)}
                    onRemix={(app) => handleAppAction('Remix', app)}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Enhanced Pagination */}
          {totalPages > 1 && (
            <div className="mt-12">
              <EnhancedPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </main>
      </div>
    </SEOWrapper>
  );
};

export default ExplorePage;