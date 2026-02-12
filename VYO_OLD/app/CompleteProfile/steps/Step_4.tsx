import { View, Text, ImageBackground, ScrollView, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ButtonGradient from '../../_components/ui/ButtonGradient';
import useProfileStore from '../../_store/useProfileStore';
import { typography } from '../../../styles/globalStyles';
import Number from '../../_components/ui/Number';
import { FLOW_LABELS, REGULAR_PERIOD_LABELS, FlowType, RegularPeriodType } from '../../_types/diagnosis';

export default function Step4({ goNext }: { goNext: () => void }) {
  const { setValue, flow, isRegularPeriod } = useProfileStore()
  const [isRegular, setIsRegular] = useState<RegularPeriodType[]>(
    Array.isArray(isRegularPeriod) ? isRegularPeriod as RegularPeriodType[] : []
  )
  const [flowState, setFlowState] = useState<FlowType | ''>(flow as FlowType || '')

  const selectRegularPeriod = (period: RegularPeriodType, isActive: boolean) => {
    isActive
      ? setIsRegular(isRegular.filter(item => item !== period))
      : setIsRegular([...isRegular, period])
  }

  const next = () => {
    setValue(flowState, 'flow')
    setValue(isRegular, 'isRegularPeriod')
    goNext()
  }
    return (
      <View style={styles.container}>
        <Number number="5" />
        <Text style={[typography.h1, styles.title]}>Is your period regular?</Text>
        <Text style={[typography.subtitle, { marginBottom: 16 }]}>What is your flow?</Text>
        
        <View style={[styles.tagsContainer, { marginBottom: 32 }]}>
          {FLOW_LABELS.map(item => {
            const isActive = flowState === item
            return (
              <Pressable key={item} onPress={() => setFlowState(item)}>
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

        <Text style={[typography.subtitle, { marginBottom: 16 }]}>Is your period regular?</Text>
        
        <View style={styles.tagsContainer}>
          {REGULAR_PERIOD_LABELS.map(item => {
            const isActive = isRegular.find(i => i === item) ? true : false;
            return (
              <Pressable key={item} onPress={() => selectRegularPeriod(item, isActive)}>
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
            disabled={flowState === '' || isRegular.length === 0}
            title="Next"
            icon={(<MaterialIcons color={flowState === '' || isRegular.length === 0 ? '#999999' : '#000000'} name="arrow-forward" size={26} />)}
            onPress={next}/>
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