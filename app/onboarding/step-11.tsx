import Progress from '@/components/Progress';
import ButtonGradient from '@/components/ui/ButtonGradient';
import Calendar from '@/components/ui/Calendar';
import Number from '@/components/ui/Number';
import { typography } from '@/constants/typography';
import { useDiagnosis } from '@/hooks/useDiagnosis';
import { useOnboardingData } from '@/hooks/useOnboardingData';
import { useSaveDiagnosis } from '@/hooks/useProfileData';
import { useUpdateMedicalData } from '@/hooks/useUpdateMedicalData';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
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
  const { data } = useOnboardingData();
  const { mutate: updateMedical, isPending: isUpdatingMedical } = useUpdateMedicalData();
  const { mutate: updateProfile, isPending: isUpdatingProfile } = useUpdateProfile();
  const { saveDiagnosisResults, loading: diagnosisLoading } = useSaveDiagnosis();
  const diagnosisResult = useDiagnosis();
  
  const loading = isUpdatingMedical || isUpdatingProfile || diagnosisLoading;
  
  const [formData, setFormData] = useState({
    surgery: '',
    surgeryDate: null as string | null,
    otherSymptoms: [] as string[],
  });

  const isDiagnosed = data?.medical?.is_diagnosed || false;

  useEffect(() => {
    if (data?.medical) {
      setFormData({
        surgery: data.medical.surgery || '',
        surgeryDate: data.medical.surgery_date || null,
        otherSymptoms: data.medical.other_symptoms || [],
      });
    }
  }, [data]);

  const goBack = () => {
    router.push('/onboarding/step-10' as any);
  };

  const selectTag = (tag: string, isActive: boolean) => {
    isActive
      ? setFormData(prev => ({ ...prev, otherSymptoms: prev.otherSymptoms.filter(item => item !== tag) }))
      : setFormData(prev => ({ ...prev, otherSymptoms: [...prev.otherSymptoms, tag] }));
  };

  const next = async () => {
    try {
      const { primary, secondary, menstrualPain, diagnosis } = diagnosisResult;

      updateMedical(
        {
          surgery: isDiagnosed ? formData.surgery || undefined : undefined,
          surgery_date: isDiagnosed ? formData.surgeryDate || undefined : undefined,
          other_symptoms: formData.otherSymptoms,
        },
        {
          onSuccess: async () => {
            const diagnosisResultSave = await saveDiagnosisResults(
              primary,
              secondary,
              menstrualPain,
              diagnosis
            );
            
            if (!diagnosisResultSave.success) {
              console.error('❌ Failed to save diagnosis results:', diagnosisResultSave.error);
              alert('Failed to save diagnosis results. Please try again.');
              return;
            }

            updateProfile(
              { 
                onboarding_completed: true,
                is_quiz_skipped: false,
                last_completed_quiz_step: 11,
              },
              {
                onSuccess: () => {
                  console.log('✅ Onboarding completed! All data saved successfully');
                  router.push('/sync-data' as any);
                },
              }
            );
          },
        }
      );
    } catch (error: any) {
      console.error('❌ Error during onboarding completion:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const progressPercentage = 100; // Step 11 = 100% (11/11 * 100)

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
        {isDiagnosed ? (
          <>
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

            <Text style={[typography.subtitle, styles.subtitleSpacing]}>When it happened?</Text>
            <View style={styles.calendarSpacing}>
              <Calendar
                title="Select date"
                value={formData.surgeryDate}
                setValue={(value) => setFormData(prev => ({ ...prev, surgeryDate: value }))}
              />
            </View>
          </>
        ) : (
          <>
            <Text style={[typography.h1, styles.title]}>Other symptoms</Text>
            <Text style={typography.subtitle}>Select all you're experiencing</Text>

            <View style={styles.tagsContainer}>
              {otherSymptomsLabels.map(item => {
                const isActive = formData.otherSymptoms.find(i => i === item) ? true : false;
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
          disabled={
            loading ||
            (isDiagnosed
              ? formData.surgery === '' || formData.surgeryDate === null || formData.surgeryDate === ''
              : formData.otherSymptoms.length === 0)
          }
          title={loading ? "Saving..." : "Get my care plan"}
          icon={
            loading ? (
              <ActivityIndicator color="#000000" />
            ) : (
              <MaterialIcons
                color={
                  isDiagnosed
                    ? formData.surgery === '' || formData.surgeryDate === null || formData.surgeryDate === ''
                      ? '#999999'
                      : '#000000'
                    : formData.otherSymptoms.length === 0
                      ? '#999999'
                      : '#000000'
                }
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
