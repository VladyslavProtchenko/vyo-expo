import { ScrollView, StyleSheet } from 'react-native';
import ExerciseStoryCard from '@/components/stories/ExerciseStoryCard';
import FoodStoryCard from '@/components/stories/FoodStoryCard';
import SleepStoryCard from '@/components/stories/SleepStoryCard';

export default function StoriesList() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
    >
      <FoodStoryCard />
      <ExerciseStoryCard />
      <SleepStoryCard />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
