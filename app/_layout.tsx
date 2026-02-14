import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import Toast, { ErrorToast, ToastConfig } from 'react-native-toast-message';

import { SessionProvider, useSession } from '@/contexts/session';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useSessionKeepAlive } from '@/hooks/useSessionKeepAlive';

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

const toastConfig: ToastConfig = {
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftWidth: 0,
        borderRadius: 12,
        backgroundColor: '#111827',
        minHeight: 64,
      }}
      text1Style={{
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '700',
      }}
      text2Style={{
        color: '#E5E7EB',
        fontSize: 13,
      }}
    />
  ),
};

const publicScreens = [
  'index',
  'login',
  'email-login',
  'email-registration',
  'email-reset-password',
  'new-password',
] as const;

const protectedScreens = [
  '(tabs)',
  'modal',
  'symptoms',
  'symptoms-success',
  'calendar',
  'care-plan-preview',
  'complete-profile',
  'onboarding',
  'sync-data',
  'privacy',
  'video-screen',
  'article-screen',
  'body-care',
  'category-page',
  'stress-management',
  'products',
  'welcome',
  'youtube-screen',
  'physiotherapy',
  'intro',
] as const;

export default function RootLayout() {
  const colorScheme = useColorScheme();
  useSessionKeepAlive();

  const [fontsLoaded, fontError] = useFonts({
    'ArchivoBlack-Regular': require('@/assets/fonts/ArchivoBlack-Regular.ttf'),
    'Poppins': require('@/assets/fonts/Poppins/Poppins-Regular.ttf'),
    'Poppins-Medium': require('@/assets/fonts/Poppins/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('@/assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('@/assets/fonts/Poppins/Poppins-Bold.ttf'),
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <SessionProvider>
          <RootNavigator fontsLoaded={fontsLoaded} fontError={fontError} />
        </SessionProvider>
        <StatusBar style="auto" />
        <Toast config={toastConfig} topOffset={64} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

type RootNavigatorProps = {
  fontsLoaded: boolean;
  fontError: Error | null;
};

function RootNavigator({ fontsLoaded, fontError }: RootNavigatorProps) {
  const { session, isLoading } = useSession();

  useEffect(() => {
    if ((fontsLoaded || fontError) && !isLoading) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, isLoading]);

  if ((!fontsLoaded && !fontError) || isLoading) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Protected guard={!session}>
        {publicScreens.map((name) => (
          <Stack.Screen key={name} name={name} />
        ))}
      </Stack.Protected>

      <Stack.Protected guard={!!session}>
        {protectedScreens.map((name) => (
          <Stack.Screen key={name} name={name} />
        ))}
      </Stack.Protected>
    </Stack>
  );
}
