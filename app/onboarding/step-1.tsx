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
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Step1() {
  const router = useRouter();
  const { data } = useOnboardingData();
  const { mutate: updateProfile, isPending: isUpdatingProfile } = useUpdateProfile();
  const { mutate: updateMedical, isPending: isUpdatingMedical } = useUpdateMedicalData();
  const [formData, setFormData] = useState({
    age: 0,
    menstruationDate: null as string | null,
    menstrDuration: 5,
    cycle: 0,
  });

  useEffect(() => {
    if (data) {
      setFormData({
        age: data.profile?.age && data.profile.age > 0 ? data.profile.age : 0,
        menstruationDate: data.medical?.start_menstruation || null,
        menstrDuration: data.medical?.menstruation_duration || 5,
        cycle: data.medical?.cycle_duration && data.medical.cycle_duration > 0 ? data.medical.cycle_duration : 0,
      });
    }
  }, [data]);

  const goBack = () => {
    router.back();
  };

  const next = () => {
    updateProfile(
      { age: formData.age },
      {
        onSuccess: () => {
          updateMedical(
            {
              start_menstruation: formData.menstruationDate,
              menstruation_duration: formData.menstrDuration,
              cycle_duration: formData.cycle,
            },
            {
              onSuccess: () => {
                router.push('/onboarding/step-2' as any);
              },
            }
          );
        },
      }
    );
  };

  const progressPercentage = 9.09; // Step 1 = 9.09% (1/11 * 100)

  return (
    <View style={styles.container}>
      <Progress 
        percentage={progressPercentage} 
        isSkip={false} 
        goBack={goBack}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Number number="1" />
        <Text style={[typography.h1, styles.title]}>Share for better care</Text>
        <Text style={typography.subtitle}>How old are you?</Text>
        <Text style={typography.p}>no matter your age, we know you're always fantastic ;)</Text>

        <View style={styles.calendarSpacing}>
          <Input
            type="numeric"
            value={formData.age > 0 ? String(formData.age) : ''}
            onChange={(value: string) => {
              const numericValue = value.replace(/[^0-9]/g, '');
              setFormData(prev => ({ ...prev, age: numericValue ? parseInt(numericValue, 10) : 0 }));
            }}
            placeholder="Your Age"
          />
        </View>

        <Text style={typography.subtitle}>Your cycle - we'll keep a calendar for you</Text>

        <View style={styles.calendarSpacing}>
          <Calendar
            value={formData.menstruationDate}
            setValue={(value) => setFormData(prev => ({ ...prev, menstruationDate: value }))}
            title="Start of last menstruation"
          />
        </View>

        <View style={styles.selectSpacing}>
          <Select
            title="Menstruation duration"
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
            placeholder="Cycle duration, ie 28 or 28-32"
          />
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <ButtonGradient
          disabled={!formData.age || !formData.menstruationDate || !formData.menstrDuration || !formData.cycle || isUpdatingProfile || isUpdatingMedical}
          title={isUpdatingProfile || isUpdatingMedical ? "Saving..." : "Next"}
          icon={(
            <MaterialIcons
              color={!formData.age || !formData.menstruationDate || !formData.menstrDuration || !formData.cycle ? '#999999' : '#000000'}
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
  calendarSpacing: {
    marginTop: 16,
    marginBottom: 24,
  },
  selectSpacing: {
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

export function getCurrentCycleDates(startDate: string, cycleLength: number) {
  const start = dayjs(startDate);
  return Array.from({ length: cycleLength }, (_, i) => start.add(i, 'day'));
}
