import React from 'react';
import ButtonRounded from './ui/ButtonRounded';
import IonIcons from 'react-native-vector-icons/Ionicons';

export default function AuthButton({ type, onPress, enabled = true }: { type: 'apple' | 'google', onPress: () => void, enabled?: boolean }) {

  return (
    <ButtonRounded
      title={
        type === 'google'
          ? 'Continue with Google'
          : 'Continue with Apple'
      }
      icon={
        type === 'google'
          ? (<IonIcons name="logo-google" size={24} color="black" />)
          : (<IonIcons name="logo-apple" size={24} color="black" />)
      }
      type='white'
      onPress={onPress}
      iconLeft={true}
      enabled={enabled}
    />
  )
}