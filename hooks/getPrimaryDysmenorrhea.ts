import type { OnboardingData } from './useOnboardingData';

type DiagnosisResult = 'normal' | 'dysmenorrhea' | 'endometriosis';

const range = (age: number, min: number, max: number): boolean => age >= min && age <= max;
const has = (arr: string[], value: string): boolean => arr.includes(value);
const hasAny = (arr: string[], values: string[]): boolean => values.some(v => arr.includes(v));

export const getPrimaryDysmenorrhea = (data: OnboardingData | null | undefined): DiagnosisResult => {
  const scores = { primary: 0, secondary: 0, menstrualPain: 0 };

  const add = (pr: number, s: number, m: number) => {
    scores.primary += pr;
    scores.secondary += s;
    scores.menstrualPain += m;
  };

  const age = data?.profile?.age || 0;
  const diagnoses = (data?.medical?.diagnosed_conditions || []) as string[];
  const symptoms = (data?.medical?.symptoms || []) as string[];
  const flow = data?.medical?.flow || '';
  const isRegularPeriod = (data?.medical?.is_regular_period || []) as string[];
  const intensity = data?.medical?.pain_intensity || 0;
  const painType = data?.medical?.pain_type || '';
  const painPeriod = data?.medical?.pain_period || '';
  const painLocation = (data?.medical?.pain_location || []) as string[];
  const painDuration = data?.medical?.pain_duration || '';
  const painCase = data?.medical?.pain_case || '';
  const isMedicine = data?.medical?.is_medicine || '';
  const isPainChange = data?.medical?.is_pain_change || '';

  if (range(age, 13, 20)) add(3, 0, 2);
  else if (range(age, 21, 25)) add(2, 1, 2);
  else if (range(age, 26, 35)) add(1, 2, 1);
  else if (range(age, 36, 45)) add(0, 3, 0);
  else if (age > 45) add(-1, 3, -2);

  if (has(diagnoses, 'Normal')) add(3, 0, 2);
  else if (hasAny(diagnoses, ['Endometriosis', 'Adenomyosis', 'Fibroids', 'Infertillity', 'Polycystic ovary syndrome'])) add(-1, 3, -2);
  else if (has(diagnoses, 'Cysts')) add(0, 2, -1);
  else if (has(diagnoses, 'Hyperplasia')) add(0, 3, -2);

  if (has(symptoms, 'Nausea')) add(2, 1, 0);
  else if (has(symptoms, 'Diarrhea')) add(0, 3, 1);
  else if (has(symptoms, 'Headache')) add(1, 0, 0);
  else if (has(symptoms, 'Dizziness')) add(1, 1, 0);
  else if (has(symptoms, 'Intermenstrual bleeding')) add(-1, 3, -2);

  const flowMap: Record<string, [number, number, number]> = {
    'Medium': [0, 1, 3],
    'Moderately elevated': [0, 4, 0],
    'Heavy / Clots': [0, 3, -2],
    'Light / Spotting': [0, 2, -1],
  };
  if (flowMap[flow]) add(...flowMap[flow]);

  if (has(isRegularPeriod, 'Regular')) add(1, 0, 3);
  if (has(isRegularPeriod, 'Not regular')) add(3, 2, -1);
  if (has(isRegularPeriod, 'Long delays/Amenorrhea')) add(0, 3, -2);

  const painTypeMap: Record<string, [number, number, number]> = {
    'Cramping': [3, 0, 1],
    'Aching': [0, 3, 0],
    'Sharp': [2, 1, -1],
    'Dull': [0, 3, 0],
  };
  if (painTypeMap[painType]) add(...painTypeMap[painType]);

  if (intensity <= 3) add(0, 0, 3);
  else if (intensity >= 4 && intensity <= 6) add(2, 1, 0);
  else if (intensity > 6) add(3, 2, -2);

  const painPeriodMap: Record<string, [number, number, number]> = {
    'Before period': [3, 2, 1],
    'During period': [2, 1, 2],
    'Ovulation': [0, 2, 0],
    'Not phase-dependent': [-1, 3, -1],
    'Inconsistent': [0, 1, 0],
  };
  if (painPeriodMap[painPeriod]) add(...painPeriodMap[painPeriod]);

  if (has(painLocation, 'Lower abdomen')) add(3, 2, 0);
  if (has(painLocation, 'Lower back')) add(2, 2, 0);
  if (has(painLocation, 'Legs')) add(1, 3, 0);
  if (has(painLocation, 'Pelvic area')) add(0, 3, 0);

  const painDurationMap: Record<string, [number, number, number]> = {
    '1-2 days': [1, 0, 3],
    'Few hours': [3, 1, 1],
    '>2 days': [1, 3, -2],
  };
  if (painDurationMap[painDuration]) add(...painDurationMap[painDuration]);

  const painCaseMap: Record<string, [number, number, number]> = {
    'Physical activity': [-1, 2, 0],
    'Intercourse': [0, 3, 1],
    'Bowel movement': [0, 3, -1],
    'Urination': [0, 2, -1],
    'No connection with actions': [2, 0, 2],
  };
  if (painCaseMap[painCase]) add(...painCaseMap[painCase]);

  const medicineMap: Record<string, [number, number, number]> = {
    'Weel relieve': [3, 0, 3],
    'Well relieve': [3, 0, 3],
    'Partially help': [1, 2, 1],
    "Don't help": [-1, 3, -2],
  };
  if (medicineMap[isMedicine]) add(...medicineMap[isMedicine]);

  const painChangeMap: Record<string, [number, number, number]> = {
    'No': [2, 0, 2],
    'A little': [1, 1, 0],
    'Nocitably': [0, 3, -1],
    'Strongly': [-1, 3, -2],
    'The pain is new': [-2, 3, -2],
  };
  if (painChangeMap[isPainChange]) add(...painChangeMap[isPainChange]);

  // Combo rules
  if (painType === 'Cramping' && (isMedicine === 'Well relieve' || isMedicine === 'Weel relieve')) add(2, 0, 0);
  if (has(isRegularPeriod, 'Not regular') && painCase === 'Bowel movement') add(0, 2, 0);
  if (isPainChange !== 'No' && age > 25) add(-2, 0, 0);
  if (flow === 'Heavy / Clots' && has(isRegularPeriod, 'Not regular')) add(0, 2, 0);
  if (has(symptoms, 'Diarrhea') && has(symptoms, 'Nausea')) add(2, 0, 0);
  if (has(painLocation, 'Legs') && has(painLocation, 'Pelvic area')) add(0, 2, 0);
  if (has(isRegularPeriod, 'Regular') && flow === 'Medium') add(0, 0, 2);
  if (has(isRegularPeriod, 'Not regular') && flow === 'Light / Spotting') add(0, 2, 0);
  if (painPeriod === 'During period' && painDuration === '1-2 days') add(0, 2, 0);
  if (has(isRegularPeriod, 'Not regular') && has(isRegularPeriod, 'Long delays/Amenorrhea')) add(0, 2, -1);
  if (has(painLocation, 'Lower abdomen') && has(painLocation, 'Lower back') && has(painLocation, 'Legs')) add(0, 2, 0);
  if (has(symptoms, 'Nausea') && has(symptoms, 'Headache') && has(symptoms, 'Dizziness')) add(2, 0, 0);
  if ((isMedicine === 'Well relieve' || isMedicine === 'Weel relieve') && painDuration === 'Few hours') add(0, 0, 2);
  if (painCase === 'Bowel movement' && flow === 'Heavy / Clots') add(0, 2, -1);
  if (isPainChange !== 'No' && has(isRegularPeriod, 'Not regular') && !has(diagnoses, 'Normal') && !has(diagnoses, "Haven't done it")) add(0, 3, -2);

  const winner = Math.max(scores.primary, scores.secondary, scores.menstrualPain);

  if (winner === scores.primary) return 'dysmenorrhea';
  if (winner === scores.secondary) return 'endometriosis';
  return 'normal';
};
