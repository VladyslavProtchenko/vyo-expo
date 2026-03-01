import { supabase } from '@/config/supabase';
import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';

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
        console.error('❌ [Supabase] Google sign in error:', error);
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
                console.error('❌ Session error:', sessionError);
                return { success: false, error: sessionError.message };
              }
              
              console.log('✅ [Google] Sign in successful!');
              return { success: true, data: sessionData };
            }
          }
          
          if (accessToken) {
            console.log('✅ Found tokens in query params');
            const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken || '',
            });
            
            if (sessionError) {
              console.error('❌ Session error:', sessionError);
              return { success: false, error: sessionError.message };
            }
            
            console.log('✅ [Google] Sign in successful!');
            return { success: true, data: sessionData };
          }
          
          console.error('❌ No tokens in callback URL');
          return { success: false, error: 'No tokens received' };
        }

        if (result.type === 'cancel') {
          console.log('❌ [Google] Sign in cancelled by user');
          return { success: false, error: 'Sign in was cancelled' };
        }
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
