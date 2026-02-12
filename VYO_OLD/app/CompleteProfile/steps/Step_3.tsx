import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ButtonGradient from '../../_components/ui/ButtonGradient';
import useProfileStore from '../../_store/useProfileStore';
import { typography } from '../../../styles/globalStyles';
import Number from '../../_components/ui/Number';
import { SYMPTOM_LABELS, SymptomType } from '../../_types/diagnosis';  

export default function Step3({ goNext }: { goNext: () => void }) {
  const { setValue } = useProfileStore()
  const symptoms = useProfileStore(state => state.symptoms)
  const [tags, setTags] = useState<SymptomType[]>(symptoms as SymptomType[])

  const next = () => {
    setValue(tags, 'symptoms')
    goNext()
  }

  const selectTag = (tag: SymptomType, isActive: boolean) => {
    isActive
      ? setTags(tags.filter(item => item !== tag))
      : setTags([...tags, tag])
  }

  return (
    <View style={styles.container}>
      <Number number="4" />
      <Text style={[typography.h1, styles.title]}>Physical & Emotional wellbeing</Text>
      <Text style={styles.subtitle}>Select all relevant for your period</Text>
      
      <View style={styles.tagsContainer}>
        {SYMPTOM_LABELS.map(item => {
          const isActive = tags.find(i => i === item) ? true : false;
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
          disabled={tags.length === 0}
          title="Next"
          icon={(<MaterialIcons color={tags.length === 0 ? '#999999' : '#000000'} name="arrow-forward" size={26} />)}
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

  title: {
    width: '100%',
    marginBottom: 24, // mb-6
  },
  subtitle: {
    fontFamily: 'Archivo Black',
    fontSize: 20, // text-[20px]
    width: '100%',
    marginBottom: 8, // mb-2
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10, // gap-2.5
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
    marginTop: 'auto',
    marginVertical: 40, // my-10
  },
});