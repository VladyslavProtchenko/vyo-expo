import { useNutritionStories } from '@/hooks/useNutritionStories';
import useStoriesStore from '@/store/useStoriesStore';
import { STORAGE_URL } from '@/config/supabase';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function FoodStoryCard() {
  const { stories } = useNutritionStories();
  const open = useStoriesStore((s) => s.open);

  return (
    <TouchableOpacity onPress={() => open(stories)} activeOpacity={0.9}>
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
