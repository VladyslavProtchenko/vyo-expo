import { View, Text, ImageBackground, Pressable, StyleSheet, Image } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../_types/types';
import ButtonRounded from '../_components/ui/ButtonRounded';
import { typography } from '../../styles/globalStyles';
import ButtonGradient from '../_components/ui/ButtonGradient';
import { MaterialIcons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'SyncData'>;

export default function SyncData({ navigation }: Props) {

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../../assets/images/sync.png')} 
        resizeMode="cover" 
        style={styles.backgroundImage}
      >
        <View style={styles.content}>
        <Image source={require('../../assets/images/health.png')} style={styles.image} />
          <Text style={[typography.h1, styles.title]}>Sync data from wearable devices?</Text>
          <Text style={[typography.p, styles.text]}>If you are using a wearable device that shares fitness data with Apple Health, VYO can access that data and provide additional insights and analytics.</Text>
          
          <View style={styles.buttonContainer}>
            <ButtonGradient
              title='Allow Access'
              onPress={() => navigation.navigate('CarePlanPreview')}
              icon={(<MaterialIcons color={'#000000'} name="arrow-forward" size={26} />)}
            />
            <ButtonRounded
              type='shadow'
              title='I accept'
              onPress={() => navigation.navigate('CarePlanPreview')}
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
  },
  backgroundImage: {
    flex: 1, // h-full
    width: '100%', // w-full
    alignItems: 'center',
    paddingTop: 160, // pt-40
  },
  content: {
    paddingVertical: 40, // py-10
    paddingHorizontal: 16, // px-4
    width: '100%',
    justifyContent: 'flex-end',
    flex: 1,
  },
  title: {
    color: 'white',
    marginBottom: 8, // mb-4
  },
  text: {
    color: 'white',
    marginBottom: 12, // mb-3
  },
  linkText: {
    color: 'white',
    textDecorationLine: 'underline',
    fontWeight: '600',
    marginBottom: 40, // mb-10
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 40,
    gap: 12,
  }
});