import { STORAGE_URL } from '@/config/supabase'
export type StressArticle = {
  id: number;
  cardTitle?: string;
  cardSubtitle?: string;
  title: string;
  subtitle: string;
  time?: number;
  image: string;
  tag: 'Breathing' | 'Forest bathing' | 'Cute therapy' | 'PMR' | 'Singing';
  videoUrl?: string;
  videos?: string[];
  author?: {
    name: string;
    title: string;
    image: string;
  };
  keyTakeways: string;
  technique?: string;
  duration?: string;
  goal?: string;
  howToDo?: string[];
  howItWorks?: string;
  science?: string;
  references: { text: string; url?: string }[];
  isCute?: boolean;
  isForest?: boolean;
  forestImage?: string;
};

const REFERENCES = [
  {
    text: 'Study: Balban et al., 2023',
    url: 'https://www.cell.com/current-biology/fulltext/S0960-9822(23)00223-7',
  },
  {
    text: 'The Effect of Diaphragmatic Breathing on Attention, Negative Affect and Stress in Healthy Adults.',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5455070/',
  },
  {
    text: 'Environmental noise and sleep disturbance: research in Central, Eastern and South-Eastern Europe and Newly Independent States. ',
    url: 'https://pubmed.ncbi.nlm.nih.gov/23412575/',
  },
  {
    text: 'The Effect of Diaphragmatic Breathing on Attention, Negative Affect and Stress in Healthy Adults',
    url: 'https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2017.00874/full',
  },
  {
    text: 'Shinrin-Yoku (Forest Bathing) and Nature Therapy: A State-of-the-Art Review.',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5580555/',
  },
]
export const stressArticles: StressArticle[] = [
  {
    id: 1,
    cardTitle: 'Physiological sigh',
    title: 'Physiological sigh',
    subtitle: 'the fastest way to calm stress',
    time: 15,
    image: `${STORAGE_URL}/content/stress-management/stress-1.webp`,
    tag: 'Breathing',
    videoUrl: 'kTI2pBKAcQ0',
    author: { name: 'Alex Smirnov', title: 'Certified Psychologist/Psychotherapist with trauma and PTSD focus', image: `${STORAGE_URL}/content/stress-management/author-1.webp` },
    keyTakeways: "Managing stress doesn't have to be complicated. These five science-backed techniques—physiological sigh, diaphragmatic breathing, resistance breathing, box breathing, and Shinrin-yoku (Forest Bathing)—help calm your nervous system, restore energy, and improve focus, whether you have a few seconds or several minutes.",
    technique: 'Double inhale → long exhale',
    duration: '1–3 breaths',
    goal: 'Rapid stress relief',
    howToDo: [
      'Inhale through your nose, then take a short extra “sip” of air (double inhale).',
      'Exhale slowly through your mouth, making the exhale about twice as long as your inhale.',
    ],
    howItWorks: 'This breathing pattern fully expands the alveoli and accelerates CO₂ release, slowing the heart rate and quickly engaging the parasympathetic nervous system.',
    science: 'A study from Stanford University (Balban et al., 2023) found the physiological sigh to be one of the fastest techniques for reducing stress and improving mood—faster even than mindfulness meditation.',
    references: REFERENCES,
  },
  {
    id: 2,
    title: 'Diaphragmatic breathing',
    cardTitle: 'Diaphragmatic breathing',
    subtitle: 'gentle calm and energy restoration',
    time: 5,
    image: `${STORAGE_URL}/content/stress-management/stress-2.webp`,
    tag: 'Breathing',
    videoUrl: 'J9UkZcfMRQY',
    author: { name: 'Lily Smirnova', title: 'Stress researcher in women, VYO founder', image: `${STORAGE_URL}/content/stress-management/author-2.webp` },
    keyTakeways: 'Managing stress doesn’t have to be complicated. These five science-backed techniques—physiological sigh, diaphragmatic breathing, resistance breathing, box breathing, and Shinrin-yoku (Forest Bathing)—help calm your nervous system, restore energy, and improve focus, whether you have a few seconds or several minutes.',
    technique: 'Deep belly breathing',
    duration: '3–5 minutes',
    goal: 'Lower cortisol, calm the nervous system, restore energy',
    howToDo: [
      'Place one hand on your belly.',
      'Inhale through your nose, letting your belly expand.',
      'Exhale slowly, feeling your belly fall. Keep your chest relaxed.',
    ],
    howItWorks: 'Diaphragmatic breathing activates the vagus nerve, promoting a parasympathetic (rest-and-digest) state. Benefits include lower stress hormones, better digestion, and emotional stability.',
    references: REFERENCES,
  },
  {
    id: 3,
    title: 'Breathing with resistance',
    cardTitle: 'Breathing with resistance',
    subtitle: 'strengthen your core and lungs',
    time: 15,
    image: `${STORAGE_URL}/content/stress-management/stress-3.webp`,
    tag: 'Breathing',
    videoUrl: 'W0KWvOsgpYk',
    author: { name: 'Alex Smirnov', title: 'Certified Psychologist/Psychotherapist with trauma and PTSD focus', image: `${STORAGE_URL}/content/stress-management/author-1.webp` },
    keyTakeways: 'Managing stress doesn’t have to be complicated. These five science-backed techniques—physiological sigh, diaphragmatic breathing, resistance breathing, box breathing, and Shinrin-yoku (Forest Bathing)—help calm your nervous system, restore energy, and improve focus, whether you have a few seconds or several minutes.',
    technique: 'Belly breathing with light',
    duration: '3–5 minutes',
    goal: 'Deep diaphragm activation, improved breathing pattern, calm + core stability',
    howToDo: [
      'Wrap a band around your lower ribs.',
      'Inhale through your nose, expanding against the band.',
      'Exhale slowly with control, maintaining a steady rhythm.',
    ],
    howItWorks: 'Resistance enhances diaphragm strength, improves lung expansion, and increases oxygen exchange. It supports physical performance, recovery, and in patients with respiratory dysfunction, can improve breathing mechanics and reduce symptoms.',
    references: REFERENCES,
  },
  {
    id: 4,
    cardTitle: 'Box breathing',
    title: 'Box breathing',
    subtitle: 'calmness and focus under pressure',
    time: 15,
    image: `${STORAGE_URL}/content/stress-management/stress-4.webp`,
    tag: 'Breathing',
    videoUrl: 'clJKYv-rL5g',
    author: { name: 'Lily Smirnova', title: 'Stress researcher in women, VYO founder', image: `${STORAGE_URL}/content/stress-management/author-2.webp` },
    keyTakeways: 'Managing stress doesn’t have to be complicated. These five science-backed techniques—physiological sigh, diaphragmatic breathing, resistance breathing, box breathing, and Shinrin-yoku (Forest Bathing)—help calm your nervous system, restore energy, and improve focus, whether you have a few seconds or several minutes.',
    technique: 'Inhale → hold → exhale → hold',
    duration: '3–5 minutes',
    goal: 'Balance calm with mental clarity',
    howToDo: [
      'Inhale — 4 sec',
      'Hold — 4 sec',
      'Exhale — 4 sec',
      'Hold — 4 sec',
      'Repeat',
    ],
    howItWorks: 'Box breathing regulates the autonomic nervous system while maintaining focus, helping you stay sharp in high-pressure situations. It is commonly used in elite performance settings, including military training like the United States Navy SEALs.',
    science: 'This method improves heart rate variability and cognitive performance while promoting a calm yet alert mental state.',
    references: REFERENCES,
  },
  {
    id: 5,
    isForest: true,
    forestImage: `${STORAGE_URL}/content/stress-management/forest-bg.webp`,
    cardTitle: 'Forest bathing',
    title: 'Shinrin-yoku (forest bathing)',
    subtitle: 'mindful immersion in nature',
    time: 15,
    image: `${STORAGE_URL}/content/stress-management/stress-5.webp`,
    tag: 'Forest bathing',
    videoUrl: '',
    author: { name: 'Lily Smirnova', title: 'Stress researcher in women, VYO founder', image: `${STORAGE_URL}/content/stress-management/author-2.webp` },
    keyTakeways: 'Managing stress doesn’t have to be complicated. These five science-backed techniques—physiological sigh, diaphragmatic breathing, resistance breathing, box breathing, and Shinrin-yoku (Forest Bathing)—help calm your nervous system, restore energy, and improve focus, whether you have a few seconds or several minutes.',
    technique: 'Slow, mindful engagement with a forest environment using all five senses',
    duration: 'Flexible; 20–60 minutes recommended for noticeable effects',
    goal: 'Reduce stress, improve mental well-being, and boost immunity',
    howToDo: [
      'Walk slowly and deliberately through a forest or natural area.',
      'Notice the sights, sounds, smells, textures, and even tastes around you.',
      'Avoid rushing or exercising vigorously—focus on mindful presence.',
    ],
    howItWorks: 'Shinrin-yoku literally means “taking in the forest atmosphere” or “forest bathing.” Unlike hiking, it’s not about physical exertion but about deep, deliberate immersion in nature. Research shows it lowers cortisol, reduces blood pressure, improves mood, decreases mental fatigue, and enhances natural killer cell activity, boosting the immune system.',
    references: REFERENCES,
  },
  {
    id: 6,
    isCute: true,
    cardTitle: 'Cute "therapy"',
    cardSubtitle: 'Video feed',
    title: 'Take a minute',
    subtitle: 'let this soften your mood',
    image: `${STORAGE_URL}/content/stress-management/stress-6.webp`,
    tag: 'Cute therapy',
    keyTakeways: 'Managing stress doesn’t have to be complicated. These five science-backed techniques—physiological sigh, diaphragmatic breathing, resistance breathing, box breathing, and Shinrin-yoku (Forest Bathing)—help calm your nervous system, restore energy, and improve focus, whether you have a few seconds or several minutes.',
    videos: ['kTI2pBKAcQ0', 'J9UkZcfMRQY', 'W0KWvOsgpYk', 'clJKYv-rL5g'],
    references: REFERENCES,
  },
];
