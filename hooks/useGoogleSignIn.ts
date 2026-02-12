import { supabase } from '@/config/supabase';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';

// Завершаем сессию браузера после авторизации
WebBrowser.maybeCompleteAuthSession();

// Google OAuth configuration
const GOOGLE_WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || '799139253430-0ncoilm7ulsothv9patucqmb3evurqtg.apps.googleusercontent.com';

export const useGoogleSignIn = () => {
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      console.log('🔄 Starting Google sign in with Expo AuthSession...');

      // Создаем redirect URI для Expo
      const redirectUri = AuthSession.makeRedirectUri({
        scheme: 'com.vyo',
        path: 'auth/callback',
      });

      console.log('Redirect URI:', redirectUri);

      // Создаем URL для авторизации Google
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams({
        client_id: GOOGLE_WEB_CLIENT_ID,
        redirect_uri: redirectUri,
        response_type: 'id_token',
        scope: 'openid email profile',
        nonce: Math.random().toString(36).substring(7),
      })}`;

      // Открываем браузер для авторизации
      const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);

      if (result.type === 'success' && result.url) {
        // Извлекаем id_token из URL
        const url = new URL(result.url);
        const params = new URLSearchParams(url.hash.substring(1));
        const idToken = params.get('id_token');

        if (idToken) {
          // Авторизуемся в Supabase с помощью Google ID token
          const { data, error } = await supabase.auth.signInWithIdToken({
            provider: 'google',
            token: idToken,
          });

          if (error) {
            console.error('❌ [Supabase] Google sign in error:', error);
            return { success: false, error: error.message };
          }

          console.log('✅ [Google] Sign in successful');
          return { success: true, data: { user: data.user, session: data.session } };
        }

        return { success: false, error: 'No ID token received' };
      }

      if (result.type === 'cancel') {
        console.log('❌ [Google] Sign in cancelled by user');
        return { success: false, error: 'Sign in was cancelled' };
      }

      return { success: false, error: 'Authentication failed' };
    } catch (err: any) {
      console.error('❌ [Google] Sign in failed:', { message: err.message, err });
      return { success: false, error: err.message || 'Google sign in failed' };
    } finally {
      setLoading(false);
    }
  };

  return { signInWithGoogle, loading };
};
