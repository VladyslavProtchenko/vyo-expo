import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('screen');

export default function Slide1() {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/care-plan/how-1.webp')}
        style={styles.image}
        resizeMode="cover"
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
