import { OnboardingData } from "./useOnboardingData";

// 1 - High Risk (Suspected PCOS): 1 from Group A + 1 from Group B
// 2 - Moderate Risk (Metabolic Type): 1 from Group A + 1 from Group C
// 3 - Possible PCOS: 2+ from Group B with regular cycle
// 0 - No risk

export const getPCOS = (data: OnboardingData | null | undefined): number => {
  const isRegularPeriod = (data?.medical?.is_regular_period || []) as string[];
  const additionalSymptoms = (data?.medical?.additional_symptoms || []) as string[];
  const waist = data?.profile?.waist || 0;
  const hips = data?.profile?.hips || 0;

  const hasGroupA =
    isRegularPeriod.includes('Not regular') ||
    isRegularPeriod.includes('Long delays/Amenorrhea');

  const groupBCount = [
    additionalSymptoms.includes('Hirsutism*'),
    additionalSymptoms.includes('Acne'),
    additionalSymptoms.includes('Androgenic alopecia*'),
  ].filter(Boolean).length;
  const hasGroupB = groupBCount >= 1;
  const whr = hips > 0 ? waist / hips : 0;
  const hasGroupC = whr >= 0.85;
  if (hasGroupA && hasGroupB) return 1;
  if (hasGroupA && hasGroupC) return 2;
  if (!hasGroupA && groupBCount >= 2) return 3;
  return 0;
};
