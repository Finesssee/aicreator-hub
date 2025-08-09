// Mock Supabase client for demo purposes
// In a real implementation, this would be replaced with actual Supabase integration

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
  connector?: any;
  createdAt: string;
  updatedAt?: string;
  customizationCount?: number;
}

export interface Run {
  id: string;
  app_id: string;
  status: 'pending' | 'running' | 'succeeded' | 'failed';
  input_json?: any;
  output_json?: any;
  logs?: string;
  external_run_id?: string;
  created_at: string;
  updated_at?: string;
}

// Categories array
const categories = [
  'Chat & Agents',
  'Image & Video', 
  'Audio & Music',
  'Text & Content',
  'Developer Tools & Automation',
  'Creative & Fun'
];

// Mock data for demo
const mockApps: App[] = [
  {
    id: '1',
    slug: 'stable-diffusion-xl',
    name: 'Stable Diffusion XL',
    tagline: 'High-quality text-to-image generation with SDXL',
    description: 'Generate stunning images from text prompts using Stable Diffusion XL. Perfect for creative projects, marketing materials, and artistic exploration.',
    category: 'Image & Video',
    useCases: ['Image Generation', 'Creative Design'],
    techStack: ['Python', 'PyTorch', 'Replicate'],
    license: 'MIT',
    thumbnailUrl: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop',
    connector: {
      provider: 'replicate',
      owner: 'stability-ai',
      model: 'sdxl',
      version: 'latest',
      defaultInputs: {
        prompt: 'A beautiful landscape',
        num_outputs: 1,
        guidance_scale: 7.5
      }
    },
    createdAt: '2024-01-15T10:00:00Z',
    customizationCount: 1847
  },
  {
    id: '2',
    slug: 'gpt4-chat-assistant',
    name: 'GPT-4 Chat Assistant',
    tagline: 'Intelligent conversational AI powered by GPT-4',
    description: 'A sophisticated chat assistant that can help with various tasks including writing, analysis, coding, and creative projects.',
    category: 'Chat & Agents',
    useCases: ['Text Generation', 'Question Answering', 'Code Generation'],
    techStack: ['OpenAI', 'JavaScript', 'React'],
    license: 'MIT',
    thumbnailUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
    createdAt: '2024-01-14T15:30:00Z',
    customizationCount: 1456
  },
  {
    id: '3',
    slug: 'whisper-transcription',
    name: 'Whisper Transcription',
    tagline: 'Accurate speech-to-text transcription using OpenAI Whisper',
    description: 'Convert audio files to accurate text transcriptions using OpenAI\'s Whisper model. Supports multiple languages and audio formats.',
    category: 'Audio & Music',
    useCases: ['Speech Recognition', 'Translation'],
    techStack: ['Python', 'OpenAI', 'Replicate'],
    license: 'MIT',
    thumbnailUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&h=300&fit=crop',
    connector: {
      provider: 'replicate',
      owner: 'openai',
      model: 'whisper',
      version: 'latest',
      defaultInputs: {
        audio: null,
        model: 'large-v2'
      }
    },
    createdAt: '2024-01-13T09:15:00Z',
    customizationCount: 1234
  },
  {
    id: '4',
    slug: 'code-llama-assistant',
    name: 'Code Llama Assistant',
    tagline: 'AI-powered coding assistant for multiple programming languages',
    description: 'Get help with coding tasks, bug fixes, and code explanations using Meta\'s Code Llama model.',
    category: 'Developer Tools & Automation',
    useCases: ['Code Generation', 'Code Review'],
    techStack: ['Python', 'Llama', 'Replicate'],
    license: 'MIT',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
    createdAt: '2024-01-12T14:20:00Z',
    customizationCount: 987
  },
  // Generate more apps for pagination
  ...Array.from({ length: 44 }, (_, i) => ({
    id: `${i + 5}`,
    slug: `ai-app-${i + 5}`,
    name: `AI App ${i + 5}`,
    tagline: `Amazing AI application for ${categories[i % categories.length].toLowerCase()}`,
    description: `This is an AI application that does amazing things with artificial intelligence technology. It leverages the latest in machine learning and AI to provide innovative solutions.`,
    category: categories[i % categories.length],
    useCases: ['AI Processing', 'Automation', 'Analysis'],
    techStack: ['Python', 'JavaScript', 'React', 'AI/ML'],
    license: 'MIT',
    thumbnailUrl: '/placeholder.svg',
    createdAt: new Date(2024, 0, 12 - Math.floor(i / 10), 10 + (i % 12), i % 60).toISOString(),
    customizationCount: Math.floor(Math.random() * 1500) + 100
  }))
];

// Mock Supabase-like API
export const supabase = {
  from: (table: string) => ({
    select: (columns = '*') => ({
      order: (column: string, options: { ascending: boolean } = { ascending: true }) => ({
        or: (query: string) => ({
          eq: (column: string, value: any) => ({
            range: (from: number, to: number) => 
              Promise.resolve({ 
                data: mockApps.slice(from, to + 1), 
                error: null 
              })
          }),
          range: (from: number, to: number) => 
            Promise.resolve({ 
              data: mockApps.slice(from, to + 1), 
              error: null 
            })
        }),
        eq: (column: string, value: any) => ({
          range: (from: number, to: number) => {
            const filtered = mockApps.filter(app => app[column as keyof App] === value);
            return Promise.resolve({ 
              data: filtered.slice(from, to + 1), 
              error: null 
            });
          },
          or: (query: string) => ({
            range: (from: number, to: number) => 
              Promise.resolve({ 
                data: mockApps.slice(from, to + 1), 
                error: null 
              })
          })
        }),
        range: (from: number, to: number) => 
          Promise.resolve({ 
            data: mockApps.slice(from, to + 1), 
            error: null 
          })
      }),
      eq: (column: string, value: any) => 
        Promise.resolve({ 
          data: mockApps.filter(app => app[column as keyof App] === value), 
          error: null 
        }),
      range: (from: number, to: number) => 
        Promise.resolve({ 
          data: mockApps.slice(from, to + 1), 
          error: null 
        })
    }),
    insert: (data: any) => {
      const newApp: App = {
        id: (mockApps.length + 1).toString(),
        slug: data.slug || '',
        name: data.name || '',
        tagline: data.tagline || '',
        description: data.description,
        category: data.category || '',
        useCases: data.use_cases || [],
        techStack: data.tech_stack || [],
        tags: data.tags || [],
        license: data.license || 'MIT',
        thumbnailUrl: data.thumbnail_url,
        readmeMarkdown: data.readme_markdown,
        connector: data.connector,
        createdAt: new Date().toISOString()
      };
      mockApps.unshift(newApp);
      return Promise.resolve({ data: newApp, error: null });
    }
  })
};