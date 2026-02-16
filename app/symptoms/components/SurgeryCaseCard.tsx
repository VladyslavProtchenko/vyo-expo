import CustomSwitch from '@/components/ui/CustomSwitch';
import { typography } from '@/constants/typography';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const surgeryTypes = ['Nausea', 'Vomiting', 'Bloating', 'Bowel movements absence', 'Bleeding'];

export default function SurgeryCaseCard() {
  const [isSurgery, setIsSurgery] = useState(false);
  const [surgeryType, setSurgeryType] = useState<string>('');

  const height = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isSurgery) {
      height.value = withTiming(500, { duration: 500 });
      opacity.value = withTiming(1, { duration: 500 });
    } else {
      height.value = withTiming(0, { duration: 500 });
      opacity.value = withTiming(0, { duration: 500 });
    }
  }, [isSurgery, height, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    maxHeight: height.value,
    opacity: opacity.value,
  }));

  return (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: '600' }}>I had a pelvic/lower abdomen surgery</Text>
        <CustomSwitch value={isSurgery} onValueChange={setIsSurgery} />
      </View>
      <Animated.View
        style={[
          {
            overflow: 'hidden',
          },
          animatedStyle,
        ]}
      >
        <View>
          <Text style={{ paddingTop: 16 }}>I experience today:</Text>
          <View style={styles.tagsContainer}>
            {surgeryTypes.map((item) => {
              const isActive = surgeryType === item;
              return (
                <Pressable key={item} onPress={() => setSurgeryType(item)}>
                  <Text style={[typography.p, styles.tag, isActive ? styles.tagActive : styles.tagInactive]}>{item}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'white',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingVertical: 12,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 24,
    borderColor: '#E7E8ED',
  },
  tagActive: {
    backgroundColor: '#FEF08A',
  },
  tagInactive: {
    backgroundColor: 'transparent',
  },
});
