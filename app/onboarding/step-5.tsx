import ButtonGradient from '@/components/ui/ButtonGradient';
import Number from '@/components/ui/Number';
import Progress from '@/components/Progress';
import { typography } from '@/constants/typography';
import useProfileStore from '@/store/useProfileStore';
import { FLOW_LABELS, FlowType, REGULAR_PERIOD_LABELS, RegularPeriodType } from '@/types/diagnosis';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Step5() {
  const router = useRouter();
  const { setValue, flow, isRegularPeriod } = useProfileStore();
  const [isRegular, setIsRegular] = useState<RegularPeriodType[]>([]);
  const [flowState, setFlowState] = useState<FlowType | ''>('');

  useEffect(() => {
    if (Array.isArray(isRegularPeriod) && isRegularPeriod.length > 0) {
      setIsRegular(isRegularPeriod as RegularPeriodType[]);
    }
    if (flow) setFlowState(flow as FlowType);
  }, [flow, isRegularPeriod]);

  const goBack = () => {
    router.back();
  };

  const handleSkip = () => {
    router.push('/sync-data' as any);
  };

  const selectRegularPeriod = (period: RegularPeriodType, isActive: boolean) => {
    isActive
      ? setIsRegular(isRegular.filter(item => item !== period))
      : setIsRegular([...isRegular, period]);
  };

  const next = () => {
    setValue(flowState, 'flow');
    setValue(isRegular, 'isRegularPeriod');
    router.push('/onboarding/step-6' as any);
  };

  const progressPercentage = 44.44; // Step 5 = 44.44%

  return (
    <View style={styles.container}>
      <Progress 
        percentage={progressPercentage} 
        isSkip={true} 
        goBack={goBack}
        onSkip={handleSkip}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Number number="5" />
        <Text style={[typography.h1, styles.title]}>Is your period regular?</Text>
        <Text style={[typography.subtitle, styles.subtitle]}>What is your flow?</Text>
        
        <View style={[styles.tagsContainer, styles.flowContainer]}>
          {FLOW_LABELS.map(item => {
            const isActive = flowState === item;
            return (
              <Pressable key={item} onPress={() => setFlowState(item)}>
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
            const isActive = isRegular.find(i => i === item) ? true : false;
            return (
              <Pressable key={item} onPress={() => selectRegularPeriod(item, isActive)}>
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
          disabled={flowState === '' || isRegular.length === 0}
          title="Next"
          icon={(
            <MaterialIcons
              color={flowState === '' || isRegular.length === 0 ? '#999999' : '#000000'}
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
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingVertical: 12,
  },
  flowContainer: {
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
