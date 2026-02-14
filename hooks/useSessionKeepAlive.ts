import { supabase } from '@/config/supabase';
import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';

/**
 * Hook to keep user session alive while app is active
 * Refreshes token every 50 minutes if user is active
 */
export const useSessionKeepAlive = () => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    // Start refresh interval
    startRefreshInterval();

    // Listen to app state changes
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      stopRefreshInterval();
      subscription.remove();
    };
  }, []);

  const startRefreshInterval = () => {
    // Refresh token every 50 minutes (before 60 min expiry)
    intervalRef.current = setInterval(async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          console.log('🔄 Refreshing session token...');
          const { data, error } = await supabase.auth.refreshSession();
          
          if (error) {
            console.error('❌ Failed to refresh session:', error);
          } else {
            console.log('✅ Session refreshed successfully');
          }
        }
      } catch (error) {
        console.error('❌ Error refreshing session:', error);
      }
    }, 50 * 60 * 1000); // 50 minutes
  };

  const stopRefreshInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    // App went to background
    if (appState.current.match(/active/) && nextAppState.match(/inactive|background/)) {
      console.log('📴 App went to background - pausing refresh');
      stopRefreshInterval();
    }

    // App came to foreground
    if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      console.log('📱 App came to foreground - resuming refresh');
      startRefreshInterval();
      
      // Immediately check and refresh if needed
      refreshSessionIfNeeded();
    }

    appState.current = nextAppState;
  };

  const refreshSessionIfNeeded = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        // Check if token is about to expire (within 5 minutes)
        const expiresAt = session.expires_at || 0;
        const now = Math.floor(Date.now() / 1000);
        const timeUntilExpiry = expiresAt - now;

        if (timeUntilExpiry < 5 * 60) {
          console.log('⚠️ Token expiring soon, refreshing...');
          await supabase.auth.refreshSession();
        }
      }
    } catch (error) {
      console.error('❌ Error checking session:', error);
    }
  };
};
