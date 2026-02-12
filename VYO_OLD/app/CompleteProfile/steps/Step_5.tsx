import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ButtonGradient from '../../_components/ui/ButtonGradient';
import useProfileStore from '../../_store/useProfileStore';
import { typography } from '../../../styles/globalStyles';
import Number from '../../_components/ui/Number';
import Slider from '../../_components/ui/Slider';
import { PAIN_TYPES, PainType } from '../../_types/diagnosis';

export default function Step5({ goNext, navigation }: { goNext: () => void, navigation: any }) {
  const { setValue, isPain, painType, intensity } = useProfileStore()
  const [isPainState, setIsPainState] = useState<boolean | null>(isPain)
  const [painIntensity, setPainIntensity] = useState<number>(intensity)
  const [painTypeState, setPainTypeState] = useState<PainType | ''>(painType as PainType || '')

  const next = () => {
    
    if(isPainState === null) return  
    if(isPainState === true) {
      setValue(isPainState, 'isPain')
      setValue(painTypeState, 'painType')
      setValue(painIntensity, 'intensity')
      goNext()
    } else {
      setValue(isPainState, 'isPain')
      navigation.navigate('SyncData')
    }
  }
  const title = isPainState ? 'Next' : 'Get my care plan?'
  const isDisabled = isPainState === null || (isPainState && (painTypeState === '' || painIntensity === 0))

  return (
    <View style={styles.container}>
      <Number number="6" />
      <Text style={[typography.h1, { marginBottom: 32} ]}>Your period</Text>
      <Text style={typography.subtitle}>Are your periods painful?</Text>


      <View style={styles.tagsContainer}>
        {['No', 'Yes'].map(item => {
          const isActive = isPainState === (item === 'Yes' ? true : false)
          return (
            <Pressable key={item} onPress={() => setIsPainState(item === 'Yes' ? true : false)}>
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
      {isPainState && <>      
        <Text style={typography.subtitle}>What’s its intensity from 1 to 10?</Text>
        <Slider
          value={painIntensity}
          onValueChange={setPainIntensity}
          minimumValue={0}
          maximumValue={10}
          step={1}
        />
        <Text style={[typography.subtitle, { marginTop: 32 }]}>What type of pain do you feel?</Text>
        <View style={styles.tagsContainer}>
        {PAIN_TYPES.map(item => {
            const isActive = painTypeState === item
            return (
              <Pressable key={item} onPress={() => setPainTypeState(item)}>
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
      </>}
      <View style={styles.buttonContainer}>
        <ButtonGradient
          disabled={isDisabled}
          title={title}
          icon={(<MaterialIcons color={isDisabled ? '#999999' : '#000000'} name="arrow-forward" size={26} />)}
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