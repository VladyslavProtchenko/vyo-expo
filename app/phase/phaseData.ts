export type PhaseName = 'menstrual' | 'follicular' | 'ovulation' | 'luteal';

export interface PhaseChallenge {
  emoji: string;
  label: string;
}

export interface PhaseData {
  fullName: string;
  challenges: PhaseChallenge[];
  description: string;
}

export const phaseData: Record<PhaseName, PhaseData> = {
  menstrual: {
    fullName: 'Menstrual phase',
    challenges: [
      { emoji: '😊', label: 'Sleepiness' },
      { emoji: '🔋', label: 'Low energy' },
      { emoji: '🌋', label: 'Acne' },
      { emoji: '😠', label: 'Irritability' },
      { emoji: '😩', label: 'Fatigue' },
      { emoji: '😐', label: 'Mood swings' },
      { emoji: '😔', label: 'Lower motivation' },
    ],
    description:
      "You're currently in the menstrual phase of your cycle — a time when your body naturally sheds the uterine lining, which causes bleeding.\n\nLevels of estradiol and progesterone are at their lowest, which may lead to mild fatigue, mood changes, or lower abdominal discomfort.",
  },
  follicular: {
    fullName: 'Follicular phase',
    challenges: [
      { emoji: '😊', label: 'Sleepiness' },
      { emoji: '🔋', label: 'Low energy' },
      { emoji: '🌋', label: 'Acne' },
      { emoji: '😠', label: 'Irritability' },
      { emoji: '😩', label: 'Fatigue' },
      { emoji: '😐', label: 'Mood swings' },
      { emoji: '😔', label: 'Lower motivation' },
    ],
    description:
      "You're currently in the follicular phase of your cycle — a time when your body prepares for ovulation by developing follicles in the ovaries.\n\nEstrogen levels are rising, which may boost energy, improve mood, and enhance cognitive function. This is often a great time for new projects and social activities.",
  },
  ovulation: {
    fullName: 'Ovulation phase',
    challenges: [
      { emoji: '😊', label: 'Sleepiness' },
      { emoji: '🔋', label: 'Low energy' },
      { emoji: '🌋', label: 'Acne' },
      { emoji: '😠', label: 'Irritability' },
      { emoji: '😩', label: 'Fatigue' },
      { emoji: '😐', label: 'Mood swings' },
      { emoji: '😔', label: 'Lower motivation' },
    ],
    description:
      "You're currently in the ovulation phase of your cycle — the time when an egg is released from the ovary.\n\nEstrogen and testosterone reach their peak, which may result in peak energy, confidence, and mental clarity. This is often an ideal time for important decisions and challenging tasks.",
  },
  luteal: {
    fullName: 'Luteal phase',
    challenges: [
      { emoji: '😊', label: 'Sleepiness' },
      { emoji: '🔋', label: 'Low energy' },
      { emoji: '🌋', label: 'Acne' },
      { emoji: '😠', label: 'Irritability' },
      { emoji: '😩', label: 'Fatigue' },
      { emoji: '😐', label: 'Mood swings' },
      { emoji: '😔', label: 'Lower motivation' },
    ],
    description:
      "You're currently in the luteal phase of your cycle — the time after ovulation when your body prepares for a potential pregnancy.\n\nProgesterone levels rise while estrogen fluctuates, which may lead to changes in energy, mood, and physical symptoms. This is often a time to focus on self-care and prepare for the next cycle.",
  },
};
