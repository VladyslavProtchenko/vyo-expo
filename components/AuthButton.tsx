import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface AuthButtonProps {
  type: 'google' | 'apple';
  onPress: () => void;
  enabled?: boolean;
}

export default function AuthButton({ type, onPress, enabled = true }: AuthButtonProps) {
  const isGoogle = type === 'google';
  
  return (
    <TouchableOpacity
      style={[styles.button, !enabled && styles.disabled]}
      onPress={onPress}
      disabled={!enabled}
    >
      <View style={styles.content}>
        {isGoogle ? (
          <FontAwesome5 name="google" size={20} color="#000000" />
        ) : (
          <MaterialIcons name="apple" size={24} color="#000000" />
        )}
        <Text style={styles.text}>
          Continue with {isGoogle ? 'Google' : 'Apple'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    minHeight: 56,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  text: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  disabled: {
    opacity: 0.5,
  },
});
