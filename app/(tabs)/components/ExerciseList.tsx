import ButtonRounded from '@/components/ui/ButtonRounded';
import VideoCard from '@/components/ui/VideoCard';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

interface VideoItem {
  title: string;
  videoUrl: string;
}

interface Section {
  title: string;
  subtitle?: string;
  items: VideoItem[];
}

const MOCK_SECTIONS: Section[] = [
  {
    title: 'Pelvic floor exercises',
    items: [
      { title: 'Basics', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'Pelvic floor release', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    ],
  },
  {
    title: 'Yoga',
    subtitle: 'Physiotherapy',
    items: [
      { title: 'Calming yoga', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
      { title: 'Breath practice', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    ],
  },
];

export default function ExerciseList() {
  return (
    <View style={styles.container}>
      {MOCK_SECTIONS.map((section) => (
        <View key={section.title} style={styles.section}>
          <View style={styles.headerRow}>
            <View style={styles.titleWrap}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              {section.subtitle && <Text style={styles.subtitle}>{section.subtitle}</Text>}
            </View>
            <ButtonRounded
              className={{ width: 90, height: 36, minHeight: 0, borderRadius: 36, paddingHorizontal: 0, paddingVertical: 0 }}
              title="See all"
              onPress={() => {}}
            />
          </View>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={section.items}
            keyExtractor={(item) => item.title}
            contentContainerStyle={styles.scrollContent}
            renderItem={({ item }) => (
              <VideoCard
                videoUrl={item.videoUrl}
                title={item.title}
                style={styles.card}
              />
            )}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    gap: 24,
  },
  section: {
    gap: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingLeft: 40,
  },
  titleWrap: {
    flex: 1,
    marginRight: 12,
  },
  sectionTitle: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    color: '#404040',
  },
  scrollContent: {
    paddingLeft: 40,
    paddingRight: 16,
    gap: 8,
  },
  card: {
    width: 160,
    height: 120,
  },
});
