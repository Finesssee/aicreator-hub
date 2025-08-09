import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SEOWrapper } from '@/components/seo/SEOWrapper';
import { Navigation } from '@/components/layout/Navigation';
import { Search, Copy, Rocket, Star } from 'lucide-react';
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
        <Navigation />
        
        {/* Hero Section */}
        <main>
          <section className="py-20 px-4">
            <div className="container mx-auto text-center">
              <div className="max-w-4xl mx-auto gradient-hero rounded-3xl p-12 soft-shadow">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
                  Build AI Apps by AI Apps
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                  Browse, Clone, and Deploy in One Click
                </p>
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

          {/* How it Works */}
          <section className="py-16 px-4 bg-muted/30">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">How it Works</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {steps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <step.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
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