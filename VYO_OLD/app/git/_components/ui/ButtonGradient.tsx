import { Pressable, Text, View, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

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
    height: 56, // h-12
    width: '100%',
    borderRadius: 24, // rounded-full
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
    gap: 16, // gap-4
    height: '100%',
    width: '100%',
  },
  text: {
    fontFamily: 'Geologica',
    fontSize: 16, // text-base
    fontWeight: '500', // font-medium
  },
  textDisabled: {
    color: '#999999',
    opacity: 0.7,
  },
});
