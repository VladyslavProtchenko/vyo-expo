import useStoriesStore from '@/store/useStoriesStore';
import { STORAGE_URL } from '@/config/supabase';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { Story } from '../../StoriesModal';
import Slide1 from './slides/Slide1';
import Slide2 from './slides/Slide2';
import Slide3 from './slides/Slide3';
import Slide4 from './slides/Slide4';
import Slide5 from './slides/Slide5';

const STORIES: Story[] = [
  { id: 1, render: () => <Slide1 /> },
  { id: 2, render: () => <Slide2 /> },
  { id: 3, render: () => <Slide3 /> },
  { id: 4, render: () => <Slide4 /> },
  { id: 5, render: () => <Slide5 /> },
];

export default function HowToImplementCard({ isGray }: { isGray?: boolean }) {
  const open = useStoriesStore((s) => s.open);

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: isGray ? '#F5F5F5' : 'white' }]}
      onPress={() => open(STORIES)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: `${STORAGE_URL}/content/care-plan/info-2.webp` }} style={styles.icon} />
      <View style={styles.bottom}>
        <Text style={styles.title}>How to implement?</Text>
        <Text style={styles.description}>Step-by-step implementation of your plan</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 24,
    overflow: 'hidden',
    width: 150,
    height: 170,
    justifyContent: 'space-between',
  },
  icon: {
    width: 34,
    height: 34,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  description: {
    fontSize: 12,
  },
  bottom: {
    gap: 2,
  },
  slideText: {
    fontSize: 28,
    fontWeight: '600',
  },
});
