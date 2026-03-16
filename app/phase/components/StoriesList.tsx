import { ScrollView, StyleSheet } from 'react-native';
import ExerciseStoryCard from './stories/ExerciseStoryCard';
import FoodStoryCard from './stories/FoodStoryCard';
import SleepStoryCard from './stories/SleepStoryCard';

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
