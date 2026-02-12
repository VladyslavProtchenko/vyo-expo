import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { Platform } from 'react-native';
import { supabase } from '../_config/supabase';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentSession = supabase.auth.session();
    setSession(currentSession);
    setUser(currentSession?.user ?? null);
    setLoading(false);

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return { user, session, loading };
};

export const useSignIn = () => {
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log('🔵 [Auth] Sign in request:', { email, url: 'https://mtdxajnzoabnozlhzbyc.supabase.co/auth/v1/token' });
      
      const { user, session, error } = await supabase.auth.signIn({ email, password });

      if (error) {
        console.error('❌ [Auth] Sign in API error:', { 
          message: error.message, 
          status: error.status,
          name: error.name,
          error 
        });
        throw error;
      }

      console.log('✅ [Auth] Sign in successful:', user?.email);
      return { success: true, data: { user, session } };
    } catch (error: any) {
      console.error('❌ [Auth] Sign in exception:', { 
        message: error.message,
        name: error.name,
        stack: error.stack,
        error 
      });
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { signIn, loading };
};

export const useSignUp = () => {
  const [loading, setLoading] = useState(false);

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log('🔵 [Auth] Sign up request:', { email, url: 'https://mtdxajnzoabnozlhzbyc.supabase.co/auth/v1/signup' });
      
      const { user, session, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        console.error('❌ [Auth] Sign up API error:', { 
          message: error.message, 
          status: error.status,
          name: error.name,
          error 
        });
        throw error;
      }

      console.log('✅ [Auth] Sign up successful:', user?.email);
      return { success: true, data: { user, session } };
    } catch (error: any) {
      console.error('❌ [Auth] Sign up exception:', { 
        message: error.message,
        name: error.name,
        stack: error.stack,
        error 
      });
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { signUp, loading };
};

export const useResetPassword = () => {
  const [loading, setLoading] = useState(false);

  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.api.resetPasswordForEmail(email);

      if (error) throw error;

      console.log('✅ [Auth] Reset password email sent');
      return { success: true };
    } catch (error: any) {
      console.error('❌ [Auth] Reset password failed:', { message: error.message, error });
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword, loading };
};

export const useSignOut = () => {
  const [loading, setLoading] = useState(false);

  const signOut = async () => {
    try {
      setLoading(true);
      
      try {
        await GoogleSignin.signOut();
      } catch (googleErr) {
        console.log('Google sign out skipped');
      }
      
      const { error } = await supabase.auth.signOut();
     
      if (error) throw error;
     
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { signOut, loading };
};

export const useGoogleSignIn = () => {
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      console.log('🔄 Starting Google sign in...');

      if (Platform.OS === 'android') {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      }

      const response = await GoogleSignin.signIn();

      if (response.type !== 'success') {
        console.error('❌ [Google] Sign in cancelled');
        return { success: false, error: 'Sign in was cancelled' };
      }

      const user = response.data.user;
      
      if (!user) {
        console.error('❌ [Google] No user data in response');
        return { success: false, error: 'No user data received from Google' };
      }

      console.log('✅ [Google] Sign in successful:', user.email);
      return { success: true, data: { user } };
    } catch (err: any) {
      console.error('❌ [Google] Sign in failed:', { message: err.message, code: err.code, err });
      return { success: false, error: err.message || 'Google sign in failed' };
    } finally {
      setLoading(false);
    }
  };

  return { signInWithGoogle, loading };
};
