import { createAuthClient } from "better-auth/client";
import { useStore } from "better-auth/react";
import { useEffect, useState } from "react";

// Create the auth client
export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_AUTH_URL || "http://localhost:5001",
});

// Export auth methods
export const signIn = {
  email: async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await authClient.signIn.email({
        email,
        password,
      });
      return response;
    } catch (error: any) {
      return { error: { message: error.message || "Failed to sign in" } };
    }
  },
};

export const signUp = {
  email: async ({ email, password, name }: { email: string; password: string; name: string }) => {
    try {
      const response = await authClient.signUp.email({
        email,
        password,
        name,
      });
      return response;
    } catch (error: any) {
      return { error: { message: error.message || "Failed to sign up" } };
    }
  },
};

export const signOut = async () => {
  try {
    const response = await authClient.signOut();
    return response;
  } catch (error: any) {
    return { error: { message: error.message || "Failed to sign out" } };
  }
};

// Custom hook for session management
export const useSession = () => {
  const [session, setSession] = useState<any>(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    // Get initial session
    authClient.getSession().then((data) => {
      setSession(data);
      setIsPending(false);
    }).catch(() => {
      setIsPending(false);
    });

    // Subscribe to session changes
    const unsubscribe = authClient.subscribe((event) => {
      if (event === "session") {
        authClient.getSession().then((data) => {
          setSession(data);
        });
      }
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  return {
    data: session,
    isPending,
  };
};