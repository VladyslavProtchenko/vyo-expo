import Progress from '@/components/Progress';
import ButtonGradient from '@/components/ui/ButtonGradient';
import Number from '@/components/ui/Number';
import { typography } from '@/constants/typography';
import useRegistrationStore from '@/store/useRegistrationStore';
import { ADDITIONAL_SYMPTOM_LABELS, AdditionalSymptomType } from '@/types/diagnosis';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Step4() {
  const router = useRouter();
  const { setValue, additionalSymptoms } = useRegistrationStore();
  const [tags, setTags] = useState<AdditionalSymptomType[]>([]);

  useEffect(() => {
    if (additionalSymptoms && additionalSymptoms.length > 0) setTags(additionalSymptoms);
  }, [additionalSymptoms]);

  const goBack = () => {
    router.back();
  };

  const handleSkip = () => {
    router.push('/sync-data' as any);
  };

  const next = () => {
    setValue(tags, 'additionalSymptoms');
    router.push('/onboarding/step-5' as any);
  };
  const selectTag = (tag: AdditionalSymptomType, isActive: boolean) => {
    isActive
      ? setTags(tags.filter(item => item !== tag))
      : setTags([...tags, tag]);
  };

  const progressPercentage = 36.36; // Step 4 = 36.36% (4/11 * 100)

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
        <Text style={[typography.h1, styles.title]}>Additional symptoms</Text>
        <Text style={[typography.subtitle, styles.subtitle]}>Select all relevant</Text>
        <View style={styles.tagsContainer}>
          {ADDITIONAL_SYMPTOM_LABELS.map(item => {
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
        <Text style={[typography.p, styles.note]}>*Hirsutism - excessive growth of dark, coarse hair on the face, chest, or back;Androgenic alopecia - female pattern hair loss, thinning of hair on the top and crown of the head;Acanthosis nigricans - darkened, velvety patches of skin in folds like neck or armpits.</Text>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <ButtonGradient
          title="Next"
          icon={(
            <MaterialIcons
              color="#000000"
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
    flexGrow: 1,
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
  note: {
    marginTop: 'auto',
    marginBottom: 32,
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 19.6,
    letterSpacing: 0,
  },
});
