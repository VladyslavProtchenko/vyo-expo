import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ButtonGradient from '../../_components/ui/ButtonGradient';
import useProfileStore from '../../_store/useProfileStore';
import { typography } from '../../../styles/globalStyles';
import Number from '../../_components/ui/Number';
import { PAIN_CASES, MEDICINE_EFFECTS, PainCaseType, MedicineEffectType } from '../../_types/diagnosis';

export default function Step7({ goNext }: { goNext: () => void }) {
  const { setValue, painCase, isMedicine } = useProfileStore()
  const [painCaseState, setPainCaseState] = useState<PainCaseType | ''>(painCase as PainCaseType || '')
  const [isMedicineState, setIsMedicineState] = useState<MedicineEffectType | ''>(isMedicine as MedicineEffectType || '')
  const next = () => {
    setValue(painCaseState, 'painCase')
    setValue(isMedicineState, 'isMedicine')
    goNext()
  }
  return (
    <View style={styles.container}>
      <Number number="8" />
      <Text style={[typography.h1, { marginBottom: 32} ]}>Your pain details</Text>
      <Text style={typography.subtitle}>Is the pain appearing during?</Text>

      <View style={styles.tagsContainer}>
        {PAIN_CASES.map(item => {  
          const isActive = painCaseState === item
          return (
            <Pressable key={item} onPress={() => setPainCaseState(item)}>
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

    <Text style={[typography.subtitle]}>Do painkillers (ibuprofen, nurofen etc) help you?</Text>
    <View style={styles.tagsContainer}>
      {MEDICINE_EFFECTS.map(item => {  
        const isActive = isMedicineState === item
        return (
          <Pressable key={item} onPress={() => setIsMedicineState(item)}>
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
            disabled={painCaseState === '' || isMedicineState === ''}
            title="Next"
            icon={(<MaterialIcons color={painCaseState === '' || isMedicineState === '' ? '#999999' : '#000000'} name="trending-flat" size={28} />)}
            onPress={next}
          />
        </View>
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