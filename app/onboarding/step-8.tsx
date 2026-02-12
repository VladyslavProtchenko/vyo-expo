import Progress from '@/components/Progress';
import ButtonGradient from '@/components/ui/ButtonGradient';
import Number from '@/components/ui/Number';
import { typography } from '@/constants/typography';
import useProfileStore from '@/store/useProfileStore';
import { MEDICINE_EFFECTS, MedicineEffectType, PAIN_CASES, PainCaseType } from '@/types/diagnosis';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Step8() {
  const router = useRouter();
  const { setValue, painCase, isMedicine } = useProfileStore();
  const [painCaseState, setPainCaseState] = useState<PainCaseType | ''>('');
  const [isMedicineState, setIsMedicineState] = useState<MedicineEffectType | ''>('');

  useEffect(() => {
    if (painCase) setPainCaseState(painCase as PainCaseType);
    if (isMedicine) setIsMedicineState(isMedicine as MedicineEffectType);
  }, [painCase, isMedicine]);

  const goBack = () => {
    router.back();
  };

  const handleSkip = () => {
    router.push('/sync-data' as any);
  };

  const next = () => {
    setValue(painCaseState, 'painCase');
    setValue(isMedicineState, 'isMedicine');
    router.push('/onboarding/step-9' as any);
  };

  const progressPercentage = 77.78; // Step 8 = 77.78%

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
        <Text style={typography.subtitle}>Is the pain appearing during?</Text>

        <View style={styles.tagsContainer}>
          {PAIN_CASES.map(item => {
            const isActive = painCaseState === item;
            return (
              <Pressable key={item} onPress={() => setPainCaseState(item)}>
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

        <Text style={[typography.subtitle]}>Do painkillers (ibuprofen, nurofen etc) help you?</Text>
        <View style={styles.tagsContainer}>
          {MEDICINE_EFFECTS.map(item => {
            const isActive = isMedicineState === item;
            return (
              <Pressable key={item} onPress={() => setIsMedicineState(item)}>
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
          disabled={painCaseState === '' || isMedicineState === ''}
          title="Next"
          icon={(
            <MaterialIcons
              color={painCaseState === '' || isMedicineState === '' ? '#999999' : '#000000'}
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
