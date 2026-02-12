import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  value: number;
  height?: number;
  radius?: number;
  trackColor?: string;
  colors?: string[];
  style?: StyleProp<ViewStyle>;
};

export default function ProgressBar({
  value,
  height = 12,
  radius = 4,
  trackColor = '#E5E7EB',
  colors,
  style,
}: Props) {
  const pct = Math.max(0, Math.min(100, value));

  // If explicit gradient colors are not provided, choose solid color by value
  let autoColor = '#10B981'; // green default
  if (pct < 25) autoColor = '#EF4444';          // red
  else if (pct < 50) autoColor = '#F97316';     // orange
  else if (pct < 75) autoColor = '#EAB308';     // yellow
  else autoColor = '#22C55E';                   // green

  return (
    <View style={[styles.track, { height, borderRadius: radius, backgroundColor: trackColor }, style]}> 
      {colors && colors.length > 1 ? (
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.fill, { width: `${pct}%`, borderRadius: radius }]}
        />
      ) : (
        <View style={[styles.fill, { width: `${pct}%`, borderRadius: radius, backgroundColor: autoColor }]} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
});


