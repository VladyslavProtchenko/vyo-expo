import Progress from '@/components/Progress';
import ButtonGradient from '@/components/ui/ButtonGradient';
import Calendar from '@/components/ui/Calendar';
import Number from '@/components/ui/Number';
import { typography } from '@/constants/typography';
import useProfileStore from '@/store/useProfileStore';
// import { useSaveProfile } from '@/hooks/useProfileData';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const surgeries = [
  'Pelvis',
  'Lower abdomen',
  'None of these',
];

const otherSymptomsLabels = [
  'Fatigue',
  'Sleep disturbance',
  'Low energy',
  'Infertility',
  'Mood swings',
  'Depression',
  'Enlarged uterus',
  'Abnormal uterine bleeding',
];

export default function Step10() {
  const router = useRouter();
  const { setValue, surgery, surgeryDate, otherSymptoms, isDiagnosed } = useProfileStore();
  // const { saveProfileData, loading } = useSaveProfile();
  
  const [surgeryState, setSurgeryState] = useState<string>(surgery || '');
  const [surgeryDateState, setSurgeryDateState] = useState<string | null>(surgeryDate || null);
  const [otherSymptomsState, setOtherSymptomsState] = useState<string[]>(otherSymptoms || []);

  useEffect(() => {
    if (surgery) setSurgeryState(surgery);
    if (surgeryDate) setSurgeryDateState(surgeryDate);
    if (otherSymptoms) setOtherSymptomsState(otherSymptoms);
  }, [surgery, surgeryDate, otherSymptoms]);

  const goBack = () => {
    router.back();
  };

  const handleSkip = () => {
    router.push('/sync-data' as any);
  };

  const selectTag = (tag: string, isActive: boolean) => {
    isActive
      ? setOtherSymptomsState(otherSymptomsState.filter(item => item !== tag))
      : setOtherSymptomsState([...otherSymptomsState, tag]);
  };

  const next = () => {
    if (isDiagnosed) {
      setValue(surgeryState, 'surgery');
      setValue(surgeryDateState, 'surgeryDate');
      setValue(otherSymptomsState, 'otherSymptoms');
    } else {
      setValue(otherSymptomsState, 'otherSymptoms');
    }

    // const result = await saveProfileData();
    // if (result.success) {
    //   console.log('✅ Onboarding completed and data saved');
    //   router.push('/sync-data' as any);
    // } else {
    //   console.error('❌ Failed to save profile data:', result.error);
    // }

    router.push('/sync-data' as any);
  };

  const progressPercentage = 100; // Step 10 = 100%

  return (
    <View style={styles.container}>
      <Progress
        percentage={progressPercentage}
        isSkip={true}
        goBack={goBack}
        onSkip={handleSkip}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Number number="10" />
        {isDiagnosed ? (
          <>
            <Text style={[typography.h1, styles.title]}>Did you have a surgery?</Text>
            <Text style={typography.subtitle}>Select all relevant</Text>

            <View style={styles.tagsContainer}>
              {surgeries.map(item => {
                const isActive = surgeryState === item;
                return (
                  <Pressable key={item} onPress={() => setSurgeryState(item)}>
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

            <Text style={[typography.subtitle, styles.subtitleSpacing]}>When it happened?</Text>
            <View style={styles.calendarSpacing}>
              <Calendar
                title="Select date"
                value={surgeryDateState}
                setValue={setSurgeryDateState}
              />
            </View>
          </>
        ) : (
          <>
            <Text style={[typography.h1, styles.title]}>Other symptoms</Text>
            <Text style={typography.subtitle}>Select all you're experiencing</Text>

            <View style={styles.tagsContainer}>
              {otherSymptomsLabels.map(item => {
                const isActive = otherSymptomsState.find(i => i === item) ? true : false;
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
          </>
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <ButtonGradient
          disabled={
            isDiagnosed
              ? surgeryState === '' || surgeryDateState === null || surgeryDateState === ''
              : otherSymptomsState.length === 0
          }
          title="Get my care plan"
          icon={(
            <MaterialIcons
              color={
                isDiagnosed
                  ? surgeryState === '' || surgeryDateState === null || surgeryDateState === ''
                    ? '#999999'
                    : '#000000'
                  : otherSymptomsState.length === 0
                    ? '#999999'
                    : '#000000'
              }
              name="trending-flat"
              size={28}
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
  subtitleSpacing: {
    marginTop: 16,
    marginBottom: 16,
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
  calendarSpacing: {
    marginTop: 16,
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
