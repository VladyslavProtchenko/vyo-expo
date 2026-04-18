import StoriesModal from '@/app/(tabs)/components/StoriesModal';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { CurrentPhaseInfo, PhaseName } from '@/store/phase';
import useUserStore from '@/store/useUserStore';
import { MENSTRUAL_STORIES } from './nutrition-normal/SlidesMenstrual';
import { FOLLICULAR_STORIES } from './nutrition-normal/SlidesFollicular';
import { OVULATION_STORIES } from './nutrition-normal/SlidesOvulation';
import { LUTEAL_STORIES } from './nutrition-normal/SlidesLuteal';
import { MENSTRUAL_STORIES_ENDO } from './nutrition-endo/SlidesMenstrual';
import { FOLLICULAR_STORIES_ENDO } from './nutrition-endo/SlidesFollicular';
import { OVULATION_STORIES_ENDO } from './nutrition-endo/SlidesOvulation';
import { LUTEAL_STORIES_ENDO } from './nutrition-endo/SlidesLuteal';
import { STORAGE_URL } from '@/config/supabase'

const STORIES_NORMAL: Record<PhaseName, any[]> = {
  menstrual: MENSTRUAL_STORIES,
  follicular: FOLLICULAR_STORIES,
  ovulation: OVULATION_STORIES,
  luteal: LUTEAL_STORIES,
};

const STORIES_ENDO: Record<PhaseName, any[]> = {
  menstrual: MENSTRUAL_STORIES_ENDO,
  follicular: FOLLICULAR_STORIES_ENDO,
  ovulation: OVULATION_STORIES_ENDO,
  luteal: LUTEAL_STORIES_ENDO,
};

export default function FoodStoryCard() {
  const [visible, setVisible] = useState(false);
  const { phaseName } = CurrentPhaseInfo();
  const diagnosis = useUserStore((s) => s.diagnosis);
  const isEndo = diagnosis !== null && diagnosis !== 'normal';
  const stories = isEndo ? STORIES_ENDO[phaseName] : STORIES_NORMAL[phaseName];

  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)} activeOpacity={0.9}>
        <ImageBackground
          source={{ uri: `${STORAGE_URL}/content/phases/stories-1.webp` }}
          style={styles.card}
          imageStyle={styles.cardImage}
        >
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <Text style={styles.title}>Food during your period</Text>
        </ImageBackground>
      </TouchableOpacity>
      <StoriesModal stories={stories} visible={visible} onClose={() => setVisible(false)} />
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
