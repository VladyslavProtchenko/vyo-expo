import Progress from '@/components/Progress';
import ButtonGradient from '@/components/ui/ButtonGradient';
import Number from '@/components/ui/Number';
import Slider from '@/components/ui/Slider';
import { typography } from '@/constants/typography';
import useRegistrationStore from '@/store/useRegistrationStore';
import { PAIN_TYPES, PainType } from '@/types/diagnosis';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Step6() {
  const router = useRouter();
  const { setValue, isPain, painType, intensity } = useRegistrationStore();
  const [isPainState, setIsPainState] = useState<boolean | null>(isPain);
  const [painIntensity, setPainIntensity] = useState<number>(intensity || 0);
  const [painTypeState, setPainTypeState] = useState<PainType | ''>(painType as PainType || '');

  useEffect(() => {
    if (isPain !== null && isPain !== undefined) setIsPainState(isPain);
    if (intensity !== null && intensity !== undefined) setPainIntensity(intensity);
    if (painType) setPainTypeState(painType as PainType);
  }, [isPain, painType, intensity]);

  const goBack = () => {
    router.back();
  };

  const handleSkip = () => {
    router.push('/sync-data' as any);
  };

  const next = () => {
    if (isPainState === null) return;
    if (isPainState === true) {
      setValue(isPainState, 'isPain');
      setValue(painTypeState, 'painType');
      setValue(painIntensity, 'intensity');
      router.push('/onboarding/step-7' as any);
    } else {
      setValue(isPainState, 'isPain');
      router.push('/sync-data' as any);
    }
  };

  const title = isPainState ? 'Next' : 'Get my care plan?';
  const isDisabled = isPainState === null || (isPainState && (painTypeState === '' || painIntensity === 0));
  const progressPercentage = 55.56; // Step 6 = 55.56%

  return (
    <View style={styles.container}>
      <Progress 
        percentage={progressPercentage} 
        isSkip={true} 
        goBack={goBack}
        onSkip={handleSkip}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Number number="6" />
        <Text style={[typography.h1, styles.title]}>Your period</Text>
        <Text style={typography.subtitle}>Are your periods painful?</Text>

        <View style={styles.tagsContainer}>
          {['No', 'Yes'].map(item => {
            const isActive = isPainState === (item === 'Yes' ? true : false);
            return (
              <Pressable key={item} onPress={() => setIsPainState(item === 'Yes' ? true : false)}>
                <Text
                  style={[
                    typography.p,
                    styles.tag,
                    isActive ? styles.tagActive : styles.tagInactive
                  ]}
                >{item}</Text>
              </Pressable>
            );
          })}
        </View>

        {isPainState && (
          <>
            <Text style={typography.subtitle}>What's its intensity from 1 to 10?</Text>
            <Slider
              value={painIntensity}
              onValueChange={setPainIntensity}
              minimumValue={0}
              maximumValue={10}
              step={1}
            />
            <Text style={[typography.subtitle, styles.painTypeTitle]}>What type of pain do you feel?</Text>
            <View style={styles.tagsContainer}>
              {PAIN_TYPES.map(item => {
                const isActive = painTypeState === item;
                return (
                  <Pressable key={item} onPress={() => setPainTypeState(item)}>
                    <Text
                      style={[
                        typography.p,
                        styles.tag,
                        isActive ? styles.tagActive : styles.tagInactive
                      ]}
                    >{item}</Text>
                  </Pressable>
                );
              })}
            </View>
          </>
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <ButtonGradient
          disabled={isDisabled}
          title={title}
          icon={(
            <MaterialIcons
              color={isDisabled ? '#999999' : '#000000'}
              name="arrow-forward"
              size={26}
            />
          )}
          onPress={next}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  contentContainer: {
    paddingBottom: 120,
  },
  title: {
    width: '100%',
    marginBottom: 32,
    marginTop: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingVertical: 12,
    marginBottom: 32,
    marginTop: 16,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 24,
    borderColor: '#E7E8ED',
  },
  tagActive: {
    backgroundColor: '#FEF08A',
  },
  tagInactive: {
    backgroundColor: 'transparent',
  },
  painTypeTitle: {
    marginTop: 32,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 36,
  },
});
