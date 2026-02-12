import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ButtonGradient from '../../_components/ui/ButtonGradient';
import useProfileStore from '../../_store/useProfileStore';
import { typography } from '../../../styles/globalStyles';
import Number from '../../_components/ui/Number';
import { PAIN_PERIODS, PAIN_LOCATIONS, PAIN_DURATIONS, PainPeriodType, PainLocationType, PainDurationType } from '../../_types/diagnosis';

export default function Step6({   goNext }: { goNext: () => void }) {
  const { setValue, painPeriod, painLocation, painDuration } = useProfileStore()
  const [painPeriodState, setPainPeriodState] = useState<PainPeriodType | ''>(painPeriod as PainPeriodType || '')
  const [painLocationState, setPainLocationState] = useState<PainLocationType[]>(
    Array.isArray(painLocation) ? painLocation as PainLocationType[] : []
  )
  const [painDurationState, setPainDurationState] = useState<PainDurationType | ''>(painDuration as PainDurationType || '')
  
  const selectPainLocation = (location: PainLocationType, isActive: boolean) => {
    isActive
      ? setPainLocationState(painLocationState.filter(item => item !== location))
      : setPainLocationState([...painLocationState, location])
  }

  const next = () => {
    setValue(painPeriodState, 'painPeriod')
    setValue(painLocationState, 'painLocation')
    setValue(painDurationState, 'painDuration')
    goNext()
  }


  return (
    <View style={styles.container}>
      <Number number="7" />
      <Text style={[typography.h1, { marginBottom: 32} ]}>Your pain details</Text>
      <Text style={typography.subtitle}>When do you feel the pain?</Text>

      <View style={styles.tagsContainer}>
        {PAIN_PERIODS.map(item => {  
          const isActive = painPeriodState === item
          return (
            <Pressable key={item} onPress={() => setPainPeriodState(item)}>
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

    <Text style={[typography.subtitle]}>Where do you feel the pain?</Text>
    <View style={styles.tagsContainer}>
      {PAIN_LOCATIONS.map(item => {  
        const isActive = painLocationState.find(i => i === item) ? true : false;
        return (
          <Pressable key={item} onPress={() => selectPainLocation(item, isActive)}>
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
    <Text style={[typography.subtitle]}>How long does the pain last?</Text>
    <View style={styles.tagsContainer}>
      {PAIN_DURATIONS.map(item => {  
        const isActive = painDurationState === item
        return (
          <Pressable key={item} onPress={() => setPainDurationState(item)}>
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
      <View style={styles.buttonContainer}>
        <ButtonGradient
          disabled={painPeriodState === '' || painLocationState.length === 0 || painDurationState === ''}
          title="Next"
          icon={(<MaterialIcons color={painPeriodState === '' || painLocationState.length === 0 || painDurationState === 'Few hours' ? '#999999' : '#000000'} name="trending-flat" size={28} />)}
          onPress={next}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    paddingHorizontal: 16, // p-6
  },

  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10, // gap-2.5
    paddingVertical: 12, // py-3
    marginBottom: 32, // mb-8
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
  buttonContainer: {
    marginTop: 'auto', // mt-6
    marginBottom: 40, // mb-10
  },
});