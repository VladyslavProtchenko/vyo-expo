import Progress from '@/components/Progress';
import ButtonGradient from '@/components/ui/ButtonGradient';
import Number from '@/components/ui/Number';
import { typography } from '@/constants/typography';
import useRegistrationStore from '@/store/useRegistrationStore';
import { PAIN_CHANGES, PainChangeType } from '@/types/diagnosis';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Step10() {
  const router = useRouter();
  const { setValue, isPainChange } = useRegistrationStore();
  const [isPainChangeState, setIsPainChangeState] = useState<PainChangeType | ''>('');

  useEffect(() => {
    if (isPainChange) setIsPainChangeState(isPainChange as PainChangeType);
  }, [isPainChange]);

  const goBack = () => {
    router.back();
  };

  const handleSkip = () => {
    router.push('/sync-data' as any);
  };

  const next = () => {
    setValue(isPainChangeState, 'isPainChange');
    router.push('/onboarding/step-11' as any);
  };

  const progressPercentage = 90.91; // Step 10 = 90.91% (10/11 * 100)

  return (
    <View style={styles.container}>
      <Progress 
        percentage={progressPercentage} 
        isSkip={true} 
        goBack={goBack}
        onSkip={handleSkip}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Number number="10" />
        <Text style={[typography.h1, styles.title]}>Your pain details</Text>
        <Text style={typography.subtitle}>Have you noticed the pain change for last 3 months?</Text>

        <View style={styles.tagsContainer}>
          {PAIN_CHANGES.map(item => {
            const isActive = isPainChangeState === item;
            return (
              <Pressable key={item} onPress={() => setIsPainChangeState(item)}>
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
          disabled={isPainChangeState === ''}
          title="Next"
          icon={(
            <MaterialIcons
              color={isPainChangeState === '' ? '#999999' : '#000000'}
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
