import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { STORAGE_URL } from '@/config/supabase'

export default function Slide4() {
  return (
    <ImageBackground
      source={{ uri: `${STORAGE_URL}/content/care-plan/how-4.webp` }}
      style={styles.container}
      imageStyle={styles.bgImage}
      resizeMode="cover"
    >
      <View style={styles.content}>
        <View style={styles.textBlock}>
          <Text style={styles.title}>Daily guidance</Text>
          <Text style={styles.description}>
            {'No extremes. No restriction.\nJust strategic support, backed by research.'}
          </Text>
        </View>
        <View style={styles.tags}>
          <View style={styles.tag}><Text style={styles.tagText}>simple</Text></View>
          <View style={styles.tag}><Text style={styles.tagText}>realistic</Text></View>
          <View style={styles.tag}><Text style={styles.tagText}>phase-specific</Text></View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  bgImage: {
    width: '220%',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 100,
    gap: 32,
  },
  textBlock: {
    gap: 12,
  },
  title: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 40,
    lineHeight: 44,
    color: '#ffffff',
  },
  description: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.5,
    color: '#ffffff',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tag: {
    backgroundColor: '#ffffff',
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
  tagText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: 24,
    lineHeight: 24,
    color: '#000000',
  },
});
