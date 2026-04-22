import ButtonGradient from '@/components/ui/ButtonGradient';
import { typography } from '@/constants/typography';
import { useGetDiagnosis } from '@/hooks/useDiagnosisData';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { STORAGE_URL } from '@/config/supabase'


const CONTENT= {
  //Normal
  0:'Based on your responses, there are no signs that typically require medical evaluation at this time. However, even mild pain is worth discussing with a doctor — especially if your symptoms change or begin to interfere with daily life.',

  //Endometriosis
  1:'Your symptoms may be linked to conditions like endometriosis - a condition that can affect various aspects of health and quality of life. Please talk to you gynecologist for clarity.',
  2:'Your symptoms may be part of endometriosis, especially if they follow a cyclical pattern. This condition can sometimes affect bowel function, causing discomfort, bloating, or changes in digestion. Please talk to you gynecologist for clarity.',
  3:'Your symptoms may be related to endometriosis — a condition that can affect not only the reproductive system but also overall well-being. Fatigue, sleep disturbances, mood changes, or inflammatory symptoms may all be part of a complex picture. Please talk to you gynecologist for clarity.',
  4:'A combination of pain and fatigue may indicate endometriosis or adenomyosis. These conditions often overlap and can cause not only physical discomfort but also fatigue, emotional strain, and unexplained exhaustion. Please talk to you gynecologist for clarity.',
  5:'Pelvic pain combined with gastrointestinal symptoms may be linked to endometriosis, especially if they occur cyclically. The condition can affect bowel function, causing bloating, discomfort, or digestive changes. Please talk to you gynecologist for clarity.',
  6:'Systemic fatigue and gastrointestinal symptoms may be linked to endometriosis, even without significant pelvic pain. The condition can present in various ways, including fatigue, bloating, digestive changes, or emotional strain. Please talk to you gynecologist for clarity.',
  7:'Pain, systemic fatigue, and gastrointestinal symptoms may be linked to endometriosis. The condition can appear subtly through fatigue, digestive changes, emotional strain, or cycle irregularities. Please talk to you gynecologist for clarity.',
  8:'Pain, systemic fatigue, gastrointestinal symptoms, and structural changes—such as heavy periods or an enlarged uterus—may suggest endometriosis or adenomyosis. These conditions share overlapping features but differ in tissue involvement, pain patterns, and impact on the uterus. Please talk to you gynecologist for clarity.',

  // Primary Dysmenorrhea
  9: 'Your responses are consistent with signs of primary dysmenorrhea — menstrual pain that often occurs due to hormonal changes during the reproductive years. This is not a diagnosis. We recommend speaking with a doctor to discuss your symptoms.',

  // PCOS High Risk
  10: 'Based on your symptoms (irregular cycles and signs of androgen excess), there is a high probability of PCOS. We recommend scheduling a pelvic ultrasound (TVUS) to check for polycystic ovarian morphology',
  // Metabolic Type (middle, possible)
  11:'As your symptoms may be linked to metabolic changes, we recommend checking your fasting glucose and insulin levels to calculate the HOMA-IR index (a key marker of insulin resistance).'
}

const getContentCase = (diagnosis: string | null, endo_type: number | null, pcos_type: string | null): number => {
  if (diagnosis === 'normal') return 0;
  if (diagnosis === 'endometriosis') {
    const type = endo_type ?? 0;
    return type >= 1 && type <= 8 ? type : 0;
  }
  if (diagnosis === 'dysmenorrhea') return 9;
  if (diagnosis === 'pcos') return pcos_type === 'high' ? 10 : 11;
  return 0;
};

export default function CarePlanPreview() {
  const router = useRouter();
  const { data: diagnosisData } = useGetDiagnosis();

  const contentCase = getContentCase(
    diagnosisData?.diagnosis ?? null,
    diagnosisData?.endo_type ?? null,
    diagnosisData?.pcos_type ?? null,
  );
  const contentText = CONTENT[contentCase as keyof typeof CONTENT];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}>
          <View style={styles.bottomCoverWrapper}>
            <Image
              source={{ uri: `${STORAGE_URL}/content/care-plan/care-plan-preview.webp` }}
              style={styles.bottomCoverImage}
              contentFit="cover"
            />
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={[typography.h1, styles.title]}>Thank you for sharing!</Text>
              <Image source={{ uri: `${STORAGE_URL}/content/care-plan/pink.webp` }} style={styles.cardHeaderImage} />
            </View>
            <Text style={[typography.p, { marginBottom: 8 }]}>{contentText}</Text>
            <Text style={[typography.p]}>{"Remember — you’re not alone in this. We’re here to support you through the pain, and your personalized care plan is just one click away."}</Text>
          </View>
          <View style={styles.card}>
            <Image source={{ uri: `${STORAGE_URL}/content/care-plan/green.webp` }} style={styles.pink} />
            <Text style={[typography.h1, styles.title, { marginBottom: 8 }]}>Backed by science</Text>
            <Text style={[typography.p]}>The plan is science-based, built on modern protocols, and validated by medical experts</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <ButtonGradient
            title="Jump right in"
            onPress={() => router.push("/(tabs)/home" as any)}
            icon={<MaterialIcons name="arrow-forward" size={24} color="black" />}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#F3F3F3',
  },
  imageContainer: {
    width: '100%',
    height: 300,
  },
  bottomCoverWrapper: {
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  bottomCoverImage: {
    width: '100%',
    height: '150%',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  content: {
    gap: 12,
    paddingHorizontal: 16,
    marginTop: -80,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardHeaderImage: {
    width: 45,
    height: 45,
  },
  title: {
    fontSize: 24,
    width: '70%',
    lineHeight: 24,
  },
  pink: {
    width: 34,
    height: 34,
    marginBottom: 12,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 36,
    paddingTop: 32,
  },
});
