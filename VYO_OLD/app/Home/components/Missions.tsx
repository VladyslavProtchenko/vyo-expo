import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native'
import React, { useState }   from 'react'
import { typography } from '../../../styles/globalStyles'
import NutritionCard from './NutritionCard'
import BodyCareCard from './BodyCareCard'
import StressCard from './StressCard'

export default function Missions() {

  const [missions, setMissions] = useState({
    1: false,
    2: false,
    3: false,
  })
  const icons = {
    25: require('../../../assets/images/progress25.png'),
    50: require('../../../assets/images/progress50.png'),
    75: require('../../../assets/images/progress75.png'),
    100: require('../../../assets/images/progress100.png'),
  }
 


  const icon = icons[75];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[typography.h1, styles.title]}>Today’s Mission</Text>
        <Image source={icon as ImageSourcePropType} style={styles.titleIcon} />
      </View>

      <View style={{gap: 12}}>
        <NutritionCard 
          checked={missions[1 as keyof typeof missions]} 
          onPress={() => setMissions({...missions, 1: !missions[1 as keyof typeof missions]})} 
        />
        <BodyCareCard 
          checked={missions[2 as keyof typeof missions]} 
          onPress={() => setMissions({...missions, 2: !missions[2 as keyof typeof missions]})} 
        />
        <StressCard 
          checked={missions[3 as keyof typeof missions]} 
          onPress={() => setMissions({...missions, 3: !missions[3 as keyof typeof missions]})} 
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    width: '50%',
    lineHeight: 32,
    marginBottom: 16,
  },  
  titleIcon: {
    width: 60,
    height: 60,
  },
});