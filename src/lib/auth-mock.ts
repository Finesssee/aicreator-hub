// Mock authentication for development
// Replace with real BetterAuth implementation in production

interface User {
  id: string;
  email: string;
  name: string;
}

interface Session {
  user: User;
  token: string;
}

class MockAuth {
  private users: Map<string, { password: string; user: User }> = new Map();
  private sessions: Map<string, Session> = new Map();
  private currentSession: Session | null = null;

  constructor() {
    // Check localStorage for existing session
    const storedSession = localStorage.getItem('auth_session');
    if (storedSession) {
      try {
        this.currentSession = JSON.parse(storedSession);
      } catch (e) {
        console.error('Failed to parse stored session');
      }
    }
  }

  async signUp(email: string, password: string, name: string) {
    if (this.users.has(email)) {
      return { error: { message: 'User already exists' } };
    }

    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
    };

    this.users.set(email, { password, user });
    
    // Auto sign in after signup
    return this.signIn(email, password);
  }

  async signIn(email: string, password: string) {
    const userData = this.users.get(email);
    
    // For demo, accept any email/password combination
    if (!userData) {
      // Create user on the fly for demo
      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
      };
      this.users.set(email, { password, user });
      const session: Session = {
        user,
        token: Math.random().toString(36),
      };
      this.currentSession = session;
      localStorage.setItem('auth_session', JSON.stringify(session));
      return { data: session, error: null };
    }

    if (userData.password !== password) {
      return { error: { message: 'Invalid password' } };
    }

    const session: Session = {
      user: userData.user,
      token: Math.random().toString(36),
    };

    this.sessions.set(session.token, session);
    this.currentSession = session;
    localStorage.setItem('auth_session', JSON.stringify(session));

    return { data: session, error: null };
  }

  async signOut() {
    this.currentSession = null;
    localStorage.removeItem('auth_session');
    return { error: null };
  }

  getSession() {
    return this.currentSession;
  }
}

const mockAuth = new MockAuth();

export const signIn = {
  email: async ({ email, password }: { email: string; password: string }) => {
    return mockAuth.signIn(email, password);
  },
};

export const signUp = {
  email: async ({ email, password, name }: { email: string; password: string; name: string }) => {
    return mockAuth.signUp(email, password, name);
  },
};

export const signOut = async () => {
  return mockAuth.signOut();
};

export const useSession = () => {
  const session = mockAuth.getSession();
  return {
    data: session,
    isPending: false,
  };
};