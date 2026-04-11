import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { KeyboardTypeOptions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface IProps {
  type: KeyboardTypeOptions | undefined | 'password';
  value: string;
  onChange: (value: string) => void;
  onBlur?: (data: any) => void;
  isPassword?: boolean;
  style?: any;
  placeholder?: string;
  isPasswordConfirm?: boolean;
  error?: { type: string, message: string } | null;
}

export default function Input({
  type,
  value,
  onChange,
  onBlur,
  style,
  placeholder = 'Type here',
  isPasswordConfirm = true,
  error,
}: IProps) {
  const [show, setShow] = useState(type !== 'password');
  
  const hasError = !isPasswordConfirm || (error && error.type === type);
  
  const isFilled = value.length > 0 && !hasError;

  return (
    <View style={styles.container}>
      {value.length !== 0 && <Text style={styles.placeholderLabel}>{placeholder}</Text>}

      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete={type === 'email-address' ? 'email' : type === 'password' ? 'password' : 'off'}
        spellCheck={false}
        keyboardType={type === 'password' ? 'ascii-capable' : type === 'email-address' ? 'email-address' : (type as KeyboardTypeOptions)}
        textContentType={type === 'password' ? 'password' : type === 'email-address' ? 'emailAddress' : 'none'}
        inputMode={type === 'email-address' ? 'email' : type === 'password' ? 'text' : undefined}
        style={[
          styles.input,
          !isFilled && styles.inputBorder,
          hasError && styles.inputError,
          style
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        secureTextEntry={type === 'password' ? !show : false}
        onBlur={onBlur}
      />
      {isFilled && (
        <LinearGradient
          colors={['#FDFFA2', '#B4ECD0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientBorder}
        />
      )}
      {(error && error.type === type) && (
        <Text style={styles.errorText}>{error.message}</Text>
      )}

      {type === 'password' && (
        <TouchableOpacity 
          onPress={() => setShow(!show)}
          style={styles.eyeButton}
        >
          <Ionicons
            name={show ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color={isPasswordConfirm ? 'gray' : 'red'}
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    flexDirection: 'row',
  },
  input: {
    width: '100%',
    fontFamily: 'Poppins',
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    paddingTop: 28,
    paddingBottom: 4,
  },
  inputBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#9CA3AF',
  },
  inputError: {
    borderBottomWidth: 1,
    borderBottomColor: '#EF4444',
    color: '#EF4444',
  },
  gradientBorder: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
  },
  errorText: {
    fontSize: 14,
    position: 'absolute',
    bottom: -24,
    fontFamily: 'Poppins',
    fontWeight: '300',
    color: '#EF4444',
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  placeholderLabel: {
    position: 'absolute',
    left: 8,
    top: 0,
    opacity: 0.6,
    fontFamily: 'Poppins',
    fontSize: 16,
  },
});
