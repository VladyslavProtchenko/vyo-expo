import { STORAGE_URL } from '@/config/supabase'
export const PHASE_NAMES = ['menstrual', 'follicular', 'ovulation', 'luteal'] as const;

export const PhaseColors = {
  menstrual:  { main: '#FF5B5B', light: '#FFEFEF', calendar: '#FFBEBB' },
  follicular: { main: '#795BFF', light: '#F8EFFF', calendar: '#CABEFD' },
  ovulation:  { main: '#8FFF5B', light: '#EFFFF1', calendar: '#C7FFBB' },
  luteal:     { main: '#D15BFF', light: '#F8EFFF', calendar: '#ECBEFD' },
} as const;

export type PhaseName = (typeof PHASE_NAMES)[number];

export interface PhaseInfo {
  label: string;
  color: string;
  colorLight: string;
  colorCalendar: string;
  order: number;
  icon: string;
  image: string;
}

export const PHASES: Record<PhaseName, PhaseInfo> = {
  menstrual: {
    label: 'Period',
    color: PhaseColors.menstrual.main,
    colorLight: PhaseColors.menstrual.light,
    colorCalendar: PhaseColors.menstrual.calendar,
    order: 0,
    icon: `${STORAGE_URL}/content/phases/phase-1.webp`,
    image: `${STORAGE_URL}/content/phases/flower-1.webp`,
  },
  follicular: {
    label: 'Follicular',
    color: PhaseColors.follicular.main,
    colorLight: PhaseColors.follicular.light,
    colorCalendar: PhaseColors.follicular.calendar,
    order: 1,
    icon: `${STORAGE_URL}/content/phases/phase-2.webp`,
    image: `${STORAGE_URL}/content/phases/flower-2.webp`,
  },
  ovulation: {
    label: 'Ovulation',
    color: PhaseColors.ovulation.main,
    colorLight: PhaseColors.ovulation.light,
    colorCalendar: PhaseColors.ovulation.calendar,
    order: 2,
    icon: `${STORAGE_URL}/content/phases/phase-3.webp`,
    image: `${STORAGE_URL}/content/phases/flower-3.webp`,
  },
  luteal: {
    label: 'Luteal',
    color: PhaseColors.luteal.main,
    colorLight: PhaseColors.luteal.light,
    colorCalendar: PhaseColors.luteal.calendar,
    order: 3,
    icon: `${STORAGE_URL}/content/phases/phase-4.webp`,
    image: `${STORAGE_URL}/content/phases/flower-4.webp`,
  },
};
