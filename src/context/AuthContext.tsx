
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Define user type
export interface User {
  id: string;
  email: string;
  name?: string;
}

// Define the Auth context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if there's a logged-in user on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if there's a user in localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // In a real app, this would be an API call
      // Simulating API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Simple validation (in a real app, this would be server-side)
      if (email === 'demo@example.com' && password === 'password') {
        const userData: User = {
          id: '1',
          email: email,
          name: 'Demo User'
        };
        
        // Store user data
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        
        toast.success('Signed in successfully!');
        navigate('/dashboard');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Failed to sign in', { 
        description: error instanceof Error ? error.message : 'Please check your credentials' 
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign up function
  const signUp = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      
      // In a real app, this would be an API call
      // Simulating API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Create a new user (in a real app, this would save to a database)
      const userData: User = {
        id: Date.now().toString(),
        email,
        name
      };
      
      // Store user data
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to create account', { 
        description: error instanceof Error ? error.message : 'Please try again' 
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign out function
  const signOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.info('Signed out');
    navigate('/');
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create a hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
