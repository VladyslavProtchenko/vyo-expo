import { useNutritionStories } from '@/hooks/useNutritionStories';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = { onPress: () => void };

export default function NutritionArticleCard({ onPress }: Props) {
  const { t } = useTranslation();
  const { articleCardData } = useNutritionStories();
  const { image, titleKey, timeKey } = articleCardData;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={image} style={styles.image} resizeMode="cover" />
      <View style={styles.content}>
        <Text style={styles.title}>{t(titleKey)}</Text>
        <Text style={styles.time}>{t(timeKey)}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 12,
    gap: 12,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 12,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontFamily: 'ArchivoBlack-Regular',
    fontSize: 16,
    lineHeight: 16 * 1.2,
    color: '#021F11',
  },
  time: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 13,
    color: '#666666',
  },
  chevron: {
    fontSize: 24,
    color: '#021F11',
  },
});
