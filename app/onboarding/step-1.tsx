import Progress from '@/components/Progress';
import ButtonGradient from '@/components/ui/ButtonGradient';
import Calendar from '@/components/ui/Calendar';
import Input from '@/components/ui/Input';
import Number from '@/components/ui/Number';
import Select from '@/components/ui/Select';
import { typography } from '@/constants/typography';
import { useOnboardingData } from '@/hooks/useOnboardingData';
import { useUpdateMedicalData } from '@/hooks/useUpdateMedicalData';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
import { MaterialIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
export default function Step1() {
  const { t } = useTranslation();
  const router = useRouter();
  const { data, isLoading } = useOnboardingData();
  const { mutate: updateProfile, isPending: isUpdatingProfile } = useUpdateProfile();
  const { mutate: updateMedical, isPending: isUpdatingMedical } = useUpdateMedicalData();
  const initialized = useRef(false);
  const initialData = useRef({
    age: 18,
    menstruationDate: null as string | null,
    menstrDuration: 5,
    cycle: 28,
  });
  const [formData, setFormData] = useState(initialData.current);

  useEffect(() => {
    if (data && !initialized.current) {
      initialized.current = true;
      const loaded = {
        age: data.profile?.age && data.profile.age > 0 ? data.profile.age : 18,
        menstruationDate: data.medical?.start_menstruation || null,
        menstrDuration: data.medical?.menstruation_duration || 5,
        cycle: data.medical?.cycle_duration && data.medical.cycle_duration > 0 ? data.medical.cycle_duration : 28,
      };
      initialData.current = loaded;
      setFormData(loaded);
    }
  }, [data]);

  const goBack = () => {
    router.back();
  };

  const next = () => {
    const init = initialData.current;
    const isFirstTime = !data?.medical;
    const profileChanged = isFirstTime || formData.age !== init.age;
    const medicalChanged =
      isFirstTime ||
      formData.menstruationDate !== init.menstruationDate ||
      formData.menstrDuration !== init.menstrDuration ||
      formData.cycle !== init.cycle;

    const navigate = () => router.push('/onboarding/step-2' as any);

    const saveMedical = (onDone: () => void) => {
      if (!medicalChanged) { onDone(); return; }
      updateMedical(
        {
          start_menstruation: formData.menstruationDate,
          menstruation_duration: formData.menstrDuration,
          cycle_duration: formData.cycle,
        },
        { onSuccess: onDone }
      );
    };

    if (profileChanged) {
      updateProfile({ age: formData.age }, { onSuccess: () => saveMedical(navigate) });
    } else {
      saveMedical(navigate);
    }
  };

  const progressPercentage = 9.09; // Step 1 = 9.09% (1/11 * 100)
  const isFormInvalid = !formData.menstruationDate || formData.age <= 0 || formData.menstrDuration <= 0 || formData.cycle <= 0;

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Progress percentage={progressPercentage} isSkip={false} goBack={goBack} showBack={false} />
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Progress
        percentage={progressPercentage}
        isSkip={false}
        goBack={goBack}
        showBack={false}
      />
      <KeyboardAwareScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer} bottomOffset={120}>
        <View style={styles.content}>
        <Number number="1" />
        <Text style={[typography.h1, styles.title]}>{t('onboarding.step1.title')}</Text>
        <Text style={typography.subtitle}>{t('onboarding.step1.age_subtitle')}</Text>
        <Text style={typography.p}>{t('onboarding.step1.age_description')}</Text>

        <View style={styles.calendarSpacing}>
          <Input
            type="numeric"
            value={formData.age > 0 ? String(formData.age) : ''}
            onChange={(value: string) => {
              const numericValue = value.replace(/[^0-9]/g, '');
              setFormData(prev => ({ ...prev, age: numericValue ? parseInt(numericValue, 10) : 0 }));
            }}
            placeholder={t('onboarding.step1.age_placeholder')}
          />
        </View>

        <Text style={typography.subtitle}>{t('onboarding.step1.cycle_subtitle')}</Text>

        <View style={styles.calendarSpacing}>
          <Calendar
            value={formData.menstruationDate}
            setValue={(value) => setFormData(prev => ({ ...prev, menstruationDate: value }))}
            title={t('onboarding.step1.menstruation_start')}
          />
        </View>

        <View style={styles.selectSpacing}>
          <Select
            title={t('onboarding.step1.menstruation_duration')}
            value={formData.menstrDuration}
            setValue={(value) => setFormData(prev => ({ ...prev, menstrDuration: value }))}
            values={Array.from({ length: 16 }, (_, i) => i + 1)}
          />
        </View>

        <View style={styles.selectSpacing}>
          <Input
            type="numeric"
            value={formData.cycle > 0 ? String(formData.cycle) : ''}
            onChange={(value: string) => {
              const numericValue = value.replace(/[^0-9]/g, '');
              setFormData(prev => ({ ...prev, cycle: numericValue ? parseInt(numericValue, 10) : 0 }));
            }}
            placeholder={t('onboarding.step1.cycle_duration_placeholder')}
          />
        </View>
        </View>

        <View style={styles.buttonContainer}>
          <ButtonGradient
            disabled={isFormInvalid || isUpdatingProfile || isUpdatingMedical}
            title={isUpdatingProfile || isUpdatingMedical ? t('onboarding.step1.saving') : t('onboarding.step1.next')}
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
    marginBottom: 24,
    marginTop: 12,
  },
  calendarSpacing: {
    marginTop: 16,
    marginBottom: 24,
  },
  selectSpacing: {
    marginBottom: 24,
  },
  buttonContainer: {
    paddingTop: 16,
    paddingBottom: 36,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export function getCurrentCycleDates(startDate: string, cycleLength: number) {
  const start = dayjs(startDate);
  return Array.from({ length: cycleLength }, (_, i) => start.add(i, 'day'));
}
