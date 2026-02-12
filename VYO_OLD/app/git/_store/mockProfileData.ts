export const MOCK_PROFILE_DATA = {
  name: 'Lily Anderson',
  email: 'lily@example.com',
  age: 28,

  weight: 65,
  height: 170,
  waist: 75,
  hips: 95,
  unitSystem: 'metric' as const,

  startMenstruation: '2026-01-01',
  menstruationDuration: 5,
  cycleDuration: 28,

  diagnoses: ['Endometriosis', 'PCOS'] as any[],

  symptoms: ['Chronic pelvic pain', 'Heavy bleeding', 'Fatigue'] as any[],

  flow: 'Heavy',
  isRegularPeriod: ['Yes'],

  isPain: true,
  painType: 'Cramping',
  intensity: 7,

  painPeriod: 'During menstruation',
  painLocation: ['Lower abdomen', 'Lower back'],
  painDuration: '2-3 days',

  painCase: 'Gets worse over time',
  isMedicine: 'Yes, ibuprofen',

  isPainChange: 'No change',

  surgery: 'Laparoscopy',
  surgeryDate: '2024-06-15',
  otherSymptoms: ['Bloating', 'Mood swings'],

  isDiagnosed: true,
  finished: true,
};

export const loadMockProfileData = (setValue: (data: any, key: string) => void) => {
  Object.entries(MOCK_PROFILE_DATA).forEach(([key, value]) => {
    setValue(value, key);
  });
  console.log('✅ Mock profile data loaded');
};

