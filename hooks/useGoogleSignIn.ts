import { supabase } from '@/config/supabase';
import * as Sentry from '@sentry/react-native';
import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';
import Toast from 'react-native-toast-message';

// Завершаем сессию браузера после авторизации
WebBrowser.maybeCompleteAuthSession();

export const useGoogleSignIn = () => {
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      console.log('🔄 Starting Google sign in via Supabase...');

      // Используем custom scheme для возврата в приложение
      const redirectUrl = 'com.vyo://auth/callback';

      console.log('📍 Redirect URL:', redirectUrl);

      // Используем Supabase OAuth URL напрямую
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          skipBrowserRedirect: true, // Открываем вручную
        },
      });

      if (error) {
        Sentry.captureException(error, { tags: { action: 'google_sign_in' } });
        Toast.show({ type: 'error', text1: 'Google sign in failed', text2: error.message });
        return { success: false, error: error.message };
      }

      if (data?.url) {
        console.log('🌐 Opening Supabase OAuth URL...');
        
        // Открываем браузер с Supabase OAuth URL
        const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUrl);

        console.log('📥 Auth result:', result.type);

        if (result.type === 'success' && result.url) {
          console.log('🔐 Processing callback URL...');
          console.log('📦 Callback URL:', result.url);
          
          // Извлекаем параметры из URL
          const url = new URL(result.url);
          const accessToken = url.searchParams.get('access_token');
          const refreshToken = url.searchParams.get('refresh_token');
          
          // Или может быть в hash (для implicit flow)
          if (!accessToken && url.hash) {
            const hashParams = new URLSearchParams(url.hash.substring(1));
            const hashAccessToken = hashParams.get('access_token');
            const hashRefreshToken = hashParams.get('refresh_token');
            
            if (hashAccessToken) {
              console.log('✅ Found tokens in hash');
              const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
                access_token: hashAccessToken,
                refresh_token: hashRefreshToken || '',
              });
              
              if (sessionError) {
                Sentry.captureException(sessionError, { tags: { action: 'google_set_session' } });
                Toast.show({ type: 'error', text1: 'Google sign in failed', text2: sessionError.message });
                return { success: false, error: sessionError.message };
              }
              return { success: true, data: sessionData };
            }
          }

          if (accessToken) {
            const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken || '',
            });

            if (sessionError) {
              Sentry.captureException(sessionError, { tags: { action: 'google_set_session' } });
              Toast.show({ type: 'error', text1: 'Google sign in failed', text2: sessionError.message });
              return { success: false, error: sessionError.message };
            }
            return { success: true, data: sessionData };
          }

          Sentry.captureMessage('Google sign in: no tokens in callback URL', 'warning');
          return { success: false, error: 'No tokens received' };
        }

        if (result.type === 'cancel') {
          console.log('❌ [Google] Sign in cancelled by user');
          return { success: false, error: 'Sign in was cancelled' };
        }
      }

      return { success: false, error: 'Authentication failed' };
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
