import Progress from '@/components/Progress';
import ButtonGradient from '@/components/ui/ButtonGradient';
import Number from '@/components/ui/Number';
import { typography } from '@/constants/typography';
import useRegistrationStore from '@/store/useRegistrationStore';
import { DIAGNOSIS_LABELS, DiagnosisType } from '@/types/diagnosis';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Step3() {
  const router = useRouter();
  const { setValue, diagnoses } = useRegistrationStore();
  const [tags, setTags] = useState<DiagnosisType[]>([]);

  useEffect(() => {
    if (diagnoses && diagnoses.length > 0) setTags(diagnoses);
  }, [diagnoses]);

  const goBack = () => {
    router.back();
  };

  const handleSkip = () => {
    router.push('/sync-data' as any);
  };

  const next = () => {
    if (tags.includes('Endometriosis') || tags.includes('Adenomyosis')) {
      setValue(true, 'isDiagnosed');
    }
    setValue(tags, 'diagnoses');
    router.push('/onboarding/step-4' as any);
  };

  const selectTag = (tag: DiagnosisType, isActive: boolean) => {
    isActive
      ? setTags(tags.filter(item => item !== tag))
      : setTags([...tags, tag]);
  };

  const progressPercentage = 27.27; // Step 3 = 27.27% (3/11 * 100)

  return (
    <View style={styles.container}>
      <Progress 
        percentage={progressPercentage} 
        isSkip={true} 
        goBack={goBack}
        onSkip={handleSkip}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Number number="3" />
        <Text style={[typography.h1, styles.title]}>Reproductive health</Text>
        <Text style={typography.subtitle}>What was the result of your gynecological examination in the past years?</Text>

        <View style={styles.tagsContainer}>
          {DIAGNOSIS_LABELS.map(item => {
            const isActive = tags.find(i => i === item) ? true : false;
            return (
              <Pressable key={item} onPress={() => selectTag(item, isActive)}>
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
          disabled={tags.length === 0}
          title="Next"
          icon={(
            <MaterialIcons
              color={tags.length === 0 ? '#999999' : '#000000'}
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
