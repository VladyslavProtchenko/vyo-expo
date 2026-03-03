export const PHASE_NAMES = ['menstrual', 'follicular', 'ovulation', 'luteal'] as const;

export type PhaseName = (typeof PHASE_NAMES)[number];

export interface PhaseInfo {
  label: string;
  color: string;
  colorLight: string;
  order: number;
  icon: number;
  image: number;
}

export const PHASES: Record<PhaseName, PhaseInfo> = {
  menstrual: {
    label: 'Period',
    color: '#FF5B5B',
    colorLight: '#FFEFEF',
    order: 0,
    icon: require('@/assets/images/phases/phase-1.webp'),
    image: require('@/assets/images/phases/flower-1.webp'),
  },
  follicular: {
    label: 'Follicular',
    color: '#795BFF',
    colorLight: '#F8EFFF',
    order: 1,
    icon: require('@/assets/images/phases/phase-2.webp'),
    image: require('@/assets/images/phases/flower-2.webp'),
  },
  ovulation: {
    label: 'Ovulation',
    color: '#8FFF5B',
    colorLight: '#EFFFF1',
    order: 2,
    icon: require('@/assets/images/phases/phase-3.webp'),
    image: require('@/assets/images/phases/flower-3.webp'),
  },
  luteal: {
    label: 'Luteal',
    color: '#D15BFF',
    colorLight: '#F8EFFF',
    order: 3,
    icon: require('@/assets/images/phases/phase-4.webp'),
    image: require('@/assets/images/phases/flower-4.webp'),
  },
};
