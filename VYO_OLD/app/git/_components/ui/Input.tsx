import { TextInput, Text, TouchableOpacity, View, StyleSheet, KeyboardTypeOptions } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';


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
  const [show, setShow] = useState(type !== 'password' as KeyboardTypeOptions);
  
  const hasError = !isPasswordConfirm || (error && error.type === type);
  
  return (
    <View style={styles.container}>
      {value.length !== 0 && <Text style={styles.placeholderLabel}>{placeholder}</Text>}

      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="off"
        spellCheck={false}
        keyboardType={type as KeyboardTypeOptions}
        textContentType={type === 'password' ? 'password' : type === 'email-address' ? 'emailAddress' : 'none'}
        style={[
          styles.input,
          hasError && styles.inputError,
          style
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        secureTextEntry={!show}
        onBlur={onBlur}
      />
      {(error && error.type === type) && (
        <Text style={styles.errorText}>{error.message}</Text>
      )}

      {type === 'password' as KeyboardTypeOptions && (
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
    borderBottomWidth: 1,
    borderBottomColor: '#9CA3AF', // border-gray-400
    fontFamily: 'Geologica',
    fontSize: 16,
    paddingHorizontal: 12, // px-3
    paddingVertical: 10, // py-2.5
    paddingTop: 28,
    paddingBottom: 4,
  },
  inputError: {
    borderBottomColor: '#EF4444', // border-red-500
    color: '#EF4444', // text-red-500
  },
  errorText: {
    fontSize: 14,
    position: 'absolute',
    bottom: -24, // -bottom-6
    fontFamily: 'Geologica',
    fontWeight: '300',
    color: '#EF4444', // text-red-500
  },
  eyeButton: {
    position: 'absolute',
    right: 16, // right-4
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
