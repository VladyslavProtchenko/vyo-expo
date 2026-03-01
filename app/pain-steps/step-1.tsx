import Progress from '@/components/Progress';
import ButtonGradient from '@/components/ui/ButtonGradient';
import Number from '@/components/ui/Number';
import Slider from '@/components/ui/Slider';
import { typography } from '@/constants/typography';
import { useOnboardingData } from '@/hooks/useOnboardingData';
import { useUpdateMedicalData } from '@/hooks/useUpdateMedicalData';
import { PAIN_TYPES, PainType } from '@/types/diagnosis';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function PainStep1() {
  const router = useRouter();
  const { data } = useOnboardingData();
  const { mutate: updateMedical, isPending: isUpdatingMedical } = useUpdateMedicalData();
  const [formData, setFormData] = useState({
    painIntensity: 0,
    painType: '' as PainType | '',
  });

  useEffect(() => {
    if (data?.medical) {
      setFormData({
        painIntensity: data.medical.pain_intensity || 0,
        painType: (data.medical.pain_type as PainType) || '',
      });
    }
  }, [data]);

  const goBack = () => router.back();

  const next = () => {
    if (formData.painType === '' || formData.painIntensity === 0) return;
    
    updateMedical(
      {
        pain_type: formData.painType || undefined,
        pain_intensity: formData.painIntensity || undefined,
      },
      { onSuccess: () => router.push('/pain-steps/step-2' as any) }
    );
  };

  const title = isUpdatingMedical ? "Saving..." : 'Next';
  const isDisabled = formData.painType === '' || formData.painIntensity === 0 || isUpdatingMedical;
  const progressPercentage = 25;

  return (
    <View style={styles.container}>
      <Progress 
        percentage={progressPercentage} 
        isSkip={false} 
        goBack={goBack}
        currentStep={1}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Number number="1" />
        <Text style={[typography.h1, styles.title]}>Your period</Text>
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
      </ScrollView>

      <View style={styles.buttonContainer}>
        <ButtonGradient
          disabled={isDisabled}
          title={title}
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
