import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AppCard, type App } from '@/components/ui/app-card';
import { IndustryAppCard } from '@/components/ui/industry-app-card';
import { FolderSection } from '@/components/ui/folder-section';
import { EnhancedPagination } from '@/components/ui/enhanced-pagination';
import { SEOWrapper } from '@/components/seo/SEOWrapper';
import { Navigation } from '@/components/layout/Navigation';
import { Search, Filter, ChevronDown, Plus, ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { healthcareApps, financeApps, administrationApps } from '@/data/industryApps';

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

          {/* Healthcare Section */}
          <div className="mt-16">
            <div className="mb-12">
              <div className="relative">
                <div className="relative rounded-3xl pt-8 pb-8 px-8" style={{ backgroundColor: '#E9F7F2' }}>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Healthcare Applications</h2>
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800 border border-gray-300 hover:border-primary hover:text-primary transition-colors">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      View More
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {healthcareApps.slice(0, 12).map((app) => (
                      <IndustryAppCard
                        key={app.id}
                        app={app}
                        onPreview={(app) => handleAppAction('Preview', app)}
                        onCustomize={(app) => handleAppAction('Customize', app)}
                        onRunDeploy={(app) => handleAppAction('Run/Deploy', app)}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute -top-8 left-8 rounded-t-xl px-6 py-2 min-w-fit z-10" style={{ backgroundColor: '#E9F7F2' }}>
                  <span className="text-sm font-medium text-gray-600 whitespace-nowrap">Healthcare</span>
                </div>
              </div>
            </div>
          </div>

          {/* Finance Section */}
          <div className="mt-16">
            <div className="mb-12">
              <div className="relative">
                <div className="relative rounded-3xl pt-8 pb-8 px-8" style={{ backgroundColor: '#E9EDF5' }}>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Finance Applications</h2>
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800 border border-gray-300 hover:border-primary hover:text-primary transition-colors">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      View More
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {financeApps.slice(0, 12).map((app) => (
                      <IndustryAppCard
                        key={app.id}
                        app={app}
                        onPreview={(app) => handleAppAction('Preview', app)}
                        onCustomize={(app) => handleAppAction('Customize', app)}
                        onRunDeploy={(app) => handleAppAction('Run/Deploy', app)}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute -top-8 left-8 rounded-t-xl px-6 py-2 min-w-fit z-10" style={{ backgroundColor: '#E9EDF5' }}>
                  <span className="text-sm font-medium text-gray-600 whitespace-nowrap">Finance</span>
                </div>
              </div>
            </div>
          </div>

          {/* Administration Section */}
          <div className="mt-16">
            <div className="mb-12">
              <div className="relative">
                <div className="relative rounded-3xl pt-8 pb-8 px-8" style={{ backgroundColor: '#F5F5F5' }}>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Administration Applications</h2>
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800 border border-gray-300 hover:border-primary hover:text-primary transition-colors">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      View More
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {administrationApps.slice(0, 12).map((app) => (
                      <IndustryAppCard
                        key={app.id}
                        app={app}
                        onPreview={(app) => handleAppAction('Preview', app)}
                        onCustomize={(app) => handleAppAction('Customize', app)}
                        onRunDeploy={(app) => handleAppAction('Run/Deploy', app)}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute -top-8 left-8 rounded-t-xl px-6 py-2 min-w-fit z-10" style={{ backgroundColor: '#F5F5F5' }}>
                  <span className="text-sm font-medium text-gray-600 whitespace-nowrap">Administration</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SEOWrapper>
  );
};

export default ExplorePage;