import { useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { supabase } from '../_config/supabase';

// Configure Google Sign-In
// TODO: Replace with your iOS Client ID from Google Cloud Console
const IOS_CLIENT_ID = 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com';

GoogleSignin.configure({
  iosClientId: IOS_CLIENT_ID,
  offlineAccess: false,
});

export const useGoogleSignIn = () => {
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);

      // Check if device supports Google Play
      await GoogleSignin.hasPlayServices();

      // Get user info
      const userInfo = await GoogleSignin.signIn();

      if (userInfo.data?.idToken) {
        // Sign in to Supabase with Google ID token
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: userInfo.data.idToken,
        });

        if (error) {
          return { success: false, error: error.message };
        }

        return { success: true, data };
      }

      return { success: false, error: 'No ID token received' };
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      return { success: false, error: error.message || 'Google Sign-In failed' };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      await supabase.auth.signOut();
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  return { signInWithGoogle, signOut, loading };
};

