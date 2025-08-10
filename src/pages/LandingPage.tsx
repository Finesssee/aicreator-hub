import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SEOWrapper } from '@/components/seo/SEOWrapper';
import { Navigation } from '@/components/layout/Navigation';
import { Search, Copy, Rocket, Star, ArrowRight } from 'lucide-react';
import { IndustryAppCard } from '@/components/ui/industry-app-card';
import { Input } from '@/components/ui/input';
import { mixedApps } from '@/data/mixedApps';
import sarahImg from '@/assets/testimonial-sarah.jpg';
import alexImg from '@/assets/testimonial-alex.jpg';
import mayaImg from '@/assets/testimonial-maya.jpg';

const LandingPage: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO, Startup X",
      image: sarahImg,
      quote: "This hub completely changed how we launch AI prototypes. From idea to deployment in minutes."
    },
    {
      name: "Alex Rodriguez",
      role: "Indie Developer",
      image: alexImg,
      quote: "The one-click clone feature is incredible. I've built 5 AI apps this month using this platform."
    },
    {
      name: "Dr. Maya Patel",
      role: "AI Researcher",
      image: mayaImg,
      quote: "Finally, a place where I can share my research implementations and see them used by the community."
    }
  ];

  const steps = [
    {
      icon: Search,
      title: "Browse",
      description: "Search or filter AI apps by category, tech stack, and use case."
    },
    {
      icon: Copy,
      title: "Clone & Customize",
      description: "Modify instantly in Lovable or other tools with one click."
    },
    {
      icon: Rocket,
      title: "Deploy",
      description: "Launch with one click to connected platforms like Replicate."
    }
  ];

  return (
    <SEOWrapper>
      <div className="min-h-screen bg-background">
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">AI</span>
              </div>
              <span className="font-bold text-xl">AppHub</span>
            </Link>

            <div className="flex items-center space-x-4">
              <Link 
                to="/explore" 
                className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
              >
                Explore
              </Link>
            </div>
          </div>
        </div>
        
        {/* Hero Section */}
        <main>
          <section className="py-20 px-4">
            <div className="container mx-auto text-center">
              <div className="max-w-4xl mx-auto bg-background rounded-3xl p-12 shadow-sm border border-border/20">
                <h1 className="text-5xl md:text-6xl font-bold mb-8 text-foreground">
                  Build <em className="italic font-thin">AI Apps</em> by AI Apps
                </h1>
                <div className="max-w-2xl mx-auto mb-8">
                  <Input
                    placeholder="Describe the AI application you want to build..."
                    className="h-14 text-lg px-6 bg-white/90 backdrop-blur-sm border border-gray-200 shadow-sm"
                  />
                </div>
                <Button asChild size="lg" className="text-lg px-8 py-3">
                  <Link to="/explore">Explore All AI Apps</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-16 px-4">
            <div className="container mx-auto">
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="card-shadow hover-scale">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Trust indicators */}
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Star className="h-5 w-5 text-primary mr-2" />
                  <span className="text-lg font-medium">Join 5,000+ developers building faster</span>
                </div>
                <p className="text-muted-foreground">with our open-source AI app hub</p>
              </div>
            </div>
          </section>

          {/* Mixed Applications */}
          <section className="py-16 px-4 bg-muted/30">
            <div className="container mx-auto">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-3xl font-bold">AI Applications</h2>
                <Button variant="outline" asChild className="border border-gray-300 hover:border-primary hover:text-primary transition-colors">
                  <Link to="/explore">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    View All
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mixedApps.map((app) => (
                  <div key={app.id} className="relative">
                    <IndustryAppCard
                      app={app}
                      onPreview={(app) => console.log('Preview', app.name)}
                      onCustomize={(app) => console.log('Customize', app.name)}
                      onRunDeploy={(app) => console.log('Run/Deploy', app.name)}
                    />
                    {/* Industry badge */}
                    <div 
                      className={`absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-medium ${
                        app.category === 'Healthcare' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : app.category === 'Finance' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {app.category}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </SEOWrapper>
  );
};

export default LandingPage;