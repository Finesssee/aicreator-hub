import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AppCard, type App } from '@/components/ui/app-card';
import { FolderSection } from '@/components/ui/folder-section';
import { Share2, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

// Sample user applications
const clonedApps: App[] = [
  {
    id: 'user-1',
    slug: 'my-chatbot-custom',
    name: 'My Custom ChatBot',
    tagline: 'Personalized AI assistant with custom training',
    description: 'A customized version of ChatGPT clone with my own personality',
    category: 'Chat & Agents',
    techStack: ['React', 'TypeScript', 'OpenAI'],
    thumbnailUrl: '/src/assets/app-chatgpt-clone.jpg',
    createdAt: '2024-01-15',
    customizationCount: 12
  },
  {
    id: 'user-2',
    slug: 'my-image-gen',
    name: 'Personal Image Generator',
    tagline: 'Fine-tuned SDXL for my art style',
    description: 'Custom SDXL model trained on my preferred art styles',
    category: 'Image & Video',
    techStack: ['Python', 'SDXL', 'Gradio'],
    thumbnailUrl: '/src/assets/app-image-generator.jpg',
    createdAt: '2024-01-20',
    customizationCount: 8
  }
];

const originalApps: App[] = [
  {
    id: 'original-1',
    slug: 'voice-notes-app',
    name: 'Voice Notes AI',
    tagline: 'Convert voice memos to structured notes',
    description: 'AI-powered voice memo transcription and organization',
    category: 'Audio & Music',
    techStack: ['React', 'Whisper', 'GPT-4'],
    thumbnailUrl: '/src/assets/app-whisper.jpg',
    createdAt: '2024-02-01',
    customizationCount: 0
  }
];

export const MySpace: React.FC = () => {
  const [hoveredAppId, setHoveredAppId] = useState<string | null>(null);

  const handleShareApp = (app: App) => {
    toast.success(`${app.name} shared to community!`);
    // TODO: Implement actual sharing functionality
  };

  const handleOpenInLovable = (app: App) => {
    // Open in new tab
    window.open(`/edit/${app.slug}`, '_blank');
    toast.success(`Opening ${app.name} in Lovable`);
  };

  const handleAppAction = (action: string, app: App) => {
    if (action === 'Open in Lovable') {
      handleOpenInLovable(app);
    } else {
      toast.success(`${action} action for ${app.name}`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Cloned & Customized Apps */}
      <FolderSection title="Cloned & Customized">
        <div className="space-y-4">
          {clonedApps.map((app) => (
            <div
              key={app.id}
              className="relative"
              onMouseEnter={() => setHoveredAppId(app.id)}
              onMouseLeave={() => setHoveredAppId(null)}
            >
              <AppCard
                app={app}
                onPreview={(app) => handleAppAction('Preview', app)}
                onClone={(app) => handleAppAction('Clone', app)}
                onRun={(app) => handleAppAction('Run', app)}
                onOpenReplicate={(app) => handleAppAction('Open in Replicate', app)}
                onOpenLovable={handleOpenInLovable}
                onRemix={(app) => handleAppAction('Remix', app)}
                className="w-full"
              />
              
              {/* Share button on hover */}
              {hoveredAppId === app.id && (
                <div className="absolute top-2 left-2 z-20">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleShareApp(app)}
                    className="h-8 w-8 p-0 opacity-90 hover:opacity-100"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </FolderSection>

      {/* Original Apps */}
      <FolderSection title="My Original Apps">
        <div className="space-y-4">
          {originalApps.map((app) => (
            <div
              key={app.id}
              className="relative"
              onMouseEnter={() => setHoveredAppId(app.id)}
              onMouseLeave={() => setHoveredAppId(null)}
            >
              <AppCard
                app={app}
                onPreview={(app) => handleAppAction('Preview', app)}
                onClone={(app) => handleAppAction('Clone', app)}
                onRun={(app) => handleAppAction('Run', app)}
                onOpenReplicate={(app) => handleAppAction('Open in Replicate', app)}
                onOpenLovable={handleOpenInLovable}
                onRemix={(app) => handleAppAction('Remix', app)}
                className="w-full"
              />
              
              {/* Share button on hover */}
              {hoveredAppId === app.id && (
                <div className="absolute top-2 left-2 z-20">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleShareApp(app)}
                    className="h-8 w-8 p-0 opacity-90 hover:opacity-100"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          ))}
          
          {originalApps.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground text-sm">
                No original apps yet. Start creating!
              </p>
            </div>
          )}
        </div>
      </FolderSection>
    </div>
  );
};