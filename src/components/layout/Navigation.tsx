import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface NavigationProps {
  showCreateButton?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ showCreateButton = true }) => {
  // Use try-catch to handle Router context issues
  let location;
  try {
    location = useLocation();
  } catch {
    // Fallback when not in Router context
    location = { pathname: '/' };
  }

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
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
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === '/explore' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Explore
          </Link>
          
          <div className="flex items-center space-x-2">
            <Button variant="login" size="sm">
              Log in
            </Button>
            <Button variant="default" size="sm">
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};