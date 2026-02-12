import React from 'react';
import { TouchableOpacity, StyleSheet, View, Animated, StyleProp, ViewStyle } from 'react-native';

interface CustomSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  activeColor?: string;
  inactiveColor?: string;
  thumbColor?: string;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function CustomSwitch({
  value,
  onValueChange,
  activeColor = '#5DDA9D',
  inactiveColor = '#E5E7EB',
  thumbColor = '#FFFFFF',
  size = 'small',
  disabled = false,
  style,
}: CustomSwitchProps) {
  const [animatedValue] = React.useState(new Animated.Value(value ? 1 : 0));

  React.useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: value ? 1 : 0,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  }, [value, animatedValue]);

  const sizeConfig = {
    small: { width: 40, height: 24, thumbSize: 18, padding: 3 },
    medium: { width: 52, height: 32, thumbSize: 26, padding: 3 },
    large: { width: 64, height: 40, thumbSize: 34, padding: 3 },
  };

  const config = sizeConfig[size];

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [config.padding, config.width - config.thumbSize - config.padding],
  });

  const handlePress = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.8}
      style={style}
    >
      <View
        style={[
          styles.track,
          {
            width: config.width,
            height: config.height,
            backgroundColor: value ? activeColor : inactiveColor,
            borderRadius: config.height / 2,
            opacity: disabled ? 0.5 : 1,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              width: config.thumbSize,
              height: config.thumbSize,
              borderRadius: config.thumbSize / 2,
              backgroundColor: thumbColor,
              transform: [{ translateX }],
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  track: {
    justifyContent: 'center',
  },
  thumb: {
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
});
