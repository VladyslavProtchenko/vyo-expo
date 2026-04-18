import { STORAGE_URL } from '@/config/supabase'
export type BodyCareArticle = {
  id: number;
  title: string;
  time: number;
  image: string;
  videoUrl: string;
  author: {
    name: string;
    title: string;
    image: string;
  };
  model: {
    name: string;
    text: string;
  };
  subtitle: string;
  versionTitle: string;
  summary: string[];
  keyInsights: string[];
  howToPractice: string[];
  howToPracticeText: string;
  commonMistakes: string[];
  references: string[];
};

export const bodyCareArticles: BodyCareArticle[] = [
  {
    id: 1,
    title: 'Pelvic floor: Awareness',
    time: 15,
    image: `${STORAGE_URL}/content/body-care/body-care-1.webp`,
    videoUrl: 'xgEc42wNd-E',
    author: {
      name: 'Viktoriia Kubyshena',
      title: "Physical Therapist, MSK rehab & women's health",
      image: `${STORAGE_URL}/content/body-care/author.webp`,
    },
    model: {
      name: 'Viktoria Khemych',
      text: 'Inclusive model, mentor at the rehab centre; suffers from severe period pain',
    },
    subtitle: '',
    versionTitle: '',
    summary: [
      'A gentle, breath-led practice to improve awareness and relaxation of the pelvic floor. It focuses on coordination between breathing and muscle movement rather than strength.',
      '👉Overactive (too tense) muscles are as problematic as weak ones, especially in chronic pain and hormonal conditions.',
    ],
    keyInsights: [
      'Best for reducing tension and pain',
      'Improves mind–muscle connection',
      'Activates parasympathetic (relaxation) response',
      'Essential first step before strengthening',
    ],
    howToPractice: [
      'Inhale → belly expands, pelvic floor relaxes',
      'Slow exhale → gently lift pelvic floor inward and upward',
      'Keep glutes and abs relaxed',
    ],
    howToPracticeText: '👉 Focus on slow, controlled breathing and full relaxation',
    commonMistakes: [
      'Holding breath',
      'Over-engaging abs',
      'Squeezing glutes',
      'Not fully relaxing between repetitions',
    ],
    references: [
      'International Continence Society — coordination and relaxation principles',
      'Breathing and pelvic floor muscle coordination',
      'American College of Obstetricians and Gynecologists',
    ],
  },
  {
    id: 2,
    title: 'Pelvic floor: Awareness',
    time: 5,
    image: `${STORAGE_URL}/content/body-care/body-care-2.webp`,
    videoUrl: 'uavBK-zkT_c',
    author: {
      name: 'Viktoriia Kubyshena',
      title: "Physical Therapist, MSK rehab & women's health",
      image: `${STORAGE_URL}/content/body-care/author.webp`,
    },
    model: {
      name: 'Viktoria Khemych',
      text: 'Inclusive model, mentor at the rehab centre; suffers from severe period pain',
    },
    subtitle: 'Reduce pain, control bladder, improve core',
    versionTitle: 'Quick breath version',
    summary: [
      'A dynamic practice that trains the pelvic floor to respond quickly and reflexively. Helps improve functional activation and responsiveness in daily movements.',
    ],
    keyInsights: [
      'Improves reflex activation (important for daily life)',
      'Supports bladder control (e.g., coughing, sneezing)',
      'Builds coordination under dynamic conditions',
      'Prevents delayed or weak muscle response',
    ],
    howToPractice: [
      'Short inhale',
      'Quick exhale → lightly engage pelvic floor',
      'Immediately relax',
    ],
    howToPracticeText: '👉 Keep contractions light and fast, no holding',
    commonMistakes: [
      'Holding breath',
      'Over-engaging abs',
      'Squeezing glutes',
      'Not fully relaxing between repetitions',
    ],
    references: [
      'International Continence Society',
      'Pelvic floor muscle training and urinary incontinence',
      'American College of Obstetricians and Gynecologists',
    ],
  },
  {
    id: 3,
    title: 'Pelvic floor: Awareness',
    time: 15,
    image: `${STORAGE_URL}/content/body-care/body-care-3.webp`,
    videoUrl: 'nC8ngEMcVuY',
    author: {
      name: 'Viktoriia Kubyshena',
      title: "Physical Therapist, MSK rehab & women's health",
      image: `${STORAGE_URL}/content/body-care/author.webp`,
    },
    model: {
      name: 'Viktoria Khemych',
      text: 'Inclusive model, mentor at the rehab centre; suffers from severe period pain',
    },
    subtitle: 'Reduce pain, control bladder, improve core',
    versionTitle: 'With breath hold',
    summary: [
      'A controlled activation practice combining contraction with a short hold. Helps build strength and endurance while maintaining proper muscle coordination.',
    ],
    keyInsights: [
      'Improves muscle control and endurance',
      'Helps stabilize pelvic and core systems',
      'Supports strength without overtraining',
      'Must be balanced with full relaxation',
    ],
    howToPractice: [
      'Inhale → prepare',
      'Exhale → lift pelvic floor',
      'Hold gently for a few seconds',
      'Fully relax after',
    ],
    howToPracticeText: '👉 Avoid over-tension — control is more important than intensity',
    commonMistakes: [
      'Over-engaging abs',
      'Squeezing glutes',
      'Not fully relaxing between repetitions',
    ],
    references: [
      'Pelvic floor muscle training effectiveness',
      'International Continence Society',
      'American College of Obstetricians and Gynecologists',
    ],
  },
];
