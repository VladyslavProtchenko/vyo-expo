import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import ButtonGradient from '../../_components/ui/ButtonGradient';
import useProfileStore from '../../_store/useProfileStore';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { typography } from '../../../styles/globalStyles';
import Number from '../../_components/ui/Number';
import { DIAGNOSIS_LABELS, DiagnosisType } from '../../_types/diagnosis';

export default function Step2({ goNext }: { goNext: () => void }) {
  const { setValue, diagnoses } = useProfileStore()
  const [tags, setTags] = useState(diagnoses)

  const next = () => {
    if( tags.includes('Endometriosis') || tags.includes('Adenomyosis') ){
      setValue(true, 'isDiagnosed')
    }
    setValue(tags, 'diagnoses')
    goNext()
  }

  const selectTag = (tag: DiagnosisType, isActive: boolean) => {
    isActive
      ? setTags(tags.filter(item => item !== tag))
      : setTags([...tags, tag])
  }

  return (
    <View style={styles.container}>
        <Number number="3" />
        <Text style={[typography.h1, { marginBottom: 32} ]}>Reproductive health</Text>
        <Text style={typography.subtitle}> What was the result of your gynecological examination in the past years?</Text>


            <View style={styles.tagsContainer}>
              {DIAGNOSIS_LABELS.map(item => {
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
  buttonContainer: {
    marginTop: 'auto', // mt-6
    marginBottom: 40, // mb-10
  },
});