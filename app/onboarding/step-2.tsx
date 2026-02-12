import Progress from '@/components/Progress';
import ButtonGradient from '@/components/ui/ButtonGradient';
import Input from '@/components/ui/Input';
import Number from '@/components/ui/Number';
import { typography } from '@/constants/typography';
import useProfileStore from '@/store/useProfileStore';
import { MaterialIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Step2() {
  const router = useRouter();
  const { setValue, weight, height, waist, hips, unitSystem } = useProfileStore();
  const [weightState, setWeightState] = useState('');
  const [heightState, setHeightState] = useState('');
  const [waistState, setWaistState] = useState('');
  const [hipsState, setHipsState] = useState('');

  useEffect(() => {
    if (weight && weight > 0) setWeightState(String(weight));
    if (height && height > 0) setHeightState(String(height));
    if (waist && waist > 0) setWaistState(String(waist));
    if (hips && hips > 0) setHipsState(String(hips));
  }, [weight, height, waist, hips]);

  const handleNumericChange = (value: string, setter: (value: string) => void) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    setter(numericValue);
  };

  const goBack = () => {
    router.back();
  };

  const handleSkip = () => {
    router.push('/sync-data' as any);
  };

  const next = () => {
    const weightNum = weightState ? parseFloat(weightState) : 0;
    const heightNum = heightState ? parseFloat(heightState) : 0;
    const waistNum = waistState ? parseFloat(waistState) : 0;
    const hipsNum = hipsState ? parseFloat(hipsState) : 0;
    
    setValue(isNaN(weightNum) ? 0 : weightNum, 'weight');
    setValue(isNaN(heightNum) ? 0 : heightNum, 'height');
    setValue(isNaN(waistNum) ? 0 : waistNum, 'waist');
    setValue(isNaN(hipsNum) ? 0 : hipsNum, 'hips');
    router.push('/onboarding/step-3' as any);
  };

  const progressPercentage = 11.11; // Step 2 = 11.11%
  
  return (
    <View style={styles.container}>
      <Progress 
        percentage={progressPercentage} 
        isSkip={true} 
        goBack={goBack}
        onSkip={handleSkip}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Number number="2" />
        <Text style={[typography.h1, styles.title]}>Share for better care</Text>
        <Text style={typography.p}>We use this data to tailor your care plan and provide personalized nutrition and health insights.</Text>

        <View style={styles.unitSystemContainer}>
          <Text style={styles.unitSystemLabel}>Select measurement system</Text>
          <View style={styles.segmentedControl}>
            <Pressable
              style={[styles.segment, unitSystem === 'metric' && styles.segmentActive]}
              onPress={() => setValue('metric', 'unitSystem')}
            >
              <Text style={[styles.segmentText, unitSystem === 'metric' && styles.segmentTextActive]}>
                kg/cm
              </Text>
            </Pressable>
            <Pressable
              style={[styles.segment, unitSystem === 'imperial' && styles.segmentActive]}
              onPress={() => setValue('imperial', 'unitSystem')}
            >
              <Text style={[styles.segmentText, unitSystem === 'imperial' && styles.segmentTextActive]}>
                lb/ft
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.calendarSpacing}>
          <Input
            type="numeric"
            value={weightState}
            onChange={(value: string) => handleNumericChange(value, setWeightState)}
            placeholder={unitSystem === 'metric' ? 'Weight (kg)' : 'Weight (lbs)'}
          />
        </View>
        <View style={styles.calendarSpacing}>
          <Input
            type="numeric"
            value={heightState}
            onChange={(value: string) => handleNumericChange(value, setHeightState)}
            placeholder={unitSystem === 'metric' ? 'Height (cm)' : 'Height (in)'}
          />
        </View>
        
        <View style={styles.selectSpacing}>
          <Input
            type="numeric"
            value={waistState}
            onChange={(value: string) => handleNumericChange(value, setWaistState)}
            placeholder={unitSystem === 'metric' ? 'Waist (cm)' : 'Waist (in)'}
          />
        </View>
        
        <View style={styles.selectSpacing}>
          <Input
            type="numeric"
            value={hipsState}
            onChange={(value: string) => handleNumericChange(value, setHipsState)}
            placeholder={unitSystem === 'metric' ? 'Hips (cm)' : 'Hips (in)'}
          />
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <ButtonGradient
          disabled={!weightState || !heightState || !waistState || !hipsState}
          title="Next"
          icon={(
            <MaterialIcons
              color={!weightState || !heightState || !waistState || !hipsState ? '#999999' : '#000000'}
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
  unitSystemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 8,
  },
  unitSystemLabel: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
  },
  segmentedControl: {
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    padding: 2,
  },
  segment: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: 'transparent',
  },
  segmentActive: {
    backgroundColor: '#FFFFFF',
  },
  segmentText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  segmentTextActive: {
    color: '#1E3A8A',
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
