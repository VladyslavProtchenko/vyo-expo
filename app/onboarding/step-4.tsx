import Progress from '@/components/Progress';
import ButtonGradient from '@/components/ui/ButtonGradient';
import Number from '@/components/ui/Number';
import { typography } from '@/constants/typography';
import { useOnboardingData } from '@/hooks/useOnboardingData';
import { useUpdateMedicalData } from '@/hooks/useUpdateMedicalData';
import { ADDITIONAL_SYMPTOM_LABELS, AdditionalSymptomType } from '@/types/diagnosis';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Step4() {
  const { t } = useTranslation();
  const router = useRouter();
  const { data } = useOnboardingData();
  const { mutate: updateMedical, isPending: isUpdatingMedical } = useUpdateMedicalData();
  const initialTags = useRef<AdditionalSymptomType[]>([]);
  const [tags, setTags] = useState<AdditionalSymptomType[]>([]);

  useEffect(() => {
    if (data?.medical?.additional_symptoms && data.medical.additional_symptoms.length > 0) {
      const loaded = data.medical.additional_symptoms as AdditionalSymptomType[];
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
      router.push('/onboarding/step-5' as any);
      return;
    }

    updateMedical(
      { additional_symptoms: tags },
      { onSuccess: () => router.push('/onboarding/step-5' as any) }
    );
  };
  const selectTag = (tag: AdditionalSymptomType, isActive: boolean) => {
    isActive
      ? setTags(tags.filter(item => item !== tag))
      : setTags([...tags, tag]);
  };

  const progressPercentage = 36.36; // Step 4 = 36.36% (4/11 * 100)

  return (
    <View style={styles.container}>
      <Progress 
        percentage={progressPercentage} 
        isSkip={true} 
        goBack={goBack}
        currentStep={4}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Number number="4" />
        <Text style={[typography.h1, styles.title]}>{t('onboarding.step4.title')}</Text>
        <Text style={[typography.subtitle, styles.subtitle]}>{t('onboarding.step4.subtitle')}</Text>
        <View style={styles.tagsContainer}>
          {ADDITIONAL_SYMPTOM_LABELS.map(item => {
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
        <Text style={[typography.p, styles.note]}>
          <Text style={styles.noteBold}>{t('onboarding.step4.note_hirsutism_term')}</Text>
          {t('onboarding.step4.note_hirsutism_def')}
          <Text style={styles.noteBold}>{t('onboarding.step4.note_alopecia_term')}</Text>
          {t('onboarding.step4.note_alopecia_def')}
          <Text style={styles.noteBold}>{t('onboarding.step4.note_acanthosis_term')}</Text>
          {t('onboarding.step4.note_acanthosis_def')}
        </Text>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <ButtonGradient
          disabled={isUpdatingMedical}
          title={isUpdatingMedical ? t('onboarding.step4.saving') : t('onboarding.step4.next')}
          icon={(
            <MaterialIcons
              color={isUpdatingMedical ? '#999999' : '#000000'}
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
    flexGrow: 1,
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
  noteBold: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
  },
  note: {
    marginTop: 'auto',
    marginBottom: 32,
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 19.6,
    letterSpacing: 0,
  },
});
