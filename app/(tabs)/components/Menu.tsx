import { typography } from '@/constants/typography';
import { MaterialIcons } from '@expo/vector-icons';
import React, { ReactNode, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import ExerciseList from './ExerciseList';

interface MenuItemProps {
  title: string;
  description: string;
  isExpanded: boolean;
  onPress: () => void;
  extraContent?: ReactNode;
}

function MenuItem({ title, description, isExpanded, onPress, extraContent }: MenuItemProps) {
  const height = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isExpanded) {
      height.value = withTiming(2000, { duration: 600 });
      opacity.value = withTiming(1, { duration: 600 });
    } else {
      height.value = withTiming(0, { duration: 600 });
      opacity.value = withTiming(0, { duration: 600 });
    }
  }, [isExpanded, height, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    maxHeight: height.value,
    opacity: opacity.value,
  }));

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
            <Text style={styles.description}>{description}</Text>
          </View>

          {extraContent}
        </View>
      </Animated.View>
    </View>
  );
}

export default function CarePlanMenu() {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});

  const toggleItem = (index: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <View style={styles.container}>
      {ITEMS.map((item, index) => (
        <MenuItem
          key={index}
          title={item.title}
          description={item.description}
          isExpanded={expandedItems[index] || false}
          onPress={() => toggleItem(index)}
          extraContent={item.extraContent}
        />
      ))}
    </View>
  );
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
    paddingHorizontal: 16,
    paddingLeft: 40,
  },
  description: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 12 * 1.3,
    color: '#404040',
  },
});

const ITEMS = [
  {
    title: '🥦 Nutrition & Supplements',
    description:
      'Simple, evidence-based nutrition guidance tailored to your age, cycle phase, and symptoms you log. The focus isn\'t strict dieting, but understanding key nutritional priorities that support hormones, energy, and mood.\n\nSupplements may be suggested as supportive tools — not medical treatment.',
  },
  {
    title: '💪 Body Care',
    description:
      'Your movement plan is designed by a rehabilitation specialist and adapts to your cycle phase, daily symptoms, and overall condition.\n\nThe goal is the right type of movement at the right time — helping your body stay strong, balanced, and energized.',
    extraContent: <ExerciseList />,
  },
  {
    title: '🧘 Stress Management',
    description:
      'Short daily practices help regulate stress, support recovery, and improve mental wellbeing.\n\nRecommendations adjust to how you feel, helping you build sustainable habits that support both emotional and physical health.',
  },
];
