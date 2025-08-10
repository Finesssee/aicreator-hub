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
    tagline: 'Professional-grade AI image generation platform',
    description: 'Create stunning, high-resolution images from text descriptions using the latest Stable Diffusion XL model. Perfect for marketing campaigns, digital art, product mockups, and creative projects.',
    category: 'Image & Video',
    useCases: ['Image Generation', 'Digital Art', 'Marketing Assets', 'Product Design'],
    techStack: ['Python', 'PyTorch', 'Diffusers', 'Replicate'],
    license: 'MIT',
    thumbnailUrl: '/src/assets/app-sdxl.jpg',
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
    customizationCount: 2847
  },
  {
    id: '2',
    slug: 'gpt4-chat-assistant',
    name: 'GPT-4 Turbo Assistant',
    tagline: 'Advanced conversational AI for complex problem solving',
    description: 'Leverage the power of GPT-4 Turbo for sophisticated conversations, detailed analysis, creative writing, strategic planning, and complex reasoning tasks. Built with enterprise-grade security.',
    category: 'Chat & Agents',
    useCases: ['Content Creation', 'Research Analysis', 'Customer Support', 'Strategic Planning'],
    techStack: ['OpenAI API', 'Node.js', 'React', 'TypeScript'],
    license: 'MIT',
    thumbnailUrl: '/src/assets/app-gpt4.jpg',
    createdAt: '2024-01-14T15:30:00Z',
    customizationCount: 3156
  },
  {
    id: '3',
    slug: 'whisper-transcription',
    name: 'Whisper Pro Transcription',
    tagline: 'Enterprise speech-to-text with multi-language support',
    description: 'Convert audio and video files to accurate text transcriptions using OpenAI\'s Whisper model. Supports 99+ languages, speaker identification, and real-time processing for professional workflows.',
    category: 'Audio & Music',
    useCases: ['Meeting Transcription', 'Podcast Processing', 'Video Subtitles', 'Content Accessibility'],
    techStack: ['Python', 'OpenAI Whisper', 'FastAPI', 'Redis'],
    license: 'MIT',
    thumbnailUrl: '/src/assets/app-whisper.jpg',
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
    customizationCount: 1834
  },
  {
    id: '4',
    slug: 'code-llama-assistant',
    name: 'Code Llama Pro',
    tagline: 'Advanced AI coding companion for developers',
    description: 'Accelerate your development workflow with Meta\'s Code Llama model. Get intelligent code suggestions, bug fixes, refactoring help, and detailed explanations across 20+ programming languages.',
    category: 'Developer Tools & Automation',
    useCases: ['Code Generation', 'Bug Detection', 'Code Review', 'Documentation'],
    techStack: ['Python', 'Code Llama', 'Docker', 'VS Code Extension'],
    license: 'MIT',
    thumbnailUrl: '/src/assets/app-code-llama.jpg',
    createdAt: '2024-01-12T14:20:00Z',
    customizationCount: 1587
  },
  // Generate more realistic apps for pagination
  ...Array.from({ length: 44 }, (_, i) => {
    const appTypes = [
      { name: 'Voice Clone Studio', tagline: 'Create realistic voice clones with AI', category: 'Audio & Music', image: '/src/assets/app-music-ai.jpg' },
      { name: 'Smart Document Parser', tagline: 'Extract data from documents using AI', category: 'Text & Content', image: '/src/assets/app-text-analyzer.jpg' },
      { name: 'AI Video Editor', tagline: 'Automated video editing with machine learning', category: 'Image & Video', image: '/src/assets/app-video-editor.jpg' },
      { name: 'Sentiment Analyzer Pro', tagline: 'Real-time sentiment analysis for social media', category: 'Text & Content', image: '/src/assets/app-text-analyzer.jpg' },
      { name: 'Neural Style Transfer', tagline: 'Transform photos with artistic AI styles', category: 'Image & Video', image: '/src/assets/app-image-generator.jpg' },
      { name: 'AutoCode Generator', tagline: 'Generate production-ready code from descriptions', category: 'Developer Tools & Automation', image: '/src/assets/app-code-assistant.jpg' },
      { name: 'AI Music Composer', tagline: 'Create original music with artificial intelligence', category: 'Audio & Music', image: '/src/assets/app-music-ai.jpg' },
      { name: 'Smart Chatbot Builder', tagline: 'Build intelligent chatbots without coding', category: 'Chat & Agents', image: '/src/assets/app-chatgpt-clone.jpg' },
      { name: 'Photo Restoration AI', tagline: 'Restore old photos using advanced AI', category: 'Image & Video', image: '/src/assets/app-image-generator.jpg' },
      { name: 'Language Translator Plus', tagline: 'Multi-language translation with context awareness', category: 'Text & Content', image: '/src/assets/app-text-analyzer.jpg' },
      { name: 'AI Game Generator', tagline: 'Create simple games using AI assistance', category: 'Creative & Fun', image: '/src/assets/app-code-assistant.jpg' },
      { name: 'Smart Email Assistant', tagline: 'AI-powered email composition and management', category: 'Developer Tools & Automation', image: '/src/assets/app-code-assistant.jpg' }
    ];
    
    const appType = appTypes[i % appTypes.length];
    const techStacks = [
      ['Python', 'TensorFlow', 'Flask'],
      ['JavaScript', 'React', 'Node.js'],
      ['Python', 'PyTorch', 'FastAPI'],
      ['TypeScript', 'Next.js', 'Prisma'],
      ['Python', 'Scikit-learn', 'Django'],
      ['Go', 'Gin', 'PostgreSQL']
    ];
    
    return {
      id: `${i + 5}`,
      slug: `${appType.name.toLowerCase().replace(/\s+/g, '-')}-${i + 5}`,
      name: appType.name,
      tagline: appType.tagline,
      description: `Professional ${appType.name} powered by cutting-edge AI technology. Designed for businesses and creators who need reliable, scalable solutions with enterprise-grade performance and security.`,
      category: appType.category,
      useCases: ['AI Processing', 'Automation', 'Enterprise Solutions', 'Productivity'],
      techStack: techStacks[i % techStacks.length],
      license: 'MIT',
      thumbnailUrl: appType.image,
      createdAt: new Date(2024, 0, 12 - Math.floor(i / 10), 10 + (i % 12), i % 60).toISOString(),
      customizationCount: Math.floor(Math.random() * 2000) + 150
    };
  })
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