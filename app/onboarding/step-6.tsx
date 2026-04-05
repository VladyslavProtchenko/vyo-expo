import Progress from '@/components/Progress';
import ButtonGradient from '@/components/ui/ButtonGradient';
import Number from '@/components/ui/Number';
import { typography } from '@/constants/typography';
import { useOnboardingData } from '@/hooks/useOnboardingData';
import { useUpdateMedicalData } from '@/hooks/useUpdateMedicalData';
import { FLOW_LABELS, FlowType, REGULAR_PERIOD_LABELS, RegularPeriodType } from '@/types/diagnosis';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Step6() {
  const router = useRouter();
  const { data } = useOnboardingData();
  const { mutate: updateMedical, isPending: isUpdatingMedical } = useUpdateMedicalData();
  const initialData = useRef({
    flow: '' as FlowType | '',
    isRegular: [] as RegularPeriodType[],
  });
  const [formData, setFormData] = useState(initialData.current);

  useEffect(() => {
    if (data?.medical) {
      const loaded = {
        flow: (data.medical.flow as FlowType) || '' as FlowType | '',
        isRegular: (data.medical.is_regular_period as RegularPeriodType[]) || [],
      };
      initialData.current = loaded;
      setFormData(loaded);
    }
  }, [data]);

  const goBack = () => {
    router.back();
  };

  const selectRegularPeriod = (period: RegularPeriodType) => {
    setFormData(prev => ({ ...prev, isRegular: [period] }));
  };

  const next = () => {
    const init = initialData.current;
    const hasChanges =
      formData.flow !== init.flow ||
      formData.isRegular[0] !== init.isRegular[0];

    if (!hasChanges) {
      router.push('/onboarding/step-7' as any);
      return;
    }

    updateMedical(
      { flow: formData.flow || undefined, is_regular_period: formData.isRegular },
      { onSuccess: () => router.push('/onboarding/step-7' as any) }
    );
  };

  const progressPercentage = 54.55; // Step 6 = 54.55% (6/11 * 100)

  return (
    <View style={styles.container}>
      <Progress 
        percentage={progressPercentage} 
        isSkip={true} 
        goBack={goBack}
        currentStep={6}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Number number="6" />
        <Text style={[typography.h1, styles.title]}>Is your period regular?</Text>
        <Text style={[typography.subtitle, styles.subtitle]}>What is your flow?</Text>
        
        <View style={[styles.tagsContainer, styles.flowContainer]}>
          {FLOW_LABELS.map(item => {
            const isActive = formData.flow === item;
            return (
              <Pressable key={item} onPress={() => setFormData(prev => ({ ...prev, flow: item }))}>
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

        <Text style={[typography.subtitle, styles.subtitle]}>Is your period regular?</Text>
        
        <View style={styles.tagsContainer}>
          {REGULAR_PERIOD_LABELS.map(item => {
            const isActive = formData.isRegular.find(i => i === item) ? true : false;
            return (
              <Pressable key={item} onPress={() => selectRegularPeriod(item)}>
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
          disabled={formData.flow === '' || formData.isRegular.length === 0 || isUpdatingMedical}
          title={isUpdatingMedical ? "Saving..." : "Next"}
          icon={(
            <MaterialIcons
              color={formData.flow === '' || formData.isRegular.length === 0 || isUpdatingMedical ? '#999999' : '#000000'}
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
  subtitle: {
    width: '100%',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  flowContainer: {
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 36,
  },
});
