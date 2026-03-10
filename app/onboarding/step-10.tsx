import Progress from '@/components/Progress';
import ButtonGradient from '@/components/ui/ButtonGradient';
import Number from '@/components/ui/Number';
import { typography } from '@/constants/typography';
import { useGetDiagnosis, useUpdateDiagnosis } from '@/hooks/useDiagnosisData';
import { getPCOS } from '@/hooks/getPCOS';
import { getPrimaryDysmenorrhea } from '@/hooks/getPrimaryDysmenorrhea';
import { useOnboardingData } from '@/hooks/useOnboardingData';
import { useUpdateMedicalData } from '@/hooks/useUpdateMedicalData';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
import { PAIN_CHANGES, PainChangeType } from '@/types/diagnosis';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Step10() {
  const router = useRouter();
  const { data } = useOnboardingData();
  const { mutate: updateMedical, isPending: isUpdatingMedical } = useUpdateMedicalData();
  const { mutate: updateProfile } = useUpdateProfile();
  const { mutate: updateDiagnosis } = useUpdateDiagnosis();
  const { data: diagnosisData } = useGetDiagnosis();
  const [formData, setFormData] = useState({
    isPainChange: '' as PainChangeType | '',
  });

  useEffect(() => {
    if (data?.medical?.is_pain_change) {
      setFormData({
        isPainChange: data.medical.is_pain_change as PainChangeType,
      });
    }
  }, [data]);

  const goBack = () => {
    router.push('/onboarding/step-9' as any);
  };

  const next = () => {
    updateMedical(
      { is_pain_change: formData.isPainChange || undefined },
      {
        onSuccess: () => {
          const mergedData = {
            profile: data?.profile ?? null,
            medical: { ...data?.medical, is_pain_change: formData.isPainChange } as any,
          };
          const diagnosis = getPrimaryDysmenorrhea(mergedData);
          const alreadyEndo = diagnosisData?.diagnosis === 'endometriosis';

          if (alreadyEndo || diagnosis === 'endometriosis') {
            router.push('/onboarding/step-11' as any);
            return;
          }

          const pcosResult = getPCOS(data);
          const diagnosisPayload = pcosResult > 0
            ? { diagnosis: 'pcos' as const, pcos_type: (pcosResult === 1 ? 'high' : pcosResult === 2 ? 'middle' : 'possible') as 'high' | 'middle' | 'possible' }
            : { diagnosis: diagnosis as Exclude<typeof diagnosis, 'pcos'> };

          updateDiagnosis(diagnosisPayload, {
            onSuccess: () => {
              updateProfile(
                { onboarding_completed: true, is_quiz_skipped: false, last_completed_quiz_step: 10 },
                { onSuccess: () => router.push('/sync-data' as any) }
              );
            },
          });
        },
      }
    );
  };

  const progressPercentage = 90.91; // Step 10 = 90.91% (10/11 * 100)

  return (
    <View style={styles.container}>
      <Progress 
        percentage={progressPercentage} 
        isSkip={true} 
        goBack={goBack}
        currentStep={10}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Number number="10" />
        <Text style={[typography.h1, styles.title]}>Your pain details</Text>
        <Text style={typography.subtitle}>Have you noticed the pain change for last 3 months?</Text>

        <View style={styles.tagsContainer}>
          {PAIN_CHANGES.map(item => {
            const isActive = formData.isPainChange === item;
            return (
              <Pressable key={item} onPress={() => setFormData(prev => ({ ...prev, isPainChange: item }))}>
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
          disabled={formData.isPainChange === '' || isUpdatingMedical}
          title={isUpdatingMedical ? "Saving..." : "Next"}
          icon={(
            <MaterialIcons
              color={formData.isPainChange === '' || isUpdatingMedical ? '#999999' : '#000000'}
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
