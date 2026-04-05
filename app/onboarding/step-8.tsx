import Progress from '@/components/Progress';
import ButtonGradient from '@/components/ui/ButtonGradient';
import Number from '@/components/ui/Number';
import { typography } from '@/constants/typography';
import { useOnboardingData } from '@/hooks/useOnboardingData';
import { useUpdateMedicalData } from '@/hooks/useUpdateMedicalData';
import { PAIN_DURATIONS, PAIN_LOCATIONS, PAIN_PERIODS, PainDurationType, PainLocationType, PainPeriodType } from '@/types/diagnosis';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

export default function Step8() {
  const { t } = useTranslation();
  const router = useRouter();
  const { data } = useOnboardingData();
  const { mutate: updateMedical, isPending: isUpdatingMedical } = useUpdateMedicalData();
  const initialized = useRef(false);
  const initialData = useRef({
    painPeriod: [] as PainPeriodType[],
    painLocation: [] as PainLocationType[],
    painDuration: '' as PainDurationType | '',
  });
  const [formData, setFormData] = useState(initialData.current);

  useEffect(() => {
    if (data?.medical && !initialized.current) {
      initialized.current = true;
      const loaded = {
        painPeriod: (data.medical.pain_period || []) as PainPeriodType[],
        painLocation: (data.medical.pain_location || []) as PainLocationType[],
        painDuration: (data.medical.pain_duration as PainDurationType) || '' as PainDurationType | '',
      };
      initialData.current = loaded;
      setFormData(loaded);
    }
  }, [data]);

  const goBack = () => {
    router.back();
  };

  const selectPainPeriod = (period: PainPeriodType, isActive: boolean) => {
    isActive
      ? setFormData(prev => ({ ...prev, painPeriod: prev.painPeriod.filter(item => item !== period) }))
      : setFormData(prev => ({ ...prev, painPeriod: [...prev.painPeriod, period] }));
  };

  const selectPainLocation = (location: PainLocationType, isActive: boolean) => {
    isActive
      ? setFormData(prev => ({ ...prev, painLocation: prev.painLocation.filter(item => item !== location) }))
      : setFormData(prev => ({ ...prev, painLocation: [...prev.painLocation, location] }));
  };

  const next = () => {
    const init = initialData.current;
    const hasChanges =
      formData.painDuration !== init.painDuration ||
      JSON.stringify([...formData.painPeriod].sort()) !== JSON.stringify([...init.painPeriod].sort()) ||
      JSON.stringify([...formData.painLocation].sort()) !== JSON.stringify([...init.painLocation].sort());

    if (!hasChanges) {
      router.push('/onboarding/step-9' as any);
      return;
    }

    updateMedical(
      {
        pain_period: formData.painPeriod.length > 0 ? formData.painPeriod : null,
        pain_location: formData.painLocation,
        pain_duration: formData.painDuration || undefined,
      },
      { onSuccess: () => router.push('/onboarding/step-9' as any) }
    );
  };

  const progressPercentage = 72.73; // Step 8 = 72.73% (8/11 * 100)
  const isFormInvalid = formData.painPeriod.length === 0 || formData.painLocation.length === 0 || formData.painDuration === '';

  return (
    <View style={styles.container}>
      <Progress
        percentage={progressPercentage}
        isSkip={true}
        goBack={goBack}
        currentStep={8}
      />
      <KeyboardAwareScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} bottomOffset={120}>
        <View style={styles.content}>
          <Number number="8" />
          <Text style={[typography.h1, styles.title]}>{t('onboarding.step8.title')}</Text>
          <Text style={typography.subtitle}>{t('onboarding.step8.when_subtitle')}</Text>

          <View style={styles.tagsContainer}>
            {PAIN_PERIODS.map(item => {
              const isActive = formData.painPeriod.includes(item);
              return (
                <Pressable key={item} onPress={() => selectPainPeriod(item, isActive)}>
                  <Text style={[typography.p, styles.tag, isActive ? styles.tagActive : styles.tagInactive]}>
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Text style={typography.subtitle}>{t('onboarding.step8.where_subtitle')}</Text>
          <View style={styles.tagsContainer}>
            {PAIN_LOCATIONS.map(item => {
              const isActive = formData.painLocation.includes(item);
              return (
                <Pressable key={item} onPress={() => selectPainLocation(item, isActive)}>
                  <Text style={[typography.p, styles.tag, isActive ? styles.tagActive : styles.tagInactive]}>
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Text style={typography.subtitle}>{t('onboarding.step8.duration_subtitle')}</Text>
          <View style={styles.tagsContainer}>
            {PAIN_DURATIONS.map(item => {
              const isActive = formData.painDuration === item;
              return (
                <Pressable key={item} onPress={() => setFormData(prev => ({ ...prev, painDuration: item }))}>
                  <Text style={[typography.p, styles.tag, isActive ? styles.tagActive : styles.tagInactive]}>
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <ButtonGradient
            disabled={isFormInvalid || isUpdatingMedical}
            title={isUpdatingMedical ? t('onboarding.step8.saving') : t('onboarding.step8.next')}
            icon={(
              <MaterialIcons
                color={isFormInvalid ? '#999999' : '#000000'}
                name="arrow-forward"
                size={26}
              />
            )}
            onPress={next}
          />
        </View>
      </KeyboardAwareScrollView>
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
    paddingBottom: 16,
  },
  content: {
    flex: 1,
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
    paddingTop: 16,
    paddingBottom: 36,
  },
});
