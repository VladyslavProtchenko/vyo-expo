import { bodyCareArticles } from '@/constants/bodyCareArticles';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';

export default function Recommendations() {
  const router = useRouter();

  return (
    <>
      <Text style={styles.title}>Recommended body care for today</Text>
      <View style={{ height: 150 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {bodyCareArticles.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.card, { marginRight: index < bodyCareArticles.length - 1 ? 12 : 0 }]}
              onPress={() => router.push({ pathname: '/body-care-article', params: { id: item.id } } as any)}
              activeOpacity={0.9}
            >
              <Image source={{ uri: item.image }} style={styles.image} contentFit="cover" />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={StyleSheet.absoluteFill}
              />
              <View style={styles.overlay}>
                <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.cardTime}>{item.time} min</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'ArchivoBlack-Regular',
    fontSize: 24,
    marginBottom: 12,
    marginTop: 24,
  },
  card: {
    width: 150,
    height: 150,
    borderRadius: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  cardTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 14 * 1.2,
    color: 'white',
  },
  cardTime: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: 'white',
    marginTop: 2,
  },
});
