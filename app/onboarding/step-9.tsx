import Progress from '@/components/Progress';
import ButtonGradient from '@/components/ui/ButtonGradient';
import Number from '@/components/ui/Number';
import { typography } from '@/constants/typography';
import { useOnboardingData } from '@/hooks/useOnboardingData';
import { useUpdateMedicalData } from '@/hooks/useUpdateMedicalData';
import { MEDICINE_EFFECTS, MedicineEffectType, PAIN_CASES, PainCaseType } from '@/types/diagnosis';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Step9() {
  const router = useRouter();
  const { data } = useOnboardingData();
  const { mutate: updateMedical, isPending: isUpdatingMedical } = useUpdateMedicalData();
  const initialData = useRef({
    painCase: '' as PainCaseType | '',
    isMedicine: '' as MedicineEffectType | '',
  });
  const [formData, setFormData] = useState(initialData.current);

  useEffect(() => {
    if (data?.medical) {
      const loaded = {
        painCase: (data.medical.pain_case as PainCaseType) || '' as PainCaseType | '',
        isMedicine: (data.medical.is_medicine as MedicineEffectType) || '' as MedicineEffectType | '',
      };
      initialData.current = loaded;
      setFormData(loaded);
    }
  }, [data]);

  const goBack = () => {
    router.navigate('/onboarding/step-8' as any);
  };

  const next = () => {
    const init = initialData.current;
    const hasChanges =
      formData.painCase !== init.painCase ||
      formData.isMedicine !== init.isMedicine;

    if (!hasChanges) {
      router.push('/onboarding/step-10' as any);
      return;
    }

    updateMedical(
      { pain_case: formData.painCase || undefined, is_medicine: formData.isMedicine || undefined },
      { onSuccess: () => router.push('/onboarding/step-10' as any) }
    );
  };



  return (
    <View style={styles.container}>
      <Progress
        isSkip={true}
        goBack={goBack}
        currentStep={9}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Number number="9" />
        <Text style={[typography.h1, styles.title]}>Your pain details</Text>
        <Text style={typography.subtitle}>Is the pain appearing during?</Text>

        <View style={styles.tagsContainer}>
          {PAIN_CASES.map(item => {
            const isActive = formData.painCase === item;
            return (
              <Pressable key={item} onPress={() => setFormData(prev => ({ ...prev, painCase: item }))}>
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
            const isActive = formData.isMedicine === item;
            return (
              <Pressable key={item} onPress={() => setFormData(prev => ({ ...prev, isMedicine: item }))}>
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
          disabled={formData.painCase === '' || formData.isMedicine === '' || isUpdatingMedical}
          title={isUpdatingMedical ? "Saving..." : "Next"}
          icon={(
            <MaterialIcons
              color={formData.painCase === '' || formData.isMedicine === '' || isUpdatingMedical ? '#999999' : '#000000'}
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
    marginBottom: 32,
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
