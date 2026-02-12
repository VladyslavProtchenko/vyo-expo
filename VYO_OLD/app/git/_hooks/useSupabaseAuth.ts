import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../_config/supabase';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    setLoading(false);

    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription?.unsubscribe();
  }, []);

  return { user, session, loading };
};

export const useSignIn = () => {
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { user, session, error } = await supabase.auth.signIn({ email, password });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: { user, session } };
    } catch (err: any) {
      return { success: false, error: err.message || 'Login failed' };
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
      const { user, session, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: { user, session } };
    } catch (err: any) {
      return { success: false, error: err.message || 'Registration failed' };
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

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Reset failed' };
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
      const { error } = await supabase.auth.signOut();
     
      if (error) {
        return { success: false, error: error.message };
      }
     
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Logout failed' };
    } finally {
      setLoading(false);
    }
  };

  return { signOut, loading };
};
