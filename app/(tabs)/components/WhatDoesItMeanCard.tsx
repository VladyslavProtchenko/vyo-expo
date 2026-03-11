import { useGetDiagnosis } from '@/hooks/useDiagnosisData';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import StoriesModal, { Story } from './StoriesModal';

const diagnosisSubtitle: Record<string, string> = {
  dysmenorrhea: 'Primary dysmenorrhea',
  endometriosis: 'Possible endometriosis',
  pcos: 'Possible PCOS',
};

const STORIES: Story[] = [
  { id: 1, render: () => <Text style={styles.slideText}>Slide 1</Text> },
  { id: 2, render: () => <Text style={styles.slideText}>Slide 2</Text> },
  { id: 3, render: () => <Text style={styles.slideText}>Slide 3</Text> },
  { id: 4, render: () => <Text style={styles.slideText}>Slide 4</Text> },
  { id: 5, render: () => <Text style={styles.slideText}>Slide 5</Text> },
];

export default function WhatDoesItMeanCard({ isGray }: { isGray?: boolean }) {
  const [visible, setVisible] = useState(false);
  const { data: diagnosisData } = useGetDiagnosis();
  const description = diagnosisData?.diagnosis ? (diagnosisSubtitle[diagnosisData.diagnosis] ?? '') : '';

  return (
    <>
      <TouchableOpacity
        style={[styles.card, { backgroundColor: isGray ? '#F5F5F5' : 'white' }]}
        onPress={() => setVisible(true)}
        activeOpacity={0.7}
      >
        <Image source={require('@/assets/images/care-plan/info-1.webp')} style={styles.icon} />
        <View style={styles.bottom}>
          <Text style={styles.title}>What does it mean?</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </TouchableOpacity>
      <StoriesModal stories={STORIES} visible={visible} onClose={() => setVisible(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
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
