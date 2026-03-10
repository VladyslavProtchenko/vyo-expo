import Progress from '@/components/Progress';
import ButtonGradient from '@/components/ui/ButtonGradient';
import Number from '@/components/ui/Number';
import Slider from '@/components/ui/Slider';
import { typography } from '@/constants/typography';
import { useOnboardingData } from '@/hooks/useOnboardingData';
import { useUpdateDiagnosis } from '@/hooks/useDiagnosisData';
import { getPCOS } from '@/hooks/getPCOS';
import { useUpdateMedicalData } from '@/hooks/useUpdateMedicalData';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
import { PAIN_TYPES, PainType } from '@/types/diagnosis';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Step7() {
  const router = useRouter();
  const { data } = useOnboardingData();
  const { mutate: updateMedical, isPending: isUpdatingMedical } = useUpdateMedicalData();
  const { mutate: updateProfile, isPending: isUpdatingProfile } = useUpdateProfile();
  const { mutate: updateDiagnosis } = useUpdateDiagnosis();
  const [formData, setFormData] = useState({
    isPain: null as boolean | null,
    painIntensity: 0,
    painType: '' as PainType | '',
  });

  useEffect(() => {
    if (data?.medical) {
      const hasEndo = data.medical.diagnosed_conditions?.some(
        c => c === 'Endometriosis' || c === 'Adenomyosis'
      );
      setFormData({
        isPain: hasEndo ? true : data.medical.is_pain,
        painIntensity: data.medical.pain_intensity || 0,
        painType: (data.medical.pain_type as PainType) || '',
      });
    }
  }, [data]);

  const goBack = () => {
    router.push('/onboarding/step-6' as any);
  };

  const next = () => {
    if (formData.isPain === null) return;
    
    if (formData.isPain === true) {
      updateMedical(
        {
          is_pain: formData.isPain,
          pain_type: formData.painType || undefined,
          pain_intensity: formData.painIntensity || undefined,
        },
        {
          onSuccess: () => {
            router.push('/onboarding/step-8' as any);
          },
        }
      );
    } else {
      updateMedical(
        {
          is_pain: formData.isPain,
        },
        {
          onSuccess: () => {
            const pcosResult = getPCOS(data);
            const diagnosisPayload = pcosResult > 0
              ? { diagnosis: 'pcos' as const, pcos_type: (pcosResult === 1 ? 'high' : pcosResult === 2 ? 'middle' : 'possible') as 'high' | 'middle' | 'possible' }
              : { diagnosis: 'normal' as const };

            updateDiagnosis(diagnosisPayload, {
              onSuccess: () => {
                updateProfile(
                  { onboarding_completed: true, is_quiz_skipped: false, last_completed_quiz_step: 7 },
                  { onSuccess: () => router.push('/sync-data' as any) }
                );
              },
            });
          },
        }
      );
    }
  };

  const title = formData.isPain ? 'Next' : 'Get my care plan?';
  const isDisabled = formData.isPain === null || (formData.isPain && (formData.painType === '' || formData.painIntensity === 0)) || isUpdatingMedical || isUpdatingProfile;
  const progressPercentage = 63.64; // Step 7 = 63.64% (7/11 * 100)

  return (
    <View style={styles.container}>
      <Progress 
        percentage={progressPercentage} 
        isSkip={true} 
        goBack={goBack}
        currentStep={7}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Number number="7" />
        <Text style={[typography.h1, styles.title]}>Your period</Text>
        <Text style={typography.subtitle}>Are your periods painful?</Text>

        <View style={styles.tagsContainer}>
          {['No', 'Yes'].map(item => {
            const isActive = formData.isPain === (item === 'Yes' ? true : false);
            return (
              <Pressable key={item} onPress={() => setFormData(prev => ({ ...prev, isPain: item === 'Yes' ? true : false }))}>
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

        {formData.isPain && (
          <>
            <Text style={typography.subtitle}>What's its intensity from 1 to 10?</Text>
            <Slider
              value={formData.painIntensity}
              onValueChange={(value) => setFormData(prev => ({ ...prev, painIntensity: value }))}
              minimumValue={0}
              maximumValue={10}
              step={1}
            />
            <Text style={[typography.subtitle, styles.painTypeTitle]}>What type of pain do you feel?</Text>
            <View style={styles.tagsContainer}>
              {PAIN_TYPES.map(item => {
                const isActive = formData.painType === item;
                return (
                  <Pressable key={item} onPress={() => setFormData(prev => ({ ...prev, painType: item }))}>
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
          title={isUpdatingMedical || isUpdatingProfile ? "Saving..." : title}
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
