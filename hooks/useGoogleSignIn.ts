import { supabase } from '@/config/supabase';
import * as Sentry from '@sentry/react-native';
import {
  GoogleSignin,
  isSuccessResponse,
} from '@react-native-google-signin/google-signin';
import { useState } from 'react';
import Toast from 'react-native-toast-message';

GoogleSignin.configure({
  webClientId: '799139253430-u0seaisu8db23lkrsj68q1rfeccepsjp.apps.googleusercontent.com',
});

export const useGoogleSignIn = () => {
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);

      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      if (!isSuccessResponse(response)) {
        return { success: false, error: 'Sign in was cancelled' };
      }

      const idToken = response.data.idToken;

      if (!idToken) {
        Sentry.captureMessage('Google sign in: no idToken received', 'warning');
        return { success: false, error: 'No ID token received' };
      }

      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: idToken,
      });

      if (error) {
        Sentry.captureException(error, { tags: { action: 'google_sign_in' } });
        Toast.show({ type: 'error', text1: 'Google sign in failed', text2: error.message });
        return { success: false, error: error.message };
      }

      Sentry.setUser({ id: data.user.id });
      Sentry.addBreadcrumb({ category: 'auth', message: 'Google sign in successful', level: 'info' });
      return { success: true, data };
    } catch (err: unknown) {
      Sentry.captureException(err, { tags: { action: 'google_sign_in' } });
      const message = err instanceof Error ? err.message : 'Google sign in failed';
      Toast.show({ type: 'error', text1: 'Google sign in failed', text2: message });
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  return { signInWithGoogle, loading };
};
