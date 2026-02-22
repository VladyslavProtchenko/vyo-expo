import Progress from '@/components/Progress';
import ButtonGradient from '@/components/ui/ButtonGradient';
import Number from '@/components/ui/Number';
import { typography } from '@/constants/typography';
import useRegistrationStore from '@/store/useRegistrationStore';
import { PAIN_DURATIONS, PAIN_LOCATIONS, PAIN_PERIODS, PainDurationType, PainLocationType, PainPeriodType } from '@/types/diagnosis';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Step8() {
  const router = useRouter();
  const { setValue, painPeriod, painLocation, painDuration } = useRegistrationStore();
  const [painPeriodState, setPainPeriodState] = useState<PainPeriodType | ''>('');
  const [painLocationState, setPainLocationState] = useState<PainLocationType[]>([]);
  const [painDurationState, setPainDurationState] = useState<PainDurationType | ''>('');

  useEffect(() => {
    if (painPeriod) setPainPeriodState(painPeriod as PainPeriodType);
    if (Array.isArray(painLocation) && painLocation.length > 0) {
      setPainLocationState(painLocation as PainLocationType[]);
    }
    if (painDuration) setPainDurationState(painDuration as PainDurationType);
  }, [painPeriod, painLocation, painDuration]);

  const goBack = () => {
    router.back();
  };

  const handleSkip = () => {
    router.push('/sync-data' as any);
  };

  const selectPainLocation = (location: PainLocationType, isActive: boolean) => {
    isActive
      ? setPainLocationState(painLocationState.filter(item => item !== location))
      : setPainLocationState([...painLocationState, location]);
  };

  const next = () => {
    setValue(painPeriodState, 'painPeriod');
    setValue(painLocationState, 'painLocation');
    setValue(painDurationState, 'painDuration');
    router.push('/onboarding/step-9' as any);
  };

  const progressPercentage = 72.73; // Step 8 = 72.73% (8/11 * 100)

  return (
    <View style={styles.container}>
      <Progress 
        percentage={progressPercentage} 
        isSkip={true} 
        goBack={goBack}
        onSkip={handleSkip}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Number number="8" />
        <Text style={[typography.h1, styles.title]}>Your pain details</Text>
        <Text style={typography.subtitle}>When do you feel the pain?</Text>

        <View style={styles.tagsContainer}>
          {PAIN_PERIODS.map(item => {
            const isActive = painPeriodState === item;
            return (
              <Pressable key={item} onPress={() => setPainPeriodState(item)}>
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

        <Text style={[typography.subtitle]}>Where do you feel the pain?</Text>
        <View style={styles.tagsContainer}>
          {PAIN_LOCATIONS.map(item => {
            const isActive = painLocationState.find(i => i === item) ? true : false;
            return (
              <Pressable key={item} onPress={() => selectPainLocation(item, isActive)}>
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

        <Text style={[typography.subtitle]}>How long does the pain last?</Text>
        <View style={styles.tagsContainer}>
          {PAIN_DURATIONS.map(item => {
            const isActive = painDurationState === item;
            return (
              <Pressable key={item} onPress={() => setPainDurationState(item)}>
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
      </ScrollView>

      <View style={styles.buttonContainer}>
        <ButtonGradient
          disabled={painPeriodState === '' || painLocationState.length === 0 || painDurationState === ''}
          title="Next"
          icon={(
            <MaterialIcons
              color={painPeriodState === '' || painLocationState.length === 0 || painDurationState === '' ? '#999999' : '#000000'}
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
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 36,
  },
});
