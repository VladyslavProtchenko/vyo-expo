import ButtonGradient from '@/components/ui/ButtonGradient';
import { typography } from '@/constants/typography';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SymptomsSuccess() {
  const router = useRouter();
  const fire1Ref = useRef<LottieView | null>(null);
  const fire2Ref = useRef<LottieView | null>(null);
  const fire3Ref = useRef<LottieView | null>(null);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      fire1Ref.current?.play();
    }, 0);

    const timer2 = setTimeout(() => {
      fire2Ref.current?.play();
    }, 300);

    const timer3 = setTimeout(() => {
      fire3Ref.current?.play();
    }, 600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        <LottieView source={require('@/assets/animations/fire.json')} autoPlay loop style={{ width: 300, height: 300 }} />
        <Text style={[typography.h1, { marginBottom: 16 }]}>Nice job!</Text>
        <Text style={[typography.p, { textAlign: 'center', marginBottom: 16 }]}>
          Your body speaks — and you're learning to hear it. Keep going!
        </Text>
        <View style={{ flexDirection: 'row', gap: 16, marginTop: 32 }}>
          <LottieView ref={fire1Ref} source={require('@/assets/animations/fire.json')} loop style={{ width: 50, height: 50 }} />
          <LottieView ref={fire2Ref} source={require('@/assets/animations/fire.json')} loop style={{ width: 50, height: 50 }} />
          <LottieView ref={fire3Ref} source={require('@/assets/animations/fire.json')} loop style={{ width: 50, height: 50 }} />
        </View>
        <Text style={{ textAlign: 'center', marginBottom: 32 }}>3 days streak</Text>
        <ButtonGradient title="Go Home" onPress={() => router.push('/(tabs)/home' as any)} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    padding: 16,
  },
});
