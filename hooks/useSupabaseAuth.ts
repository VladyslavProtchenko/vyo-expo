import { supabase } from '@/config/supabase';
import { markManualSignOut } from '@/utils/authSessionEvents';
import { Session, User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, session, loading };
};

export const useSignIn = () => {
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: { user: data.user, session: data.session } };
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
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, data: { user: data.user, session: data.session } };
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

  const sendOTP = async (email: string) => {
    try {
      setLoading(true);
      // Use signInWithOtp to send OTP code (not magic link)
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
        }
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to send code' };
    } finally {
      setLoading(false);
    }
  };

  return { sendOTP, loading };
};

export const useVerifyOTP = () => {
  const [loading, setLoading] = useState(false);

  const verifyCode = async (email: string, token: string) => {
    try {
      setLoading(true);
      
      // Verify the OTP token (this will authenticate the user)
      const { error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'email',
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Verification failed' };
    } finally {
      setLoading(false);
    }
  };

  return { verifyCode, loading };
};

export const useUpdatePassword = () => {
  const [loading, setLoading] = useState(false);

  const updatePassword = async (newPassword: string) => {
    try {
      setLoading(true);
      
      // Update the password (user must be authenticated after OTP verification)
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        return { success: false, error: error.message };
      }

      // Sign out after password change to force re-login
      markManualSignOut();
      await supabase.auth.signOut();

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Password update failed' };
    } finally {
      setLoading(false);
    }
  };

  return { updatePassword, loading };
};

export const useVerifyOTPAndUpdatePassword = () => {
  const [loading, setLoading] = useState(false);

  const verifyAndUpdate = async (email: string, token: string, newPassword: string) => {
    try {
      setLoading(true);
      
      // Verify the OTP token for password recovery
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'recovery', // Changed from 'email' to 'recovery'
      });

      if (verifyError) {
        return { success: false, error: verifyError.message };
      }

      // After successful OTP verification, update the password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (updateError) {
        return { success: false, error: updateError.message };
      }

      // Sign out after password change to force re-login
      markManualSignOut();
      await supabase.auth.signOut();

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Password update failed' };
    } finally {
      setLoading(false);
    }
  };

  return { verifyAndUpdate, loading };
};

export const useSignOut = () => {
  const [loading, setLoading] = useState(false);

  const signOut = async () => {
    try {
      setLoading(true);
      markManualSignOut();
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
