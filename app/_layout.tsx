import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import Toast, { ErrorToast, ToastConfig } from 'react-native-toast-message';

import '@/config/i18n';
import { supabase } from '@/config/supabase';
import { SessionProvider, useSession } from '@/contexts/session';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useSessionKeepAlive } from '@/hooks/useSessionKeepAlive';
import PainStep1 from '@/app/pain-steps/step-1';
import PhaseScreen from './phase';
import ShoppingList from './shopping-list';
import ShoppingListAdd from './shopping-list/add';
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
] as const;

const protectedScreens = [
  '(tabs)',
  'modal',
  'new-password',
  'symptoms',
  'symptoms-success',
  'calendar',
  'care-plan-preview',
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
  'phase',
] as const;

export default function RootLayout() {
  // return (
  //   <GestureHandlerRootView style={{ flex: 1 }}>
  //     <ShoppingListAdd />
  //   </GestureHandlerRootView>
  // );
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <SessionProvider>
              <RootNavigator fontsLoaded={fontsLoaded} fontError={fontError} />
            </SessionProvider>
            <StatusBar style="auto" />
            <Toast config={toastConfig} topOffset={64} />
          </ThemeProvider>
        </QueryClientProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}

type RootNavigatorProps = {
  fontsLoaded: boolean;
  fontError: Error | null;
};

function RootNavigator({ fontsLoaded, fontError }: RootNavigatorProps) {
  const { session, isLoading } = useSession();
  const segments = useSegments();
  const router = useRouter();
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean | null>(null);

  useEffect(() => {
    if ((fontsLoaded || fontError) && !isLoading) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, isLoading]);

  useEffect(() => {
    if (!session || isLoading) return;

    const checkOnboarding = async () => {
      const { data: profile } = await supabase
        .from('profiles')
        .select('onboarding_completed')
        .eq('id', session.user.id)
        .single();

      const completed = profile?.onboarding_completed ?? false;
      setOnboardingCompleted(completed);

      const inOnboarding = segments[0] === 'onboarding';
      const inPublicScreen = publicScreens.includes(segments[0] as any);
      const inPasswordReset = segments[0] === 'new-password';

      if (!completed && !inOnboarding && !inPublicScreen && !inPasswordReset) {
        router.replace('/onboarding/step-1' as any);
      }
    };

    checkOnboarding();
  }, [session, isLoading, segments]);

  if ((!fontsLoaded && !fontError) || isLoading || (session && onboardingCompleted === null)) {
    return null;
  }

  return (
    <Stack
      screenOptions={{ headerShown: false }}>
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
