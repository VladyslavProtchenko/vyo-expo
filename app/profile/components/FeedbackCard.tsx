import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { STORAGE_URL } from '@/config/supabase'

export default function FeedbackCard() {
  const router = useRouter();

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.title}>Help us make this app better for you</Text>
        <Text style={styles.description}>
          Your experience matters. Share your feedback — it helps us make the app better for you.
        </Text>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => router.push('/profile/feedback' as any)}
        >
          <Text style={styles.buttonText}>Share feedback</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={{ uri: `${STORAGE_URL}/content/phases/figure-1.webp` }}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFDCDE',
    borderRadius: 24,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  description: {
    fontFamily: 'Poppins',
    fontSize: 13,
    fontWeight: '400',
    color: '#000',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 36,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  buttonText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  image: {
    position: 'absolute',
    width: 100,
    height: 100,
    bottom: -20,
    right: -15,
    transform: [{ rotate: '-60deg' }],
  },
});
