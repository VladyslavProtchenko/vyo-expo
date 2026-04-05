import Progress from '@/components/Progress';
import ButtonGradient from '@/components/ui/ButtonGradient';
import Number from '@/components/ui/Number';
import { typography } from '@/constants/typography';
import { useOnboardingData } from '@/hooks/useOnboardingData';
import { useUpdateMedicalData } from '@/hooks/useUpdateMedicalData';
import { SYMPTOM_LABELS, SymptomType } from '@/types/diagnosis';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Step5() {
  const router = useRouter();
  const { data } = useOnboardingData();
  const { mutate: updateMedical, isPending: isUpdatingMedical } = useUpdateMedicalData();
  const initialTags = useRef<SymptomType[]>([]);
  const [tags, setTags] = useState<SymptomType[]>([]);

  useEffect(() => {
    if (data?.medical?.symptoms && data.medical.symptoms.length > 0) {
      const loaded = data.medical.symptoms as SymptomType[];
      initialTags.current = loaded;
      setTags(loaded);
    }
  }, [data]);

  const goBack = () => {
    router.back();
  };

  const next = () => {
    const hasChanges = JSON.stringify([...tags].sort()) !== JSON.stringify([...initialTags.current].sort());

    if (!hasChanges) {
      router.push('/onboarding/step-6' as any);
      return;
    }

    updateMedical(
      { symptoms: tags },
      { onSuccess: () => router.push('/onboarding/step-6' as any) }
    );
  };

  const selectTag = (tag: SymptomType, isActive: boolean) => {
    isActive
      ? setTags(tags.filter(item => item !== tag))
      : setTags([...tags, tag]);
  };

  const progressPercentage = 45.45; // Step 5 = 45.45% (5/11 * 100)

  return (
    <View style={styles.container}>
      <Progress 
        percentage={progressPercentage} 
        isSkip={true} 
        goBack={goBack}
        currentStep={5}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Number number="5" />
        <Text style={[typography.h1, styles.title]}>Physical & Emotional wellbeing</Text>
        <Text style={[typography.subtitle, styles.subtitle]}>Select all relevant for your period</Text>
        
        <View style={styles.tagsContainer}>
          {SYMPTOM_LABELS.map(item => {
            const isActive = tags.find(i => i === item) ? true : false;
            return (
              <Pressable key={item} onPress={() => selectTag(item, isActive)}>
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
          disabled={tags.length === 0 || isUpdatingMedical}
          title={isUpdatingMedical ? "Saving..." : "Next"}
          icon={(
            <MaterialIcons
              color={tags.length === 0 || isUpdatingMedical ? '#999999' : '#000000'}
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
    marginBottom: 24,
    marginTop: 12,
  },
  subtitle: {
    width: '100%',
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
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
