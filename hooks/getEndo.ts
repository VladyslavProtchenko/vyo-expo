import { OnboardingData } from "./useOnboardingData";
export type ClusterType = 'Pain-dominant' | 'Gastrointestinal-dominant' | 'Systemic/Inflammatory' | 'separated';
const count = (flags: boolean[]): boolean => flags.filter(Boolean).length >= 2;

export const getEndoCluster = (data: OnboardingData | null | undefined): number => {
  const painLocation = (data?.medical?.pain_location || []) as string[];
  const painCase = data?.medical?.pain_case || '';
  const isMedicine = data?.medical?.is_medicine || '';
  const symptoms = (data?.medical?.symptoms || []) as string[];
  const otherSymptoms = (data?.medical?.other_symptoms || []) as string[];
  const diagnoses = (data?.medical?.diagnosed_conditions || []) as string[];
  const flow = data?.medical?.flow || '';

  const isPainDominant = count([
    painLocation.includes('Pelvic area'),
    painCase === 'Intercourse',
    painCase === 'Bowel movement',
    painCase === 'Urination',
    isMedicine === "Don't help",
  ]);

  const isGastrointestinalDominant = count([
    symptoms.includes('Nausea'),
    symptoms.includes('Diarrhea'),
    painCase === 'Bowel movement',
  ]);

  const isSystemicInflammatory = count([
    otherSymptoms.includes('Fatigue'),
    otherSymptoms.includes('Sleep disturbance'),
    otherSymptoms.includes('Depression'),
    otherSymptoms.includes('Mood swings'),
  ]);

  const isSeparated = count([
    diagnoses.includes('Infertillity'),
    flow === 'Heavy / Clots',
    otherSymptoms.includes('Abnormal uterine bleeding'),
    otherSymptoms.includes('Enlarged uterus'),
  ]);


  if (isPainDominant && isSystemicInflammatory && isGastrointestinalDominant && isSeparated) return 8;
  if (isPainDominant && isSystemicInflammatory && isGastrointestinalDominant) return 7;
  if (isSystemicInflammatory && isGastrointestinalDominant) return 6;
  if (isPainDominant && isGastrointestinalDominant) return 5;
  if (isPainDominant && isSystemicInflammatory) return 4;
  if (isSystemicInflammatory) return 3;
  if (isGastrointestinalDominant) return 2;
  if (isPainDominant) return 1;

  return 0;
};
