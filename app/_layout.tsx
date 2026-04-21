import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
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
import StoriesModal from '@/app/(tabs)/components/StoriesModal';
import useStoriesStore from '@/store/useStoriesStore';
import * as Sentry from '@sentry/react-native';
import { AppColors } from '@/constants/theme';
import { supabase } from '@/config/supabase';

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  beforeSend: (event) => (__DEV__ ? null : event),
});
import { SessionProvider, useSession } from '@/contexts/session';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { checkStorageVersion } from '@/utils/storageVersion';

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

const toastConfig: ToastConfig = {
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftWidth: 0,
        borderRadius: 12,
        backgroundColor: AppColors.white,
        minHeight: 64,
        width: '92%',
      }}
      text1Style={{
        color: AppColors.error,
        fontSize: 14,
        fontWeight: '700',
      }}
      text2Style={{
        color: AppColors.error,
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
  'account-deleted',
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
  'body-care-article',
  'category-page',
  'stress-management',
  'products',
  'welcome',
  'youtube-screen',
  'physiotherapy',
  'phase',
  'nutrition-article',
] as const;

function GlobalStoriesModal() {
  const { stories, visible, close } = useStoriesStore();
  return <StoriesModal stories={stories} visible={visible} onClose={close} />;
}

function RootLayout() {
  const colorScheme = useColorScheme();
  const [storageReady, setStorageReady] = useState(false);
  // return <SyncData />
  useEffect(() => {
    checkStorageVersion().finally(() => setStorageReady(true));
  }, []);

  const [fontsLoaded, fontError] = useFonts({
    'ArchivoBlack-Regular': require('@/assets/fonts/ArchivoBlack-Regular.ttf'),
    'Geologica': require('@/assets/fonts/Geologica.ttf'),
    'Poppins': require('@/assets/fonts/Poppins/Poppins-Regular.ttf'),
    'Poppins-Medium': require('@/assets/fonts/Poppins/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('@/assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    'Poppins-SemiBoldItalic': require('@/assets/fonts/Poppins/Poppins-SemiBoldItalic.ttf'),
    'Poppins-Bold': require('@/assets/fonts/Poppins/Poppins-Bold.ttf'),
  });

  if (!storageReady) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <SessionProvider>
              <RootNavigator fontsLoaded={fontsLoaded} fontError={fontError} />
            </SessionProvider>
            <GlobalStoriesModal />
            <StatusBar style="auto" />
            <Toast config={toastConfig} position="top" topOffset={64} />
          </ThemeProvider>
        </QueryClientProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}

export default Sentry.wrap(RootLayout);

type RootNavigatorProps = {
  fontsLoaded: boolean;
  fontError: Error | null;
};

function RootNavigator({ fontsLoaded, fontError }: RootNavigatorProps) {
  const { session, isLoading } = useSession();
  const segments = useSegments();
  const router = useRouter();

  const { data: onboardingCompleted = null } = useQuery({
    queryKey: ['onboarding', session?.user.id],
    queryFn: async () => {
      const { data: profile } = await supabase
        .from('profiles')
        .select('onboarding_completed')
        .eq('id', session!.user.id)
        .single();
      return profile?.onboarding_completed ?? false;
    },
    enabled: !!session,
    staleTime: Infinity,
  });

  useEffect(() => {
    if ((fontsLoaded || fontError) && !isLoading) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, isLoading]);

  useEffect(() => {
    if (isLoading) return;
    if (!session) {
      const inPublicScreen = publicScreens.includes(segments[0] as any);
      if (!inPublicScreen) {
        router.replace('/');
      }
    }
  }, [session, isLoading, segments]);

  useEffect(() => {
    if (!session || isLoading || onboardingCompleted === null) return;

    const inOnboarding = segments[0] === 'onboarding';
    const inPublicScreen = publicScreens.includes(segments[0] as any);
    const inPasswordReset = segments[0] === 'new-password';

    if (!onboardingCompleted && !inOnboarding && !inPublicScreen && !inPasswordReset) {
      router.replace('/onboarding/step-1' as any);
    }
  }, [session, isLoading, onboardingCompleted, segments]);

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
