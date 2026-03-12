import { Image, StyleSheet, Text, View } from 'react-native';


const description = "This isn\u2019t a generic diet.\nIt\u2019s an evidence-based personal care plan built around your cycle phase, symptoms, and diagnoses.";

export default function Slide2() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your plan, built around you</Text>
      <View style={styles.content}>
        <View style={styles.imageWrapper}>
          <Image
            source={require('@/assets/images/care-plan/how-2.webp')}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.description}>
          {description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021F11',
  },
  imageWrapper: {
    width: 269,
    height: 269,
    borderRadius: 16,
    overflow: 'hidden',
    alignSelf: 'flex-start',
    marginLeft: -16,
  },
  image: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 400,
    height: 269,
    transform: [{ scaleX: -1 }],
  },
  content: {
    position: 'absolute',
    paddingHorizontal: 16,
    right: 16,
    top: "25%",
    flexDirection: 'column',
    alignItems: 'center',
    gap: 36,
  },
  title: {
    position: 'absolute',
    top: '20%',
    paddingHorizontal: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 40,
    lineHeight: 44,
    color: '#ffffff',
    zIndex: 1,
  },
  description: {
    fontFamily: 'Poppins',
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.5,
    color: '#ffffff',
    width: 200,
  },
});
