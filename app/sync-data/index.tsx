import ButtonGradient from '@/components/ui/ButtonGradient';
import ButtonRounded from '@/components/ui/ButtonRounded';
import { typography } from '@/constants/typography';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';

export default function SyncData() {
  const router = useRouter();

  const handleAllowAccess = () => {
    router.push('/care-plan-preview' as any);
  };

  const handleAccept = () => {
    router.push('/care-plan-preview' as any);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/sync.png')}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <View style={styles.content}>
          <Image source={require('@/assets/images/health.png')} style={styles.image} />
          <Text style={[typography.h1, styles.title]}>Sync data from wearable devices?</Text>
          <Text style={[typography.p, styles.text]}>
            If you are using a wearable device that shares fitness data with Apple Health, VYO can access that data and provide additional insights and analytics.
          </Text>

          <View style={styles.buttonContainer}>
            <ButtonGradient
              title="Allow Access"
              onPress={handleAllowAccess}
              icon={(<MaterialIcons color={'#000000'} name="arrow-forward" size={26} />)}
            />
            <ButtonRounded
              type="shadow"
              title="I accept"
              onPress={handleAccept}
            />
          </View>
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
    marginBottom: 8,
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
  image: {
    width: 60,
    height: 60,
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 40,
    gap: 12,
  },
});
