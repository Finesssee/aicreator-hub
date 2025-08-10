import React, { createContext, useContext, ReactNode } from 'react';
import { useSession } from '@/lib/auth-client';
import type { AuthSession } from '@/lib/auth-client';

interface AuthContextType {
  session: AuthSession | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data: session, isPending } = useSession();
  
  const value = {
    session,
    isLoading: isPending,
    isAuthenticated: !!session,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};