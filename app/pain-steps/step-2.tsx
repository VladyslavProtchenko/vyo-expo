import Progress from '@/components/Progress';
import ButtonGradient from '@/components/ui/ButtonGradient';
import Number from '@/components/ui/Number';
import { typography } from '@/constants/typography';
import { useOnboardingData } from '@/hooks/useOnboardingData';
import { useUpdateMedicalData } from '@/hooks/useUpdateMedicalData';
import { PAIN_DURATIONS, PAIN_LOCATIONS, PAIN_PERIODS, PainDurationType, PainLocationType, PainPeriodType } from '@/types/diagnosis';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function PainStep2() {
  const router = useRouter();
  const { data } = useOnboardingData();
  const { mutate: updateMedical, isPending: isUpdatingMedical } = useUpdateMedicalData();
  const [formData, setFormData] = useState({
    painPeriod: '' as PainPeriodType | '',
    painLocation: [] as PainLocationType[],
    painDuration: '' as PainDurationType | '',
  });

  useEffect(() => {
    if (data?.medical) {
      setFormData({
        painPeriod: (data.medical.pain_period as PainPeriodType) || '',
        painLocation: (data.medical.pain_location as PainLocationType[]) || [],
        painDuration: (data.medical.pain_duration as PainDurationType) || '',
      });
    }
  }, [data]);

  const goBack = () => router.back();

  const selectPainLocation = (location: PainLocationType, isActive: boolean) => {
    isActive
      ? setFormData(prev => ({ ...prev, painLocation: prev.painLocation.filter(item => item !== location) }))
      : setFormData(prev => ({ ...prev, painLocation: [...prev.painLocation, location] }));
  };

  const next = () => {
    updateMedical(
      {
        pain_period: formData.painPeriod || undefined,
        pain_location: formData.painLocation,
        pain_duration: formData.painDuration || undefined,
      },
      { onSuccess: () => router.push('/pain-steps/step-3' as any) }
    );
  };

  const progressPercentage = 50;

  return (
    <View style={styles.container}>
      <Progress 
        percentage={progressPercentage} 
        isSkip={false} 
        goBack={goBack}
        currentStep={2}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Number number="2" />
        <Text style={[typography.h1, styles.title]}>Your pain details</Text>
        <Text style={typography.subtitle}>When do you feel the pain?</Text>

        <View style={styles.tagsContainer}>
          {PAIN_PERIODS.map(item => {
            const isActive = formData.painPeriod === item;
            return (
              <Pressable key={item} onPress={() => setFormData(prev => ({ ...prev, painPeriod: item }))}>
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

        <Text style={[typography.subtitle]}>Where do you feel the pain?</Text>
        <View style={styles.tagsContainer}>
          {PAIN_LOCATIONS.map(item => {
            const isActive = formData.painLocation.find(i => i === item) ? true : false;
            return (
              <Pressable key={item} onPress={() => selectPainLocation(item, isActive)}>
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

        <Text style={[typography.subtitle]}>How long does the pain last?</Text>
        <View style={styles.tagsContainer}>
          {PAIN_DURATIONS.map(item => {
            const isActive = formData.painDuration === item;
            return (
              <Pressable key={item} onPress={() => setFormData(prev => ({ ...prev, painDuration: item }))}>
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
      </ScrollView>

      <View style={styles.buttonContainer}>
        <ButtonGradient
          disabled={formData.painPeriod === '' || formData.painLocation.length === 0 || formData.painDuration === '' || isUpdatingMedical}
          title={isUpdatingMedical ? "Saving..." : "Next"}
          icon={(
            <MaterialIcons
              color={formData.painPeriod === '' || formData.painLocation.length === 0 || formData.painDuration === '' || isUpdatingMedical ? '#999999' : '#000000'}
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
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 36,
  },
});
