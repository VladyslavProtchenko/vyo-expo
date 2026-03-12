import { Image, StyleSheet, Text, View } from 'react-native';

export default function Slide3() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.imagesColumn}>
          <Image source={require('@/assets/images/care-plan/how-3-1.webp')} style={styles.photo} resizeMode="cover" />
          <Image source={require('@/assets/images/care-plan/how-3-2.webp')} style={styles.photo} resizeMode="cover" />
          <Image source={require('@/assets/images/care-plan/how-3-3.webp')} style={styles.photo} resizeMode="cover" />
        </View>
        <View style={styles.textColumn}>
          <Text style={styles.title}>Daily list</Text>
          <Text style={styles.description}>
            {'you receive science-based recommendations for '}
            <Text style={styles.highlight}>nutrition</Text>
            {', '}
            <Text style={styles.highlight}>physical activity</Text>
            {' and '}
            <Text style={styles.highlight}>stress management</Text>
            {'.'}
          </Text>
          <Text style={styles.description2}>
            {"All designed to balance hormones and ease pain\u00A0\u2013 in sync with your body\u2019s natural rhythm."}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021F11',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  imagesColumn: {
    gap: 12,
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 16,
  },
  textColumn: {
    flex: 1,
    gap: 12,
    paddingTop: 8,
  },
  title: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 32,
    lineHeight: 36,
    color: '#ffffff',
    paddingBottom: 12,
  },
  description: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.5,
    color: '#ffffff',
  },
  highlight: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 24,
    color: '#5DDA9D',
  },
  description2: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.5,
    color: '#ffffff',
  },
});
