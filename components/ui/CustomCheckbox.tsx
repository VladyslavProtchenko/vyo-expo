import { Check } from 'lucide-react-native';
import React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

interface CustomCheckboxProps {
  checked: boolean;
  onPress: () => void;
  size?: number;
  checkedColor?: string;
  uncheckedColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  style?: StyleProp<ViewStyle>;
}

export default function CustomCheckbox({
  checked,
  onPress,
  size = 22,
  checkedColor = '#404040',
  borderRadius = 6,
  borderWidth = 2,
  style,
}: CustomCheckboxProps) {
  return (
    <TouchableOpacity
      style={[
        styles.checkbox,
        style,
        {
          width: size,
          height: size,
          borderRadius: borderRadius,
          borderWidth: borderWidth,
          borderColor: checkedColor,
          backgroundColor: 'transparent',
        }
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {checked && (
        <Check 
          size={size * 0.65} 
          color={checkedColor}
          strokeWidth={3}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
