import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

type Props = {
  title: string;
  icon?: any;
  onPress?: () => void;
  disabled?: boolean;
  className?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function ButtonGradient({ title, icon, onPress, disabled = false, className, textStyle }: Props) {
  return (
    <Pressable onPress={disabled ? undefined : onPress} style={[styles.pressable, className]} disabled={disabled}>
      <LinearGradient
        colors={disabled ? ['#F4F4F4', '#CCCCCC'] : ['#FDFFA2', '#B4ECD0']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Text style={[styles.text, disabled && styles.textDisabled, textStyle]}>{title}</Text>
          {icon}
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    height: 56,
    width: '100%',
    borderRadius: 24,
    overflow: 'hidden',
  },
  gradient: {
    height: '100%',
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    height: '100%',
    width: '100%',
  },
  text: {
    fontFamily: 'Geologica',
    fontSize: 16,
    fontWeight: '500',
  },
  textDisabled: {
    color: '#999999',
    opacity: 0.7,
  },
});
