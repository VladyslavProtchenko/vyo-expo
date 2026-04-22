import ButtonRounded from '@/components/ui/ButtonRounded';
import { CurrentPhaseInfo } from '@/store/phase';
import useUserStore from '@/store/useUserStore';
import { useRouter } from 'expo-router';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { STORAGE_URL } from '@/config/supabase'

const phaseBackgroundColors = {
  menstrual: '#FFCED1',
  follicular: '#E0CEFF',
  ovulation: '#CEE6FF',
  luteal: '#FFBD8A',
};

const phaseImages = {
  menstrual: `${STORAGE_URL}/content/home-page/girl-1.webp`,
  follicular: `${STORAGE_URL}/content/home-page/girl-2.webp`,
  ovulation: `${STORAGE_URL}/content/home-page/girl-3.webp`,
  luteal: `${STORAGE_URL}/content/home-page/girl-4.webp`,
};

export default function SkipPoster({ style }: { style?: StyleProp<ViewStyle> }) {
  const router = useRouter();
  const { phaseName } = CurrentPhaseInfo();
  const { lastCompletedQuizStep } = useUserStore();

  const backgroundColor = phaseBackgroundColors[phaseName as keyof typeof phaseBackgroundColors];
  const image = phaseImages[phaseName as keyof typeof phaseImages];
  
  const nextStep = lastCompletedQuizStep || 1;

  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Make your care truly yours.</Text>
        <Text style={styles.subtitle}>Complete the questionnaire and unlock your personalized Care Plan.</Text>
        <ButtonRounded
          title="Complete now"
          type="black"
          onPress={() => router.push(`/onboarding/step-${nextStep}` as any)}
          className={styles.customButton}
          textStyle={styles.buttonText}
        />
      </View>
      <Image source={{ uri: image }} style={styles.image} contentFit="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    padding: 16,
    position: 'relative',
    overflow: 'hidden',
    minHeight: 126,
  },
  textContainer: {
    flex: 1,
    width: '70%',
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 11,
    marginBottom: 12,
  },

  customButton: {
    borderRadius: 36,
    height: 36,
    minHeight: 36,
    paddingHorizontal: 22,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  buttonText: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 14,
  },
  image: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 136,
    height: 126,
  },
});
