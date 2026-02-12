import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { typography } from '../../../styles/globalStyles'
import CustomSwitch from '../../_components/ui/CustomSwitch'

const surgeryTypes = [
  'Nausea',
  'Vomiting',
  'Bloating',
  'Bowel movements absence',
  'Bleeding',
]

export default function PainCard() {
  const [isPain, setIsPain] = useState(false)
  const [surgeryType, setSurgeryType] = useState<string>('')

  const height = useSharedValue(0)
  const opacity = useSharedValue(0)

  useEffect(() => {
    if (isPain) {
      height.value = withTiming(500, { duration: 500 })
      opacity.value = withTiming(1, { duration: 500 })
    } else {
      height.value = withTiming(0, { duration: 500 })
      opacity.value = withTiming(0, { duration: 500 })
    }
  }, [isPain, height, opacity])

  const animatedStyle = useAnimatedStyle(() => ({
    maxHeight: height.value,
    opacity: opacity.value,
  }))
  return (
    <View style={[typography.card]}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text style={{fontFamily:"Poppins", fontSize: 16, fontWeight: '600'}}>I had a pelvic/lower abdomen surgery</Text>
      <CustomSwitch value={isPain} onValueChange={setIsPain} />
    </View>
    <Animated.View 
      style={[
        { 
          overflow: 'hidden',
        },
        animatedStyle
      ]}
    >
      <View>
        <Text style={{paddingTop: 16,}}>I experience today:</Text>
        <View style={styles.tagsContainer}>
          {surgeryTypes.map(item => {  
            const isActive = surgeryType === item
            return (
              <Pressable key={item} onPress={() => setSurgeryType(item)}>
                <Text style={[typography.p, styles.tag, isActive ? styles.tagActive : styles.tagInactive]}>{item}</Text>
              </Pressable>
            )
          })}
        </View>
      </View>
    </Animated.View>
  </View> 
  )
}

const styles = StyleSheet.create({

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
