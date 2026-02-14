import Progress from '@/components/Progress';
import ButtonGradient from '@/components/ui/ButtonGradient';
import Number from '@/components/ui/Number';
import { typography } from '@/constants/typography';
import useRegistrationStore from '@/store/useRegistrationStore';
import { SYMPTOM_LABELS, SymptomType } from '@/types/diagnosis';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Step4() {
  const router = useRouter();
  const { setValue, symptoms } = useRegistrationStore();
  const [tags, setTags] = useState<SymptomType[]>([]);

  useEffect(() => {
    if (symptoms && symptoms.length > 0) setTags(symptoms);
  }, [symptoms]);

  const goBack = () => {
    router.back();
  };

  const handleSkip = () => {
    router.push('/sync-data' as any);
  };

  const next = () => {
    setValue(tags, 'symptoms');
    router.push('/onboarding/step-5' as any);
  };

  const selectTag = (tag: SymptomType, isActive: boolean) => {
    isActive
      ? setTags(tags.filter(item => item !== tag))
      : setTags([...tags, tag]);
  };

  const progressPercentage = 33.33; // Step 4 = 33.33%

  return (
    <View style={styles.container}>
      <Progress 
        percentage={progressPercentage} 
        isSkip={true} 
        goBack={goBack}
        onSkip={handleSkip}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Number number="4" />
        <Text style={[typography.h1, styles.title]}>Physical & Emotional wellbeing</Text>
        <Text style={[typography.subtitle, styles.subtitle]}>Select all relevant for your period</Text>
        
        <View style={styles.tagsContainer}>
          {SYMPTOM_LABELS.map(item => {
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
    marginBottom: 24,
    marginTop: 12,
  },
  subtitle: {
    width: '100%',
    marginBottom: 8,
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
