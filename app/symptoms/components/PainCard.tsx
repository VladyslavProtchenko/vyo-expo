import CustomSwitch from '@/components/ui/CustomSwitch';
import Slider from '@/components/ui/Slider';
import { typography } from '@/constants/typography';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const painTypes = ['Cramping', 'Aching', 'Sharp', 'Dull'];

export default function PainCard() {
  const [isPain, setIsPain] = useState(false);
  const [painType, setPainType] = useState<string>('');
  const [painIntensity, setPainIntensity] = useState<number>(0);

  const height = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isPain) {
      height.value = withTiming(500, { duration: 500 });
      opacity.value = withTiming(1, { duration: 500 });
    } else {
      height.value = withTiming(0, { duration: 500 });
      opacity.value = withTiming(0, { duration: 500 });
    }
  }, [isPain, height, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    maxHeight: height.value,
    opacity: opacity.value,
  }));

  return (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: '600' }}>I experience pain today</Text>
        <CustomSwitch value={isPain} onValueChange={setIsPain} />
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
          <Text style={{ paddingTop: 16 }}>What type of pain do you feel?</Text>
          <View style={styles.tagsContainer}>
            {painTypes.map((item) => {
              const isActive = painType === item;
              return (
                <Pressable key={item} onPress={() => setPainType(item)}>
                  <Text style={[typography.p, styles.tag, isActive ? styles.tagActive : styles.tagInactive]}>{item}</Text>
                </Pressable>
              );
            })}
          </View>
          <Text style={{ paddingTop: 16 }}>What's its intensity from 1 to 10?</Text>
          <Slider value={painIntensity} onValueChange={setPainIntensity} minimumValue={0} maximumValue={10} step={1} />
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
