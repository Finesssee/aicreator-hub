import { useEffect, useState } from "react";

// BetterAuth client configuration
const AUTH_BASE_URL = import.meta.env.VITE_AUTH_URL || "http://localhost:5001";

// Helper function to make auth requests
async function authFetch(endpoint: string, options: RequestInit = {}) {
  const url = `${AUTH_BASE_URL}/api/auth${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include', // Important for cookies
  });
  
  const data = await response.json().catch(() => null);
  
  if (!response.ok) {
    throw new Error(data?.message || `Request failed with status ${response.status}`);
  }
  
  return data;
}

// Store for current session
let currentSession: any = null;
const sessionListeners = new Set<(session: any) => void>();

// Function to update session and notify listeners
function updateSession(session: any) {
  currentSession = session;
  sessionListeners.forEach(listener => listener(session));
}

// Export auth methods
export const signIn = {
  email: async ({ email, password }: { email: string; password: string }) => {
    try {
      const data = await authFetch('/sign-in/email', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      
      // Update session after successful login
      if (data.user) {
        updateSession({ user: data.user, token: data.token });
      }
      
      return data;
    } catch (error: any) {
      return { error: { message: error.message || "Failed to sign in" } };
    }
  },
};

export const signUp = {
  email: async ({ email, password, name }: { email: string; password: string; name: string }) => {
    try {
      const data = await authFetch('/sign-up/email', {
        method: 'POST',
        body: JSON.stringify({ email, password, name }),
      });
      
      // Update session after successful signup
      if (data.user) {
        updateSession({ user: data.user, token: data.token });
      }
      
      return data;
    } catch (error: any) {
      return { error: { message: error.message || "Failed to sign up" } };
    }
  },
};

export const signOut = async () => {
  try {
    await authFetch('/sign-out', {
      method: 'POST',
    });
    
    // Clear session after signout
    updateSession(null);
    
    return { error: null };
  } catch (error: any) {
    return { error: { message: error.message || "Failed to sign out" } };
  }
};

// Function to get current session
async function getSession() {
  try {
    const data = await authFetch('/session', {
      method: 'GET',
    });
    return data;
  } catch {
    return null;
  }
}

// Custom hook for session management
export const useSession = () => {
  const [session, setSession] = useState<any>(currentSession);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    // Subscribe to session changes
    sessionListeners.add(setSession);
    
    // Get initial session if not already loaded
    if (!currentSession) {
      getSession().then((data) => {
        updateSession(data);
        setIsPending(false);
      }).catch(() => {
        setIsPending(false);
      });
    } else {
      setIsPending(false);
    }

    return () => {
      sessionListeners.delete(setSession);
    };
  }, []);

  return {
    data: session,
    isPending,
  };
};