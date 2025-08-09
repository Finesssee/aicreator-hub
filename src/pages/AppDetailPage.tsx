import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SEOWrapper } from '@/components/seo/SEOWrapper';
import { Navigation } from '@/components/layout/Navigation';
import { ArrowLeft, Play, Copy, ExternalLink, Edit, FileText } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase, type App } from '@/lib/supabase';
import { toast } from 'sonner';

const AppDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [runInputs, setRunInputs] = useState<Record<string, any>>({});
  const [isRunning, setIsRunning] = useState(false);
  const [runResult, setRunResult] = useState<any>(null);

  // Fetch app details
  const { data: apps = [], isLoading } = useQuery({
    queryKey: ['app', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('apps')
        .select('*')
        .eq('slug', slug);
      
      if (error) throw error;
      return data as App[];
    }
  });

  const app = apps[0];

  const handleRun = async () => {
    if (!app?.connector) {
      toast.error('No connector configured for this app');
      return;
    }

    setIsRunning(true);
    try {
      // Mock run simulation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock response based on app type
      let mockResult;
      if (app.category === 'Image & Video') {
        mockResult = {
          images: ['https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=512&h=512&fit=crop']
        };
      } else if (app.category === 'Chat & Agents') {
        mockResult = {
          text: "This is a mock response from the AI assistant. In a real implementation, this would be the actual output from the connected model."
        };
      } else {
        mockResult = {
          result: "Mock output from the AI model",
          processing_time: "2.3s",
          status: "completed"
        };
      }

      setRunResult(mockResult);
      toast.success('Run completed successfully!');
    } catch (error) {
      toast.error('Run failed. Please try again.');
    } finally {
      setIsRunning(false);
    }
  };

  const handleClone = () => {
    toast.success(`Cloned ${app?.name} to your workspace!`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-64" />
            <div className="h-32 bg-muted rounded" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-96 bg-muted rounded" />
              <div className="h-96 bg-muted rounded" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">App Not Found</h1>
          <p className="text-muted-foreground mb-6">The requested app could not be found.</p>
          <Button asChild>
            <Link to="/explore">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Explore
            </Link>
          </Button>
        </main>
      </div>
    );
  }

  return (
    <SEOWrapper 
      title={`${app.name} - ${app.tagline}`}
      description={app.description || app.tagline}
      keywords={`${app.name}, ${app.category}, ${app.tech_stack?.join(', ')}, AI app`}
    >
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="sm" asChild className="mr-4">
              <Link to="/explore">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Explore
              </Link>
            </Button>
          </div>

          {/* App Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{app.name}</h1>
                <p className="text-xl text-muted-foreground mb-4">{app.tagline}</p>
                
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="default">{app.category}</Badge>
                  <Badge variant="outline">{app.license}</Badge>
                  {app.tech_stack?.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                </div>

                {/* Use Cases */}
                {app.use_cases && app.use_cases.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Use Cases</h3>
                    <div className="flex flex-wrap gap-1">
                      {app.use_cases.map((useCase) => (
                        <Badge key={useCase} variant="outline" className="text-xs">
                          {useCase}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={handleClone}>
                  <Copy className="h-4 w-4 mr-2" />
                  Clone
                </Button>
                <Button onClick={handleRun} disabled={isRunning}>
                  <Play className="h-4 w-4 mr-2" />
                  {isRunning ? 'Running...' : 'Run'}
                </Button>
                {app.connector && (
                  <Button variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open in Replicate
                  </Button>
                )}
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Open in Lovable
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Preview Panel */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Play className="h-5 w-5 mr-2" />
                  Preview & Run
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Input Form */}
                {app.connector?.defaultInputs && (
                  <div className="space-y-3">
                    <h4 className="font-medium">Inputs</h4>
                    {Object.entries(app.connector.defaultInputs).map(([key, defaultValue]) => (
                      <div key={key}>
                        <Label htmlFor={key} className="capitalize">
                          {key.replace(/_/g, ' ')}
                        </Label>
                        <Input
                          id={key}
                          placeholder={String(defaultValue)}
                          value={runInputs[key] || ''}
                          onChange={(e) => setRunInputs({
                            ...runInputs,
                            [key]: e.target.value
                          })}
                        />
                      </div>
                    ))}
                  </div>
                )}

                <Button 
                  onClick={handleRun} 
                  disabled={isRunning}
                  className="w-full"
                >
                  <Play className="h-4 w-4 mr-2" />
                  {isRunning ? 'Running...' : 'Run App'}
                </Button>

                {/* Results */}
                {runResult && (
                  <div className="mt-6">
                    <h4 className="font-medium mb-3">Output</h4>
                    <div className="p-4 bg-muted rounded-lg">
                      {runResult.images ? (
                        <div className="grid grid-cols-1 gap-4">
                          {runResult.images.map((url: string, index: number) => (
                            <img 
                              key={index}
                              src={url} 
                              alt={`Generated output ${index + 1}`}
                              className="w-full rounded-lg"
                            />
                          ))}
                        </div>
                      ) : runResult.text ? (
                        <p className="whitespace-pre-wrap">{runResult.text}</p>
                      ) : (
                        <pre className="text-sm overflow-auto">
                          {JSON.stringify(runResult, null, 2)}
                        </pre>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Details Panel */}
            <Card className="card-shadow">
              <CardContent className="p-0">
                <Tabs defaultValue="readme" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="readme">
                      <FileText className="h-4 w-4 mr-2" />
                      README
                    </TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="readme" className="p-6">
                    {app.readme_markdown ? (
                      <div className="prose prose-sm max-w-none">
                        <pre className="whitespace-pre-wrap text-sm">
                          {app.readme_markdown}
                        </pre>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No README available</p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="details" className="p-6">
                    <div className="space-y-6">
                      {app.description && (
                        <div>
                          <h4 className="font-medium mb-2">Description</h4>
                          <p className="text-muted-foreground">{app.description}</p>
                        </div>
                      )}

                      {app.tech_stack && app.tech_stack.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2">Tech Stack</h4>
                          <div className="flex flex-wrap gap-2">
                            {app.tech_stack.map((tech) => (
                              <Badge key={tech} variant="secondary">{tech}</Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {app.connector && (
                        <div>
                          <h4 className="font-medium mb-2">Connector</h4>
                          <div className="bg-muted p-3 rounded-lg">
                            <p className="text-sm">
                              <strong>Provider:</strong> {app.connector.provider}
                            </p>
                            <p className="text-sm">
                              <strong>Model:</strong> {app.connector.owner}/{app.connector.model}
                            </p>
                            {app.connector.version && (
                              <p className="text-sm">
                                <strong>Version:</strong> {app.connector.version}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      <div>
                        <h4 className="font-medium mb-2">Metadata</h4>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p><strong>License:</strong> {app.license}</p>
                          <p><strong>Created:</strong> {new Date(app.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SEOWrapper>
  );
};

export default AppDetailPage;