import { useEffect, useState } from "react";

// BetterAuth client configuration
const AUTH_BASE_URL = import.meta.env.VITE_AUTH_URL || "http://localhost:5001";

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
}

export interface AuthSession {
  user: AuthUser;
  token?: string;
}

export interface AuthError {
  message: string;
}

export interface AuthResponse {
  user?: AuthUser;
  token?: string;
  error?: AuthError;
}

// Helper function to make auth requests
async function authFetch<TResponse>(endpoint: string, options: RequestInit = {}): Promise<TResponse> {
  const url = `${AUTH_BASE_URL}/api/auth${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
  });

  const data = (await response.json().catch(() => null)) as TResponse | null;

  if (!response.ok) {
    const message = (data as { message?: string } | null)?.message || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return (data as TResponse) ?? ({} as TResponse);
}

// Store for current session
let currentSession: AuthSession | null = null;
const sessionListeners = new Set<(session: AuthSession | null) => void>();

// Function to update session and notify listeners
function updateSession(session: AuthSession | null): void {
  currentSession = session;
  sessionListeners.forEach(listener => listener(session));
}

// Export auth methods
export const signIn = {
  email: async ({ email, password }: { email: string; password: string }): Promise<AuthResponse> => {
    try {
      const data = await authFetch<AuthResponse>('/sign-in/email', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (data.user) {
        updateSession({ user: data.user, token: data.token });
      }

      return data;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to sign in";
      return { error: { message } };
    }
  },
};

export const signUp = {
  email: async ({ email, password, name }: { email: string; password: string; name: string }): Promise<AuthResponse> => {
    try {
      const data = await authFetch<AuthResponse>('/sign-up/email', {
        method: 'POST',
        body: JSON.stringify({ email, password, name }),
      });

      if (data.user) {
        updateSession({ user: data.user, token: data.token });
      }

      return data;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to sign up";
      return { error: { message } };
    }
  },
};

export const signOut = async (): Promise<{ error: AuthError | null }> => {
  try {
    await authFetch<null>('/sign-out', {
      method: 'POST',
    });

    updateSession(null);

    return { error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to sign out";
    return { error: { message } };
  }
};

// Function to get current session
async function getSession(): Promise<AuthSession | null> {
  try {
    const data = await authFetch<AuthSession>('/session', {
      method: 'GET',
    });
    return data;
  } catch {
    return null;
  }
}

// Custom hook for session management
export const useSession = (): { data: AuthSession | null; isPending: boolean } => {
  const [session, setSession] = useState<AuthSession | null>(currentSession);
  const [isPending, setIsPending] = useState<boolean>(true);

  useEffect(() => {
    sessionListeners.add(setSession);

    if (!currentSession) {
      getSession()
        .then((data) => {
          updateSession(data);
          setIsPending(false);
        })
        .catch(() => {
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