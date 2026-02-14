import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useSessionKeepAlive } from '@/hooks/useSessionKeepAlive';

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

export default function RootLayout() {  const colorScheme = useColorScheme();
  useSessionKeepAlive();
  
  const [fontsLoaded, fontError] = useFonts({
    'ArchivoBlack-Regular': require('@/assets/fonts/ArchivoBlack-Regular.ttf'),
    'Poppins': require('@/assets/fonts/Poppins/Poppins-Regular.ttf'),
    'Poppins-Medium': require('@/assets/fonts/Poppins/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('@/assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('@/assets/fonts/Poppins/Poppins-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const screens = [
    'symptoms',
    'symptoms-success',
    'calendar',
    'login',
    'email-login',
    'email-registration',
    'email-reset-password',
    'care-plan-preview',
    'complete-profile',
    'onboarding',
    'sync-data',
    'privacy',
    'new-password',
    'video-screen',
    'article-screen',
    'body-care',
    'category-page',
    'stress-management',
    'products',
    'products-settings',
    'products-all',
    'products-deleted',
    'welcome',
    'youtube-screen',
    'physiotherapy',
    'intro',
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          {screens.map((name) => <Stack.Screen key={name} name={name as any} />)}
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
