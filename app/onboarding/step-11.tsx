import { useQueryClient } from '@tanstack/react-query';
import Progress from '@/components/Progress';
import ButtonGradient from '@/components/ui/ButtonGradient';
import Calendar from '@/components/ui/Calendar';
import Number from '@/components/ui/Number';
import { typography } from '@/constants/typography';
import { getEndoCluster } from '@/hooks/getEndo';
import { getPCOS } from '@/hooks/getPCOS';
import { useUpdateDiagnosis } from '@/hooks/useDiagnosisData';
import { useOnboardingData } from '@/hooks/useOnboardingData';
import { useUpdateMedicalData } from '@/hooks/useUpdateMedicalData';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const surgeries = [
  'Pelvis',
  'Lower abdomen',
  'None of these',
];

const otherSymptomsLabels = [
  'Fatigue',
  'Sleep disturbance',
  'Low energy',
  'Infertility',
  'Mood swings',
  'Depression',
  'Enlarged uterus',
  'Abnormal uterine bleeding',
];

export default function Step11() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = useOnboardingData();
  const { mutate: updateMedical, isPending: isUpdatingMedical } = useUpdateMedicalData();
  const { mutate: updateProfile, isPending: isUpdatingProfile } = useUpdateProfile();
  const { mutate: updateDiagnosis, isPending: isUpdatingDiagnosis } = useUpdateDiagnosis();
  const loading = isUpdatingMedical || isUpdatingProfile || isUpdatingDiagnosis;

  const initialData = useRef({
    surgery: '',
    surgeryDate: null as string | null,
    otherSymptoms: [] as string[],
  });
  const [formData, setFormData] = useState(initialData.current);

  const noSurgery = formData.surgery === 'None of these';

  useEffect(() => {
    if (data?.medical) {
      const loaded = {
        surgery: data.medical.surgery || '',
        surgeryDate: data.medical.surgery_date || null,
        otherSymptoms: data.medical.other_symptoms || [],
      };
      initialData.current = loaded;
      setFormData(loaded);
    }
  }, [data]);

  const goBack = () => {
    router.back();
  };

  const selectTag = (tag: string, isActive: boolean) => {
    isActive
      ? setFormData(prev => ({ ...prev, otherSymptoms: prev.otherSymptoms.filter(item => item !== tag) }))
      : setFormData(prev => ({ ...prev, otherSymptoms: [...prev.otherSymptoms, tag] }));
  };

  const completeOnboarding = (diagnosisPayload: Parameters<typeof updateDiagnosis>[0]) => {
    updateDiagnosis(diagnosisPayload, {
      onSuccess: () => {
        updateProfile(
          { onboarding_completed: true, is_quiz_skipped: false, last_completed_quiz_step: 11 },
          { onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['onboarding'] }); router.push('/sync-data' as any); } }
        );
      },
    });
  };

  const computeDiagnosis = () => {
    const mergedData = {
      profile: data?.profile ?? null,
      medical: { ...data?.medical, other_symptoms: formData.otherSymptoms } as any,
    };

    if (!noSurgery) {
      completeOnboarding({
        diagnosis: 'endometriosis',
        endo_type: getEndoCluster(mergedData),
        is_endo_surgery: true,
        is_endo_additional: false,
      });
    } else {
      const pcosResult = getPCOS(data);
      if (pcosResult > 0) {
        const pcosType = (pcosResult === 1 ? 'high' : pcosResult === 2 ? 'middle' : 'possible') as 'high' | 'middle' | 'possible';
        completeOnboarding({ diagnosis: 'pcos', pcos_type: pcosType });
      } else {
        completeOnboarding({
          diagnosis: 'endometriosis',
          endo_type: getEndoCluster(mergedData),
          is_endo_surgery: false,
          is_endo_additional: formData.otherSymptoms.length > 0,
        });
      }
    }
  };

  const next = () => {
    const init = initialData.current;
    const hasChanges =
      formData.surgery !== init.surgery ||
      formData.surgeryDate !== init.surgeryDate ||
      JSON.stringify([...formData.otherSymptoms].sort()) !== JSON.stringify([...init.otherSymptoms].sort());

    if (!hasChanges) {
      computeDiagnosis();
      return;
    }

    updateMedical(
      {
        surgery: !noSurgery ? formData.surgery || undefined : undefined,
        surgery_date: !noSurgery ? formData.surgeryDate || undefined : undefined,
        other_symptoms: noSurgery ? formData.otherSymptoms : [],
      },
      { onSuccess: computeDiagnosis }
    );
  };

  const isDisabled = loading || formData.surgery === '' || (!noSurgery && (formData.surgeryDate === null || formData.surgeryDate === ''));

  const progressPercentage = 100;

  return (
    <View style={styles.container}>
      <Progress
        percentage={progressPercentage}
        isSkip={true}
        goBack={goBack}
        currentStep={11}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Number number="11" />
        <Text style={[typography.h1, styles.title]}>Did you have a surgery?</Text>
        <Text style={typography.subtitle}>Select all relevant</Text>

        <View style={styles.tagsContainer}>
          {surgeries.map(item => {
            const isActive = formData.surgery === item;
            return (
              <Pressable key={item} onPress={() => setFormData(prev => ({ ...prev, surgery: item }))}>
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

        {!noSurgery && formData.surgery !== '' && (
          <>
            <Text style={[typography.subtitle, styles.subtitleSpacing]}>When it happened?</Text>
            <View style={styles.calendarSpacing}>
              <Calendar
                title="Select date"
                value={formData.surgeryDate}
                setValue={(value) => setFormData(prev => ({ ...prev, surgeryDate: value }))}
              />
            </View>
          </>
        )}

        {noSurgery && (
          <>
            <Text style={[typography.subtitle, styles.subtitleSpacing]}>Any additional symptoms?</Text>
            <View style={styles.tagsContainer}>
              {otherSymptomsLabels.map(item => {
                const isActive = formData.otherSymptoms.includes(item);
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
          </>
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <ButtonGradient
          disabled={isDisabled}
          title={loading ? "Saving..." : "Get my care plan"}
          icon={
            loading ? (
              <ActivityIndicator color="#000000" />
            ) : (
              <MaterialIcons
                color={isDisabled ? '#999999' : '#000000'}
                name="trending-flat"
                size={28}
              />
            )
          }
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
  subtitleSpacing: {
    marginTop: 16,
    marginBottom: 16,
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
  calendarSpacing: {
    marginTop: 16,
    marginBottom: 24,
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
