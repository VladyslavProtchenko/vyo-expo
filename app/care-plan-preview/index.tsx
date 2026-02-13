import ButtonGradient from '@/components/ui/ButtonGradient';
import { typography } from '@/constants/typography';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function CarePlanPreview() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.bottomCoverWrapper}>
          <Image
            source={require('@/assets/images/care-plan-preview.webp')}
            style={styles.bottomCoverImage}
            resizeMode="cover"
          />
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={[typography.h1, styles.title]}>Thank you for sharing!</Text>
            <Image source={require('@/assets/images/Yellow.png')} style={styles.cardHeaderImage} />
          </View>
          <Text style={[typography.p, { marginBottom: 8 }]}>Your symptoms may indicate secondary dysmenorrhea, sometimes linked to conditions like endometriosis. Please talk to you gynecologist for clarity.</Text>
          <Text style={[typography.p]}>Remember — you're not alone in this. We're here to support you through the pain, and your personalized care plan is just one click away.</Text>
        </View>
        <View style={styles.card}>
          <Image source={require('@/assets/images/icons/pinkChem.png')} style={styles.pink} />
          <Text style={[typography.h1, styles.title, { marginBottom: 8 }]}>Backed by science</Text>
          <Text style={[typography.p]}>The plan is science-based, built on modern protocols, and validated by medical experts</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <ButtonGradient
          title='Jump right in'
          onPress={() => router.push('/(tabs)/home' as any)}
          icon={<MaterialIcons name='arrow-forward' size={24} color='black' />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  imageContainer: {
    flex: 0.5,
    width: '100%',
    position: 'relative',
  },
  bottomCoverWrapper: {
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  bottomCoverImage: {
    width: '100%',
    height: '150%',
  },
  content: {
    flex: 0.7,
    gap: 12,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    transform: [{ translateY: -80 }],
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardHeaderImage: {
    width: 45,
    height: 45,
  },
  title: {
    fontSize: 24,
    width: '70%',
    lineHeight: 24,
  },
  pink: {
    width: 34,
    height: 34,
    marginBottom: 12,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
});
