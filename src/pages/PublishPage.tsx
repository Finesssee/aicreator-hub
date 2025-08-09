import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { SEOWrapper } from '@/components/seo/SEOWrapper';
import { Navigation } from '@/components/layout/Navigation';
import { ArrowLeft, Upload } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
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

const techStacks = [
  'Python', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'PyTorch', 
  'TensorFlow', 'Hugging Face', 'OpenAI', 'Anthropic', 'Replicate',
  'Gradio', 'Streamlit', 'FastAPI', 'Flask', 'Next.js'
];

const useCases = [
  'Text Generation', 'Image Generation', 'Code Generation', 'Data Analysis',
  'Translation', 'Summarization', 'Classification', 'Question Answering',
  'Speech Recognition', 'Image Recognition', 'Video Processing', 'Audio Processing'
];

const formSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  slug: z.string().min(1, 'Slug is required').max(50, 'Slug must be less than 50 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  tagline: z.string().min(1, 'Tagline is required').max(200, 'Tagline must be less than 200 characters'),
  description: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  license: z.string().default('MIT'),
  thumbnailUrl: z.string().url().optional().or(z.literal('')),
  readmeMarkdown: z.string().optional(),
  replicateOwner: z.string().optional(),
  replicateModel: z.string().optional(),
  replicateVersion: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const PublishPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>([]);
  const [selectedUseCases, setSelectedUseCases] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      slug: '',
      tagline: '',
      description: '',
      category: '',
      license: 'MIT',
      thumbnailUrl: '',
      readmeMarkdown: '',
      replicateOwner: '',
      replicateModel: '',
      replicateVersion: '',
    },
  });

  // Auto-generate slug from name
  const watchName = form.watch('name');
  React.useEffect(() => {
    if (watchName) {
      const slug = watchName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      form.setValue('slug', slug);
    }
  }, [watchName, form]);

  const toggleSelection = (item: string, selected: string[], setSelected: (items: string[]) => void) => {
    if (selected.includes(item)) {
      setSelected(selected.filter(i => i !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const connector = data.replicateOwner && data.replicateModel ? {
        provider: 'replicate',
        owner: data.replicateOwner,
        model: data.replicateModel,
        version: data.replicateVersion || 'latest',
        defaultInputs: {}
      } : null;

      const { error } = await supabase
        .from('apps')
        .insert({
          name: data.name,
          slug: data.slug,
          tagline: data.tagline,
          description: data.description,
          category: data.category,
          use_cases: selectedUseCases,
          tech_stack: selectedTechStack,
          license: data.license,
          thumbnail_url: data.thumbnailUrl || null,
          readme_markdown: data.readmeMarkdown,
          connector
        });

      if (error) throw error;

      toast.success('App published successfully!');
      navigate('/explore');
    } catch (error) {
      console.error('Error publishing app:', error);
      toast.error('Failed to publish app. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SEOWrapper 
      title="Publish AI App - Share Your AI Application"
      description="Publish your AI application to our open marketplace. Share with thousands of developers and connect to deployment platforms."
      keywords="publish AI app, AI marketplace, share AI application, AI development platform"
    >
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center mb-8">
              <Button variant="ghost" size="sm" asChild className="mr-4">
                <Link to="/explore">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Explore
                </Link>
              </Button>
              <h1 className="text-3xl font-bold">Publish AI App</h1>
            </div>

            <Card className="soft-shadow">
              <CardHeader>
                <CardTitle>App Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>App Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="My Awesome AI App" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Slug *</FormLabel>
                            <FormControl>
                              <Input placeholder="my-awesome-ai-app" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="tagline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tagline *</FormLabel>
                          <FormControl>
                            <Input placeholder="Brief description of what your app does" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Detailed description of your AI app, its features, and how to use it..."
                              rows={4}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Category and License */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category} value={category}>
                                    {category}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="license"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>License</FormLabel>
                            <FormControl>
                              <Input placeholder="MIT" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Tech Stack */}
                    <div>
                      <FormLabel>Tech Stack</FormLabel>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                        {techStacks.map((tech) => (
                          <Button
                            key={tech}
                            type="button"
                            variant={selectedTechStack.includes(tech) ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleSelection(tech, selectedTechStack, setSelectedTechStack)}
                          >
                            {tech}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Use Cases */}
                    <div>
                      <FormLabel>Use Cases</FormLabel>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                        {useCases.map((useCase) => (
                          <Button
                            key={useCase}
                            type="button"
                            variant={selectedUseCases.includes(useCase) ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleSelection(useCase, selectedUseCases, setSelectedUseCases)}
                          >
                            {useCase}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Media */}
                    <FormField
                      control={form.control}
                      name="thumbnailUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Thumbnail URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com/thumbnail.jpg" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* README */}
                    <FormField
                      control={form.control}
                      name="readmeMarkdown"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>README (Markdown)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="# My AI App&#10;&#10;## Installation&#10;&#10;## Usage&#10;&#10;## Examples"
                              rows={8}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Replicate Connector */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Replicate Connector (Optional)</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="replicateOwner"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Owner</FormLabel>
                                <FormControl>
                                  <Input placeholder="stability-ai" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="replicateModel"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Model</FormLabel>
                                <FormControl>
                                  <Input placeholder="sdxl" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="replicateVersion"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Version</FormLabel>
                                <FormControl>
                                  <Input placeholder="latest" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Submit */}
                    <div className="flex justify-end space-x-4">
                      <Button type="button" variant="outline" asChild>
                        <Link to="/explore">Cancel</Link>
                      </Button>
                      <Button type="submit" disabled={isSubmitting}>
                        <Upload className="h-4 w-4 mr-2" />
                        {isSubmitting ? 'Publishing...' : 'Publish App'}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SEOWrapper>
  );
};

export default PublishPage;