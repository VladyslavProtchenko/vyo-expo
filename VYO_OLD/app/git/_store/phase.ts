import dayjs, { Dayjs } from 'dayjs';
import useProfileStore from './useProfileStore';

export type PhaseName = 'menstrual' | 'follicular' | 'ovulation' | 'luteal';

interface PhaseResult {
  phaseName: PhaseName;
  currentDay: number;
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
  const state = useProfileStore.getState();
  const { startMenstruation, menstruationDuration, cycleDuration } = state;

  const start = dayjs(startMenstruation);
  const today = dayjs();

  const cycleDates = Array.from({ length: cycleDuration }, (_, i) => start.add(i, 'day'));
  const diffFromStart = today.diff(start, 'day');
  const dayInCycle = (diffFromStart % cycleDuration + cycleDuration) % cycleDuration;

  const ovulationDay = cycleDuration - 14;

  const phases = [
    { name: 'menstrual', start: 0, end: menstruationDuration - 1, color: 'red' },
    { name: 'follicular', start: menstruationDuration, end: ovulationDay - 1, color: 'pink' },
    { name: 'ovulation', start: ovulationDay, end: ovulationDay, color: 'yellow' },
    { name: 'luteal', start: ovulationDay + 1, end: cycleDuration - 1, color: 'green' },
  ];

  const current = phases.find(phase => dayInCycle >= phase.start && dayInCycle <= phase.end)!;

  const currentDay = dayInCycle - current.start + 1;
  const totalDays = current.end - current.start + 1;
  return {
    phaseName: current.name as PhaseName,
    currentDay,
    totalDays,
    label: `${currentDay}/${totalDays}`,
    color: current.color,
    cycleDates,
    phases: phases as { name: PhaseName; start: number; end: number; color: string; }[],
  };
}
