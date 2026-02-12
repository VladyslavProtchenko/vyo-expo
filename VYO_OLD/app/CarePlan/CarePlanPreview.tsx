import { View, Text, ImageBackground, StyleSheet, Image } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { typography } from '../../styles/globalStyles';
import { RootStackParamList } from '../_types/types';
import ButtonGradient from '../_components/ui/ButtonGradient';
type Props = NativeStackScreenProps<RootStackParamList, 'CarePlanPreview'>;

export default function CarePlanPreview({ navigation }: Props) {


    return (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <View style={styles.bottomCoverWrapper}>
              <Image
                source={require('../../assets/images/care-plan.webp')}
                style={styles.bottomCoverImage}
                resizeMode="cover"
              />
            </View>
          </View>
          <View style={styles.content}>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={[typography.h1, styles.title]}>Thank you for sharing!</Text>
                <Image source={require('../../assets/images/Yellow.png')} style={styles.cardHeaderImage} />

              </View>
              <Text style={[typography.p, { marginBottom: 8 }]}>Your symptoms may indicate secondary dysmenorrhea, sometimes linked to conditions like endometriosis. Please talk to you gynecologist for clarity.</Text>
              <Text style={[typography.p]}>Remember — you’re not alone in this. We’re here to support you through the pain, and your personalized care plan is just one click away.</Text>
            </View>
            <View style={styles.card}>
              <Image source={require('../../assets/images/icons/pinkChem.png')} style={styles.pink} />
              <Text style={[typography.h1, styles.title, { marginBottom: 8 }]}>Backed by science</Text>
              <Text style={[typography.p]}>The plan is science-based, built on modern protocols, and validated by medical experts</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}> 
            <ButtonGradient
              title='Jump right in'
              onPress={() => navigation.navigate('Home')}
              icon={<MaterialIcons name='arrow-forward' size={24} color='black' />}
            />
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    imageContainer: {
        flex: 0.5,
        width: '100%',
        position: 'relative',
    },
    bottomCoverWrapper: {
      overflow: 'hidden', 
      justifyContent: 'flex-end', 
    },
    
    bottomCoverImage: {
      width: '100%',
      height: '150%',
    },

    content: {
        flex: 0.7,
        gap: 12,
        paddingHorizontal: 16, // px-4
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        transform: [{ translateY: -80 }],
        
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16, // mb-4
    },
    cardHeaderImage: {
        width: 45,
        height: 45,
    },
    title: {
        fontSize: 24,
        width: '70%',
        lineHeight: 24,
    },
    pink:{
      width: 34,
      height: 34,
      marginBottom: 12,
    },
    buttonContainer: {
      paddingHorizontal: 16,
      marginBottom: 24,
    },

});