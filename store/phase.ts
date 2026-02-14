import dayjs, { Dayjs } from 'dayjs';
import useUserStore from './useUserStore';

export type PhaseName = 'menstrual' | 'follicular' | 'ovulation' | 'luteal';

interface PhaseResult {
  phaseName: PhaseName;
  dayOfPhase: number;
  totalDays: number;
  label: string;
  color: string;
  cycleDates: Dayjs[];
  phases: {
    name: PhaseName;
    start: number;
    end: number;
    color: string;
  }[];
}

export function CurrentPhaseInfo(): PhaseResult {
  const state = useUserStore.getState();
  const { startMenstruation, menstruationDuration, cycleDuration } = state;

  // Fallback значения если данных нет
  const defaultStart = dayjs().subtract(14, 'day');
  const defaultCycleDuration = 28;
  const defaultMenstruationDuration = 5;

  const start = startMenstruation ? dayjs(startMenstruation) : defaultStart;
  const today = dayjs();
  const finalCycleDuration = cycleDuration || defaultCycleDuration;
  const finalMenstruationDuration = menstruationDuration || defaultMenstruationDuration;

  const cycleDates = Array.from({ length: finalCycleDuration }, (_, i) => start.add(i, 'day'));
  const diffFromStart = today.diff(start, 'day');
  const dayInCycle = (diffFromStart % finalCycleDuration + finalCycleDuration) % finalCycleDuration;

  const ovulationDay = finalCycleDuration - 14;

  const phases = [
    { name: 'menstrual', start: 0, end: finalMenstruationDuration - 1, color: 'red' },
    { name: 'follicular', start: finalMenstruationDuration, end: ovulationDay - 1, color: 'pink' },
    { name: 'ovulation', start: ovulationDay, end: ovulationDay, color: 'yellow' },
    { name: 'luteal', start: ovulationDay + 1, end: finalCycleDuration - 1, color: 'green' },
  ];

  const current = phases.find(phase => dayInCycle >= phase.start && dayInCycle <= phase.end) || phases[0];

  const dayOfPhase = dayInCycle - current.start + 1;
  const totalDays = current.end - current.start + 1;
  return {
    phaseName: current.name as PhaseName,
    dayOfPhase,
    totalDays,
    label: `${dayOfPhase}/${totalDays}`,
    color: current.color,
    cycleDates,
    phases: phases as { name: PhaseName; start: number; end: number; color: string; }[],
  };
}
