export type DiagnosisType =
  | 'Normal'
  | 'Endometriosis'
  | 'Adenomyosis'
  | 'Fibroids'
  | 'Infertillity'
  | 'Polycystic ovary syndrome'
  | 'Cysts'
  | 'Hyperplasia'
  | "Haven't done it";

export const DIAGNOSIS_LABELS: DiagnosisType[] = [
  'Normal',
  'Endometriosis',
  'Adenomyosis',
  'Fibroids',
  'Infertillity',
  'Polycystic ovary syndrome',
  'Cysts',
  'Hyperplasia',
  "Haven't done it",
];


export type SymptomType =
  | 'Nausea'
  | 'Diarrhea'
  | 'Headache'
  | 'Dizziness'
  | 'Intermenstrual bleeding';

export const SYMPTOM_LABELS: SymptomType[] = [
  'Nausea',
  'Diarrhea',
  'Headache',
  'Dizziness',
  'Intermenstrual bleeding',
];

export type FlowType =
  | 'Medium'
  | 'Moderately elevated'
  | 'Heavy / Clots'
  | 'Light / Spotting';

export const FLOW_LABELS: FlowType[] = [
  'Medium',
  'Moderately elevated',
  'Heavy / Clots',
  'Light / Spotting',
];

export type RegularPeriodType =
  | 'Regular'
  | 'Not regular'
  | 'Long delays/Amenorrhea';

export const REGULAR_PERIOD_LABELS: RegularPeriodType[] = [
  'Regular',
  'Not regular',
  'Long delays/Amenorrhea',
];

export type PainType =
  | 'Cramping'
  | 'Aching'
  | 'Sharp'
  | 'Dull';

export const PAIN_TYPES: PainType[] = [
  'Cramping',
  'Aching',
  'Sharp',
  'Dull',
];

export type PainPeriodType =
  | 'Before period'
  | 'During period'
  | 'Ovulation'
  | 'Not phase-dependent'
  | 'Inconsistent';

export const PAIN_PERIODS: PainPeriodType[] = [
  'Before period',
  'During period',
  'Ovulation',
  'Not phase-dependent',
  'Inconsistent',
];

export type PainLocationType =
  | 'Lower abdomen'
  | 'Lower back'
  | 'Legs'
  | 'Pelvic area';

export const PAIN_LOCATIONS: PainLocationType[] = [
  'Lower abdomen',
  'Lower back',
  'Legs',
  'Pelvic area',
];

export type PainDurationType =
  | '1-2 days'
  | 'Few hours'
  | '>2 days';

export const PAIN_DURATIONS: PainDurationType[] = [
  '1-2 days',
  'Few hours',
  '>2 days',
];

export type PainCaseType =
  | 'Physical activity'
  | 'Intercourse'
  | 'Bowel movement'
  | 'Urination'
  | 'No connection with actions';

export const PAIN_CASES: PainCaseType[] = [
  'Physical activity',
  'Intercourse',
  'Bowel movement',
  'Urination',
  'No connection with actions',
];

export type MedicineEffectType =
  | 'Weel relieve'
  | 'Partially help'
  | "Don't help"
  | "Don't use them";

export const MEDICINE_EFFECTS: MedicineEffectType[] = [
  'Weel relieve',
  'Partially help',
  "Don't help",
  "Don't use them",
];

export type PainChangeType =
  | 'No'
  | 'A little'
  | 'Nocitably'
  | 'Strongly'
  | 'The pain is new';

export const PAIN_CHANGES: PainChangeType[] = [
  'No',
  'A little',
  'Nocitably',
  'Strongly',
  'The pain is new',
];
