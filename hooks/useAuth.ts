import { supabase } from '@/config/supabase';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  userId: string | null;
}

export const useAuth = (requireAuth: boolean = true): AuthState => {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    userId: null,
  });

  useEffect(() => {
    checkAuth();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔐 Auth state changed:', event);
        
        if (event === 'SIGNED_OUT') {
          setAuthState({
            isAuthenticated: false,
            isLoading: false,
            userId: null,
          });
          if (requireAuth) {
            router.replace('/' as any);
          }
        } else if (event === 'SIGNED_IN' && session) {
          setAuthState({
            isAuthenticated: true,
            isLoading: false,
            userId: session.user.id,
          });
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [requireAuth]);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          userId: null,
        });
        
        if (requireAuth) {
          console.log('❌ Not authenticated - redirecting to login');
          router.replace('/' as any);
        }
        return;
      }

      setAuthState({
        isAuthenticated: true,
        isLoading: false,
        userId: session.user.id,
      });
    } catch (error) {
      console.error('❌ Error checking auth:', error);
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        userId: null,
      });
    }
  };

  return authState;
};

export const useRequireAuth = () => {
  return useAuth(true);
};

export const useOptionalAuth = () => {
  return useAuth(false);
};
