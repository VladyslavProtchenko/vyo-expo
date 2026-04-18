import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { STORAGE_URL } from '@/config/supabase'

export default function Slide5() {
  return (
    <ImageBackground
      source={{ uri: `${STORAGE_URL}/content/care-plan/how-4.webp` }}
      style={styles.container}
      imageStyle={styles.bgImage}
      resizeMode="cover"
    >
      <View style={styles.card}>
        <Text style={styles.title}>This becomes{'\n'}a lifestyle</Text>
        <Text style={styles.text}>
          {"It\u2019s not a 30-days challenge.\nNot a detox. Not a marathon."}
        </Text>
        <Text style={styles.text}>
          {"With time, you\u2019ll understand your body\u2019s signals.\nYou\u2019ll know when to nourish, when to slow down, when to push gently forward."}
        </Text>
        <Text style={styles.text}>
          {"And balance won\u2019t feel forced \u2014\nit will feel "}
          <Text style={styles.bold}>natural</Text>
          {"."}
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  bgImage: {
    width: '220%',
    left: '-100%',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    gap: 16,
    marginHorizontal: 16,
  },
  title: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 40,
    lineHeight: 44,
    color: '#000000',
  },
  text: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 22,
    color: '#000000',
  },
  bold: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 22,
    color: '#000000',
  },
});
