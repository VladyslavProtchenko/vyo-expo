import Progress from '@/components/Progress';
import ButtonGradient from '@/components/ui/ButtonGradient';
import Calendar from '@/components/ui/Calendar';
import Input from '@/components/ui/Input';
import Number from '@/components/ui/Number';
import Select from '@/components/ui/Select';
import { typography } from '@/constants/typography';
import useRegistrationStore from '@/store/useRegistrationStore';
import { MaterialIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Step1() {
  const router = useRouter();
  const { setValue, age, startMenstruation, menstruationDuration, cycleDuration } = useRegistrationStore();
  const [ageState, setAgeState] = useState<number>(0);
  const [menstruationDate, setMenstruationDate] = useState<string | null>(null);
  const [menstrDuration, setMenstrDuration] = useState<number>(5);
  const [cycle, setCycle] = useState<number>(0);

  useEffect(() => {
    if (age && age > 0) setAgeState(age);
    if (startMenstruation) setMenstruationDate(startMenstruation);
    if (menstruationDuration) setMenstrDuration(menstruationDuration);
    if (cycleDuration && cycleDuration > 0) setCycle(cycleDuration);
  }, [age, startMenstruation, menstruationDuration, cycleDuration]);

  const goBack = () => {
    router.back();
  };

  const handleSkip = () => {
    router.push('/sync-data' as any);
  };

  const next = () => {
    setValue(ageState, 'age');
    setValue(menstruationDate, 'startMenstruation');
    setValue(menstrDuration, 'menstruationDuration');
    setValue(cycle, 'cycleDuration');
    router.push('/onboarding/step-2' as any);
  };

  const progressPercentage = 9.09; // Step 1 = 9.09% (1/11 * 100)

  return (
    <View style={styles.container}>
      <Progress 
        percentage={progressPercentage} 
        isSkip={false} 
        goBack={goBack}
        onSkip={handleSkip}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Number number="1" />
        <Text style={[typography.h1, styles.title]}>Share for better care</Text>
        <Text style={typography.subtitle}>How old are you?</Text>
        <Text style={typography.p}>no matter your age, we know you're always fantastic ;)</Text>

        <View style={styles.calendarSpacing}>
          <Input
            type="numeric"
            value={ageState > 0 ? String(ageState) : ''}
            onChange={(value: string) => {
              const numericValue = value.replace(/[^0-9]/g, '');
              setAgeState(numericValue ? parseInt(numericValue, 10) : 0);
            }}
            placeholder="Your Age"
          />
        </View>

        <Text style={typography.subtitle}>Your cycle - we'll keep a calendar for you</Text>

        <View style={styles.calendarSpacing}>
          <Calendar
            value={menstruationDate}
            setValue={setMenstruationDate}
            title="Start of last menstruation"
          />
        </View>

        <View style={styles.selectSpacing}>
          <Select
            title="Menstruation duration"
            value={menstrDuration}
            setValue={setMenstrDuration}
            values={Array.from({ length: 16 }, (_, i) => i + 1)}
          />
        </View>

        <View style={styles.selectSpacing}>
          <Input
            type="numeric"
            value={cycle > 0 ? String(cycle) : ''}
            onChange={(value: string) => {
              const numericValue = value.replace(/[^0-9]/g, '');
              setCycle(numericValue ? parseInt(numericValue, 10) : 0);
            }}
            placeholder="Cycle duration, ie 28 or 28-32"
          />
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <ButtonGradient
          disabled={!ageState || !menstruationDate || !menstrDuration || !cycle}
          title="Next"
          icon={(
            <MaterialIcons
              color={!ageState || !menstruationDate || !menstrDuration || !cycle ? '#999999' : '#000000'}
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
