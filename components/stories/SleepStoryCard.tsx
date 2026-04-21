import StoriesModal from '@/app/(tabs)/components/StoriesModal';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MENSTRUAL_STORIES } from './sleep/SlidesMenstrual';
import { OVULATION_STORIES } from './sleep/SlidesOvulation';
import { FOLICULAR_STORIES } from './sleep/SlidesFollicular';
import { LUTEAL_STORIES } from './sleep/SlidesLuteal';
import { CurrentPhaseInfo, PhaseName } from '@/store/phase';
import { STORAGE_URL } from '@/config/supabase'

const STORIES_BY_PHASE: Record<PhaseName, any[]> = {
  follicular: FOLICULAR_STORIES,
  luteal: LUTEAL_STORIES,
  menstrual: MENSTRUAL_STORIES,
  ovulation: OVULATION_STORIES,
};

export default function SleepStoryCard() {
  const [visible, setVisible] = useState(false);
  const { phaseName } = CurrentPhaseInfo();
  const stories = STORIES_BY_PHASE[phaseName];

  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)} activeOpacity={0.9}>
        <ImageBackground
          source={{ uri: `${STORAGE_URL}/content/phases/stories-3.webp` }}
          style={styles.card}
          imageStyle={styles.cardImage}
        >
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <Text style={styles.title}>Sleep & Stress guide</Text>
        </ImageBackground>
      </TouchableOpacity>
      <StoriesModal stories={OVULATION_STORIES} visible={visible} onClose={() => setVisible(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 170,
    justifyContent: 'flex-end',
    padding: 14,
    overflow: 'hidden',
    borderRadius: 20,
  },
  cardImage: {
    borderRadius: 20,
  },
  title: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 14,
    color: '#ffffff',
  },
});
