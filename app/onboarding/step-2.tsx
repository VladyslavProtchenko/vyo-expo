import Progress from '@/components/Progress';
import ButtonGradient from '@/components/ui/ButtonGradient';
import Input from '@/components/ui/Input';
import Number from '@/components/ui/Number';
import { typography } from '@/constants/typography';
import { useOnboardingData } from '@/hooks/useOnboardingData';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
import { MaterialIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Step2() {
  const router = useRouter();
  const { data } = useOnboardingData();
  const { mutate: updateProfile, isPending: isUpdatingProfile } = useUpdateProfile();
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    waist: '',
    hips: '',
    unitSystem: 'metric' as 'metric' | 'imperial',
  });

  useEffect(() => {
    if (data) {
      setFormData({
        weight: data.profile?.weight && data.profile.weight > 0 ? String(data.profile.weight) : '',
        height: data.profile?.height && data.profile.height > 0 ? String(data.profile.height) : '',
        waist: data.profile?.waist && data.profile.waist > 0 ? String(data.profile.waist) : '',
        hips: data.profile?.hips && data.profile.hips > 0 ? String(data.profile.hips) : '',
        unitSystem: data.profile?.unit_system || 'metric',
      });
    }
  }, [data]);

  const handleNumericChange = (value: string, field: 'weight' | 'height' | 'waist' | 'hips') => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    setFormData(prev => ({ ...prev, [field]: numericValue }));
  };

  const goBack = () => {
    router.push('/onboarding/step-1' as any);
  };

  const next = () => {
    updateProfile(
      {
        weight: formData.weight ? parseFloat(formData.weight) : undefined,
        height: formData.height ? parseFloat(formData.height) : undefined,
        waist: formData.waist ? parseFloat(formData.waist) : undefined,
        hips: formData.hips ? parseFloat(formData.hips) : undefined,
        unit_system: formData.unitSystem,
      },
      {
        onSuccess: () => {
          router.push('/onboarding/step-3' as any);
        },
      }
    );
  };

  const progressPercentage = 18.18; // Step 2 = 18.18% (2/11 * 100)
  
  return (
    <View style={styles.container}>
      <Progress 
        percentage={progressPercentage} 
        isSkip={true} 
        goBack={goBack}
        currentStep={2}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Number number="2" />
        <Text style={[typography.h1, styles.title]}>Share for better care</Text>
        <Text style={typography.p}>We use this data to tailor your care plan and provide personalized nutrition and health insights.</Text>

        <View style={styles.unitSystemContainer}>
          <Text style={styles.unitSystemLabel}>Select measurement system</Text>
          <View style={styles.segmentedControl}>
            <Pressable
              style={[styles.segment, formData.unitSystem === 'metric' && styles.segmentActive]}
              onPress={() => setFormData(prev => ({ ...prev, unitSystem: 'metric' }))}
            >
              <Text style={[styles.segmentText, formData.unitSystem === 'metric' && styles.segmentTextActive]}>
                kg/cm
              </Text>
            </Pressable>
            <Pressable
              style={[styles.segment, formData.unitSystem === 'imperial' && styles.segmentActive]}
              onPress={() => setFormData(prev => ({ ...prev, unitSystem: 'imperial' }))}
            >
              <Text style={[styles.segmentText, formData.unitSystem === 'imperial' && styles.segmentTextActive]}>
                lb/ft
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.calendarSpacing}>
          <Input
            type="numeric"
            value={formData.weight}
            onChange={(value: string) => handleNumericChange(value, 'weight')}
            placeholder={formData.unitSystem === 'metric' ? 'Weight (kg)' : 'Weight (lbs)'}
          />
        </View>
        <View style={styles.calendarSpacing}>
          <Input
            type="numeric"
            value={formData.height}
            onChange={(value: string) => handleNumericChange(value, 'height')}
            placeholder={formData.unitSystem === 'metric' ? 'Height (cm)' : 'Height (in)'}
          />
        </View>
        
        <View style={styles.selectSpacing}>
          <Input
            type="numeric"
            value={formData.waist}
            onChange={(value: string) => handleNumericChange(value, 'waist')}
            placeholder={formData.unitSystem === 'metric' ? 'Waist (cm)' : 'Waist (in)'}
          />
        </View>
        
        <View style={styles.selectSpacing}>
          <Input
            type="numeric"
            value={formData.hips}
            onChange={(value: string) => handleNumericChange(value, 'hips')}
            placeholder={formData.unitSystem === 'metric' ? 'Hips (cm)' : 'Hips (in)'}
          />
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <ButtonGradient
          disabled={!formData.weight || !formData.height || !formData.waist || !formData.hips || isUpdatingProfile}
          title={isUpdatingProfile ? "Saving..." : "Next"}
          icon={(
            <MaterialIcons
              color={!formData.weight || !formData.height || !formData.waist || !formData.hips || isUpdatingProfile ? '#999999' : '#000000'}
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
