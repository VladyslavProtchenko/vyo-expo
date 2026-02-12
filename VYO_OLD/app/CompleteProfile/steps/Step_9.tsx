import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ButtonGradient from '../../_components/ui/ButtonGradient';
import useProfileStore from '../../_store/useProfileStore';
import { typography } from '../../../styles/globalStyles';
import Number from '../../_components/ui/Number';
import Calendar from '../../_components/Calendar';
import { useSaveProfile } from '../../_hooks/useProfileData';

const surgeries = [
  'Pelvis',
  'Lower abdomen',
  'None of these',
]
const otherSymptomsLabels = [
  'Fatigue',
  'Sleep disturbance',
  'Low energy',
  'Infertility',
  'Mood swings',
  'Depression',
  'Enlarged uterus',
  'Abnormal uterine bleeding',
]

export default function Step9({ goNext }: { goNext: () => void }) {
  const { setValue, surgery, surgeryDate, otherSymptoms, isDiagnosed } = useProfileStore()
  const [surgeryState, setSurgeryState] = useState<string>(surgery)
  const [surgeryDateState, setSurgeryDateState] = useState<string>(surgeryDate)
  const [otherSymptomsState, setOtherSymptomsState] = useState<string[]>(otherSymptoms)

  const selectTag = (tag: string, isActive: boolean) => {
    isActive
      ? setOtherSymptomsState(otherSymptomsState.filter(item => item !== tag))
      : setOtherSymptomsState([...otherSymptomsState, tag])
  }
  
  const next = async () => {
    if(isDiagnosed) {
    setValue(surgeryState, 'surgery')
      setValue(surgeryDateState, 'surgeryDate')
      setValue(otherSymptomsState, 'otherSymptoms')
    } else {
      setValue(otherSymptomsState, 'otherSymptoms')
    }

    const result = await saveProfileData()
    
    if (result.success) {
      console.log('✅ Onboarding completed and data saved');
      goNext()
    } else {
      console.error('❌ Failed to save profile data:', result.error);
    }
  }
  return (
    <View style={styles.container}>
      <Number number="10" />
      {isDiagnosed ? <>
        <Text style={[typography.h1, { marginBottom: 32} ]}>Did you have a surgery?</Text>
        <Text style={typography.subtitle}>Select all relevant</Text>

        <View style={styles.tagsContainer}>
          {surgeries.map(item => {  
            const isActive = surgeryState === item
            return (
              <Pressable key={item} onPress={() => setSurgeryState(item)}>
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
        <Text style={typography.subtitle}>When it happened?</Text>
        <Calendar
          title="Select date"
          value={surgeryDateState}
          setValue={setSurgeryDateState}
        />

        <View style={styles.buttonContainer}>
          <ButtonGradient
            disabled={surgeryState === '' || surgeryDateState === ''}
            title="Get my care plan"
            icon={(<MaterialIcons color={surgeryState === '' || surgeryDateState === '' ? '#999999' : '#000000'} name="trending-flat" size={28} />)}
            onPress={next}
          />
        </View>
      </>
      : <>
        <Text style={[typography.h1, { marginBottom: 32} ]}>Other symptoms</Text>
        <Text style={typography.subtitle}>Select all you’re experiencing</Text>

        <View style={styles.tagsContainer}>
          {otherSymptomsLabels.map(item => {  
            const isActive = otherSymptomsState.find(i => i === item) ? true : false;
            return (
              <Pressable key={item} onPress={() => selectTag(item, isActive)}>
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
            disabled={otherSymptomsState.length === 0}
            title="Get my care plan"
            icon={(<MaterialIcons color={otherSymptomsState.length === 0 ? '#999999' : '#000000'} name="trending-flat" size={28} />)}
            onPress={next}
          />
        </View>
      </>}
    </View>
  )
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