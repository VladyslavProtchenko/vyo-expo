import React, { useState } from 'react'
import { ScrollView, StyleSheet, View, Text, Pressable } from 'react-native'
import { MoveLeft } from 'lucide-react-native'
import { typography } from '../../styles/globalStyles'
import CustomSwitch from '../_components/ui/CustomSwitch'
import PainCard from './components/PainCard'
import SurgeryCaseCard from './components/SurgeryCaseCard'
import ButtonGradient from '../_components/ui/ButtonGradient'

export default function SymptomsPage({navigation}: {navigation: any}) {

  const [isPeriod, setIsPeriod] = useState(true)
  const [feeling, setFeeling] = useState<string>('')
  const [discharge, setDischarge] = useState<string>('')
  const [energy, setEnergy] = useState<string>('')

  const handleBack = () => {
    navigation.goBack()
  }
  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <Pressable onPress={handleBack} style={{flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <MoveLeft size={30} color="black" />
        <Text style={typography.title}>Log period data</Text>
      </Pressable>
      <View style={{gap: 16, marginBottom: 100}}>
        <View style={[typography.card]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{fontFamily:"Poppins", fontSize: 16, fontWeight: '600'}}>Period</Text>
            <CustomSwitch value={isPeriod} onValueChange={setIsPeriod} />
          </View>
        </View>
        <PainCard />


        <View style={[typography.card]}>
          <Text style={{fontFamily:"Poppins", fontSize: 16, fontWeight: '600'}}>I am feeling today:</Text>
          <View style={styles.tagsContainer}>
            {feelingItems.map(item => {  
              const isActive = feeling === item
              return (
                <Pressable key={item} onPress={() => setFeeling(item)}>
                  <Text
                    style={[
                      typography.p,
                      styles.tag,
                      isActive ? styles.tagActive : styles.tagInactive
                    ]}
                  >{item}</Text>
                </Pressable>
              )
            })}
          </View>
        </View>

        <View style={[typography.card]}>
          <Text style={{fontFamily:"Poppins", fontSize: 16, fontWeight: '600'}}>Vaginal discharge:</Text>
          <View style={styles.tagsContainer}>
            {dischargeItems.map(item => {  
              const isActive = discharge === item
              return (
                <Pressable key={item} onPress={() => setDischarge(item)}>
                  <Text
                    style={[
                      typography.p,
                      styles.tag,
                      isActive ? styles.tagActive : styles.tagInactive
                    ]}
                  >{item}</Text>
                </Pressable>
              )
            })}
          </View>
        </View>


        <View style={[typography.card]}>
          <Text style={{fontFamily:"Poppins", fontSize: 16, fontWeight: '600'}}>I have energy today:</Text>
          <View style={styles.tagsContainer}>
            {energyItems.map(item => {  
              const isActive = energy === item
              return (
                <Pressable key={item} onPress={() => setEnergy(item)}>
                  <Text
                    style={[
                      typography.p,
                      styles.tag,
                      isActive ? styles.tagActive : styles.tagInactive
                    ]}
                  >{item}</Text>
                </Pressable>
              )
            })}
          </View>
        </View>
        <SurgeryCaseCard />
        <ButtonGradient
          className={{ marginTop: 16 }}
          title="Save"
          onPress={() => navigation.navigate('SymptomsSuccess')}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    paddingVertical: 75,
    paddingHorizontal: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10, // gap-2.5
    paddingVertical: 12, // py-3
  },
  tag: {
    paddingHorizontal: 16, // px-4
    paddingVertical: 10, // py-2.5
    borderWidth: 1,
    borderRadius: 24, // rounded-full
    borderColor: '#E7E8ED', // border-gray-400
  },
  tagActive: {
    backgroundColor: '#FEF08A', // bg-yellow-200
  },
  tagInactive: {
    backgroundColor: 'transparent',
  },
});



const feelingItems = [
  '😌 Calm',
  '🧐 Focused',
  '😞 Down',
  '😣 Tense',
  '☺️ Joyful',
  '🥺 Vulnerable',
  'Hard to say',
]

const dischargeItems = [
  'Clear/Watery',
  'White/Milky',
  'Thick white',
  'Yellow or green',
  'Thin, grayish',
  'Gray with fishy odor',
]

const energyItems = [
  'Enough for daily tasks',
  'Inspired to act',
  'Slightly exhausted',
  'Very exhausted',
  'Hard to say',
]