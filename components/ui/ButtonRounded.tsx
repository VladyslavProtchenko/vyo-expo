import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

interface IProps {
    onPress?: () => void;
    type?: 'black' | 'white' | 'gradient' | 'shadow';
    title?: string;
    icon?: any;
    iconLeft?: boolean;
    enabled?: boolean;
    className?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

export default function ButtonRounded({ title, icon, type = 'white', iconLeft = false, onPress, enabled  = true, className, textStyle }: IProps) {
  const getButtonStyle = () => {
    switch (type) {
      case 'black':
        return styles.blackButton;
      case 'white':
        return styles.whiteButton;
      case 'gradient':
        return styles.gradientButton;
      case 'shadow':
        return styles.shadowButton;
      default:
        return styles.whiteButton;
    }
  };

  const getTextStyle = () => {
    return type === 'black' ? styles.whiteText : styles.blackText;
  };

  return (
    <TouchableOpacity 
        onPress={onPress}
        style={[
          styles.button, 
          getButtonStyle(),
          className as StyleProp<ViewStyle>,
          !enabled && styles.enabledButton
        ]}
        disabled={!enabled}
    >
      {(iconLeft && icon) ? icon : null}
      <Text style={[styles.text, getTextStyle(), textStyle as StyleProp<TextStyle>]}>
        {title}
      </Text>
      {(!iconLeft && icon) ? icon : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    width: '100%',
    minHeight: 56,
    alignItems: 'center',
    gap: 20,
    justifyContent: 'center',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  blackButton: {
    backgroundColor: '#000000',
  },
  whiteButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#000000',
  },
  gradientButton: {
    backgroundColor: '#FF9F1C',
  },
  text: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
  },
  blackText: {
    color: '#000000',
  },
  whiteText: {
    color: '#FFFFFF',
  },
  enabledButton: {
    opacity: 0.5,
  },
  shadowButton: {
    borderWidth: 1,
    borderColor: '#000000',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
  },
});
