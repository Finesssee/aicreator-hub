import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useSession, signOut } from '@/lib/auth-client';
import { Plus, User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface NavigationProps {
  showCreateButton?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ showCreateButton = true }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: session, isPending } = useSession();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

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
          
          <Link 
            to="/my-space" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === '/my-space' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            My Space
          </Link>
          
          <div className="flex items-center space-x-2">
            {isPending ? (
              <div className="h-8 w-8 animate-pulse bg-muted rounded-full" />
            ) : session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {session.user?.name?.charAt(0)?.toUpperCase() || <User className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{session.user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session.user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/my-space')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>My Space</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/auth')}
                >
                  Log in
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => navigate('/auth')}
                >
                  Sign up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};