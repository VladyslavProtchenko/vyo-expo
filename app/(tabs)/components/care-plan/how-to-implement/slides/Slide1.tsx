import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { STORAGE_URL } from '@/config/supabase'

const { width } = Dimensions.get('screen');

export default function Slide1() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `${STORAGE_URL}/content/care-plan/how-1.webp` }}
        style={styles.image}
        contentFit="cover"
      />
      <Text style={styles.title}>How does it work?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  image: {
    width,
    height: '100%',
  },
  title: {
    position: 'absolute',
    top: "30%",
    left: 16,
    fontFamily: 'ArchivoBlack',
    fontSize: 48,
    fontWeight: '900',
    
    color: '#ffffff',
  },
});
