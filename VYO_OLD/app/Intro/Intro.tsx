import { View, Text, Image, ImageBackground, StyleSheet } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ButtonGradient from '../_components/ui/ButtonGradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../_types/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen({ navigation }: Props) {

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../../assets/images/preview.png')} 
        resizeMode="cover" 
        style={styles.backgroundImage}
      >
        {/* <Steps isWhite={true} /> */}
        <View style={styles.contentContainer}>
          <View>
            <Text style={styles.title}>VYO</Text>
            <Text style={styles.subtitle}>
              help women rewrite their <Text style={styles.highlightedText}>health</Text> life 💛
            </Text>
          </View>

          <View style={styles.bottomSection}>
            <Text style={styles.name}>Victoria, 28</Text>
            <Text style={styles.role}>Inclusive model, mentor</Text>

            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map(i => (
                <Image 
                  key={i} 
                  source={require('../../assets/images/Star.png')} 
                  style={styles.star} 
                />
              ))}
            </View>
            <Text style={styles.testimonial}>
              Heavy period pain often kept me in bed for days stealing my time and energy.
            </Text>
            <Text style={styles.testimonialSmall}>
              With these protocols, I'm rewriting my story—healing a little more every day and reclaiming my life.
            </Text>

            <ButtonGradient
              title="Next"
              icon={(<MaterialIcons name="trending-flat" size={28} color="black" />)}
              onPress={() => navigation.navigate('CompleteProfile')}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    paddingTop: 160,
  },
  contentContainer: {
    padding: 24,
    width: '100%',
    justifyContent: 'space-between',
    flex: 1,
  },
  title: {
    fontFamily: 'Archivo Black',
    color: 'white',
    fontSize: 36,
    lineHeight: 36,
    width: '100%',
    marginBottom: 16, // mb-4 equivalent
  },
  subtitle: {
    fontFamily: 'Archivo Black',
    color: 'white',
    fontSize: 20,
    width: '66%', 
  },
  highlightedText: {
    color: '#ecf7b5',
    textDecorationLine: 'line-through',
  },
  bottomSection: {
    marginTop: 'auto',
    marginBottom: 50,
  },
  name: {
    fontFamily: 'Archivo Black',
    color: 'white',
    fontSize: 20,
    width: '66%', // w-2/3 equivalent
  },
  role: {
    color: 'white',
    fontFamily: 'Geologica',
    opacity: 0.6,
    marginBottom: 4, // mb-1 equivalent
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 8, // gap-2 equivalent
    marginBottom: 24, // mb-6 equivalent
  },
  star: {
    width: 24, // size-6 equivalent
    height: 24,
  },
  testimonial: {
    fontFamily: 'Geologica',
    color: 'white',
    fontSize: 16,
    marginBottom: 8, // mb-2 equivalent
  },
  testimonialSmall: {
    fontFamily: 'Geologica',
    color: 'white',
    fontSize: 12,
    fontWeight: '300', // font-thin equivalent
    opacity: 0.6,
    marginBottom: 50,
  },
});