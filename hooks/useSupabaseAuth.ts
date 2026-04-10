import { supabase } from '@/config/supabase';
import { markManualSignOut } from '@/utils/authSessionEvents';
import * as Sentry from '@sentry/react-native';
import { useState } from 'react';

export const useSignIn = () => {
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      Sentry.addBreadcrumb({ category: 'auth', message: 'Sign in attempt', level: 'info' });

      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        Sentry.addBreadcrumb({ category: 'auth', message: `Sign in failed: ${error.message}`, level: 'warning' });
        return { success: false, error: error.message };
      }

      Sentry.setUser({ id: data.user.id });
      Sentry.addBreadcrumb({ category: 'auth', message: 'Sign in successful', level: 'info' });
      return { success: true, data: { user: data.user, session: data.session } };
    } catch (err: unknown) {
      Sentry.captureException(err, { tags: { action: 'sign_in' } });
      const message = err instanceof Error ? err.message : 'Login failed';
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  return { signIn, loading };
};

export const useSignUp = () => {
  const [loading, setLoading] = useState(false);

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      setLoading(true);
      Sentry.addBreadcrumb({ category: 'auth', message: 'Sign up attempt', level: 'info' });

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name: name || '' } },
      });

      if (error) {
        Sentry.addBreadcrumb({ category: 'auth', message: `Sign up failed: ${error.message}`, level: 'warning' });
        return { success: false, error: error.message };
      }

      if (data.user) {
        Sentry.setUser({ id: data.user.id });
      }
      Sentry.addBreadcrumb({ category: 'auth', message: 'Sign up successful', level: 'info' });
      return { success: true, data: { user: data.user, session: data.session } };
    } catch (err: unknown) {
      Sentry.captureException(err, { tags: { action: 'sign_up' } });
      const message = err instanceof Error ? err.message : 'Registration failed';
      return { success: false, error: message };
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
      Sentry.addBreadcrumb({ category: 'auth', message: 'OTP send attempt', level: 'info' });

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: false },
      });

      if (error) {
        Sentry.addBreadcrumb({ category: 'auth', message: `OTP send failed: ${error.message}`, level: 'warning' });
        return { success: false, error: error.message };
      }

      Sentry.addBreadcrumb({ category: 'auth', message: 'OTP sent successfully', level: 'info' });
      return { success: true };
    } catch (err: unknown) {
      Sentry.captureException(err, { tags: { action: 'send_otp' } });
      const message = err instanceof Error ? err.message : 'Failed to send code';
      return { success: false, error: message };
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
      Sentry.addBreadcrumb({ category: 'auth', message: 'OTP verify attempt', level: 'info' });

      const { error } = await supabase.auth.verifyOtp({ email, token, type: 'email' });

      if (error) {
        Sentry.addBreadcrumb({ category: 'auth', message: `OTP verify failed: ${error.message}`, level: 'warning' });
        return { success: false, error: error.message };
      }

      Sentry.addBreadcrumb({ category: 'auth', message: 'OTP verified successfully', level: 'info' });
      return { success: true };
    } catch (err: unknown) {
      Sentry.captureException(err, { tags: { action: 'verify_otp' } });
      const message = err instanceof Error ? err.message : 'Verification failed';
      return { success: false, error: message };
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
      Sentry.addBreadcrumb({ category: 'auth', message: 'Password update attempt', level: 'info' });

      const { error } = await supabase.auth.updateUser({ password: newPassword });

      if (error) {
        Sentry.addBreadcrumb({ category: 'auth', message: `Password update failed: ${error.message}`, level: 'warning' });
        return { success: false, error: error.message };
      }

      markManualSignOut();
      await supabase.auth.signOut();
      Sentry.setUser(null);
      Sentry.addBreadcrumb({ category: 'auth', message: 'Password updated, signed out', level: 'info' });
      return { success: true };
    } catch (err: unknown) {
      Sentry.captureException(err, { tags: { action: 'update_password' } });
      const message = err instanceof Error ? err.message : 'Password update failed';
      return { success: false, error: message };
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
      Sentry.addBreadcrumb({ category: 'auth', message: 'OTP verify + password update attempt', level: 'info' });

      const { error: verifyError } = await supabase.auth.verifyOtp({ email, token, type: 'recovery' });

      if (verifyError) {
        Sentry.addBreadcrumb({ category: 'auth', message: `OTP recovery verify failed: ${verifyError.message}`, level: 'warning' });
        return { success: false, error: verifyError.message };
      }

      const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });

      if (updateError) {
        Sentry.addBreadcrumb({ category: 'auth', message: `Password update after OTP failed: ${updateError.message}`, level: 'warning' });
        return { success: false, error: updateError.message };
      }

      markManualSignOut();
      await supabase.auth.signOut();
      Sentry.setUser(null);
      Sentry.addBreadcrumb({ category: 'auth', message: 'Password reset complete, signed out', level: 'info' });
      return { success: true };
    } catch (err: unknown) {
      Sentry.captureException(err, { tags: { action: 'verify_and_update_password' } });
      const message = err instanceof Error ? err.message : 'Password update failed';
      return { success: false, error: message };
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
      Sentry.addBreadcrumb({ category: 'auth', message: 'Sign out attempt', level: 'info' });

      const { error } = await supabase.auth.signOut();

      if (error) {
        Sentry.addBreadcrumb({ category: 'auth', message: `Sign out failed: ${error.message}`, level: 'warning' });
        return { success: false, error: error.message };
      }

      Sentry.setUser(null);
      Sentry.addBreadcrumb({ category: 'auth', message: 'Sign out successful', level: 'info' });
      return { success: true };
    } catch (err: unknown) {
      Sentry.captureException(err, { tags: { action: 'sign_out' } });
      const message = err instanceof Error ? err.message : 'Logout failed';
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  return { signOut, loading };
};
