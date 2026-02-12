import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { typography } from '../../../styles/globalStyles'
import ButtonRounded from '../../_components/ui/ButtonRounded'
import VideoCard from '../../_components/ui/VideoCard'

interface MenuItemProps {
  title: string
  description: string
  isExpanded: boolean
  onPress: () => void
}

function MenuItem({ title, description, isExpanded, onPress }: MenuItemProps) {
  const height = useSharedValue(0)
  const opacity = useSharedValue(0)

  useEffect(() => {
    if (isExpanded) {
      height.value = withTiming(2000, { duration: 600 })
      opacity.value = withTiming(1, { duration: 600 })
    } else {
      height.value = withTiming(0, { duration: 600 })
      opacity.value = withTiming(0, { duration: 600 })
    }
  }, [isExpanded, height, opacity])

  const animatedStyle = useAnimatedStyle(() => ({
    maxHeight: height.value,
    opacity: opacity.value,
  }))

  return (
    <View style={styles.card}>
      <Pressable onPress={onPress} style={styles.pressable}>
        <Text style={styles.title}>{title}</Text>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={24}
          color="black"
          style={{ transform: [{ rotate: isExpanded ? '180deg' : '0deg' }] }}
        />
      </Pressable>

      <Animated.View
        style={[
          {
            overflow: 'hidden',
          },
          animatedStyle,
        ]}
      >
        <View style={styles.content}>
          <View style={styles.textContent}>
            <Text style={[typography.p, { fontSize: 12, marginBottom: 16 }]}>{description}</Text>
            <View style={styles.headerRow}>
              <Text style={styles.sectionTitle}>Pelvic floor exercises</Text>
              <ButtonRounded
                className={{ width: 90, minHeight: 36, borderRadius: 36 }}
                title="See all"
                onPress={() => {}}
              />
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {items.map((_, index) => (
              <VideoCard
                key={index}
                videoUrl="https://www.w3schools.com/html/mov_bbb.mp4"
                title="Pelvic floor exercises"
                style={{
                  width: 160,
                  height: 100,
                  marginRight: index < items.length - 1 ? 12 : 0,
                }}
              />
            ))}
          </ScrollView>
        </View>
      </Animated.View>
    </View>
  )
}

export default function Menu() {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({})

  const toggleItem = (index: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <MenuItem
          key={index}
          title={item.title}
          description={item.description}
          isExpanded={expandedItems[index] || false}
          onPress={() => toggleItem(index)}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    gap: 12,
  },
  card: {
    borderRadius: 24,
    backgroundColor: 'white',
  },
  pressable: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    ...typography.h1,
    fontSize: 16,
  },
  content: {
    paddingBottom: 16,
  },
  textContent: {
    padding: 16,
    paddingLeft: 40,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
  },
  scrollContent: {
    paddingLeft: 40,
    paddingRight: 16,
    paddingBottom: 16,
  },
})

const items = [
  {
    title: '🥦 Nutrition & Supplements',
    description:
      'Gentle exercises to strengthen your pelvic floor, improve stability, and reduce pain — easy to follow with guided videos.',
  },
  {
    title: '🫶 Physiotherapy',
    description:
      'Gentle exercises to strengthen your pelvic floor, improve stability, and reduce pain — easy to follow with guided videos.',
  },
  {
    title: '🧘 Stress Management',
    description:
      'Gentle exercises to strengthen your pelvic floor, improve stability, and reduce pain — easy to follow with guided videos.',
  },
  {
    title: '🌿 Lifestyle',
    description:
      'Gentle exercises to strengthen your pelvic floor, improve stability, and reduce pain — easy to follow with guided videos.',
  },
]
