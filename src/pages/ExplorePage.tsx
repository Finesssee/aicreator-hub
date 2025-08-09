import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AppCard, type App } from '@/components/ui/app-card';
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

  // Fetch apps from Supabase
  const { data: apps = [], isLoading, error } = useQuery({
    queryKey: ['apps', searchQuery, selectedCategory, currentPage],
    queryFn: async () => {
      let query = supabase.from('apps').select('*').order('created_at', { ascending: false });

      // Apply filters based on search and category
      if (searchQuery && selectedCategory) {
        // Both search and category
        const { data } = await query.eq('category', selectedCategory).range(
          (currentPage - 1) * itemsPerPage, 
          currentPage * itemsPerPage - 1
        );
        // Mock search filtering on client side for demo
        const filtered = data?.filter(app => 
          app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.description?.toLowerCase().includes(searchQuery.toLowerCase())
        ) || [];
        return filtered;
      } else if (searchQuery) {
        // Search only
        const { data } = await query.range(
          (currentPage - 1) * itemsPerPage, 
          currentPage * itemsPerPage - 1
        );
        // Mock search filtering on client side for demo
        const filtered = data?.filter(app => 
          app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.description?.toLowerCase().includes(searchQuery.toLowerCase())
        ) || [];
        return filtered;
      } else if (selectedCategory) {
        // Category only
        const { data } = await query.eq('category', selectedCategory).range(
          (currentPage - 1) * itemsPerPage, 
          currentPage * itemsPerPage - 1
        );
        return data || [];
      } else {
        // No filters
        const { data } = await query.range(
          (currentPage - 1) * itemsPerPage, 
          currentPage * itemsPerPage - 1
        );
        return data || [];
      }
    }
  });

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

  const trendingApps = apps.slice(0, 4);
  const mainApps = apps.slice(4);

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

          {/* Trending Section */}
          {trendingApps.length > 0 && (
            <section className="mb-12">
              <div className="bg-muted/30 rounded-3xl p-8 border-none">
                <div className="flex items-center mb-6">
                  <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                  <h2 className="text-xl font-semibold text-foreground">Most Trendy AI Applications</h2>
                </div>
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
              </div>
            </section>
          )}

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
            ) : apps.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="text-xl font-semibold mb-2">No apps found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery || selectedCategory 
                    ? "Try adjusting your search or filters" 
                    : "Be the first to publish an AI app!"
                  }
                </p>
                <Button asChild>
                  <Link to="/publish">
                    <Plus className="h-4 w-4 mr-2" />
                    Create First App
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mainApps.slice(0, 12).map((app) => (
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

          {/* Pagination */}
          {mainApps.length > 0 && (
            <div className="flex justify-center mt-12">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="rounded-full"
                >
                  Previous
                </Button>
                <Button variant="outline" className="rounded-full">{currentPage}</Button>
                <Button 
                  variant="outline"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="rounded-full"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </SEOWrapper>
  );
};

export default ExplorePage;