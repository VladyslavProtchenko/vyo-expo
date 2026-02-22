import ButtonRounded from '@/components/ui/ButtonRounded';
import { typography } from '@/constants/typography';
import { useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';

export default function Privacy() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('@/assets/images/flower.png')} 
        resizeMode="cover" 
        style={styles.backgroundImage}
      >
        <View style={styles.content}>
          <Text style={[typography.h1, styles.title]}>We respect your privacy</Text>
          <Text style={[typography.p, styles.text]}>VYO doesn't collect or sale any personal data.</Text>
          <Text style={[typography.p, styles.text]}>Your data is kept safely on your device and your personal iCloud storage. By accepting you agree to our privacy policy.</Text>
          <Pressable onPress={() => router.push('/welcome' as any)}>
            <Text style={[typography.p, styles.linkText]}>Learn more</Text>
          </Pressable>
          <ButtonRounded
            type='black'
            title='I accept'
            onPress={() => router.push('/onboarding/step-1' as any)}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop: 160,
  },
  content: {
    paddingVertical: 40,
    paddingHorizontal: 16,
    width: '100%',
    justifyContent: 'flex-end',
    flex: 1,
  },
  title: {
    color: 'white',
    marginBottom: 16,
  },
  text: {
    color: 'white',
    marginBottom: 12,
  },
  linkText: {
    color: 'white',
    textDecorationLine: 'underline',
    fontWeight: '600',
    marginBottom: 40,
  },
});
