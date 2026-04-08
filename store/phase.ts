import dayjs, { Dayjs } from 'dayjs';
import { PHASES, PHASE_NAMES, PhaseName } from '@/constants/phases';
import useUserStore from './useUserStore';

export type { PhaseName } from '@/constants/phases';
export { PHASES, PHASE_NAMES } from '@/constants/phases';

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

  // Normalize to start of day to avoid time-of-day drift
  const start = (startMenstruation ? dayjs(startMenstruation) : defaultStart).startOf('day');
  const today = dayjs().startOf('day');
  const finalCycleDuration = cycleDuration || defaultCycleDuration;
  const finalMenstruationDuration = menstruationDuration || defaultMenstruationDuration;

  const cycleDates = Array.from({ length: finalCycleDuration }, (_, i) => start.add(i, 'day'));
  const diffFromStart = today.diff(start, 'day');
  const dayInCycle = (diffFromStart % finalCycleDuration + finalCycleDuration) % finalCycleDuration;

  // Luteal phase is ~14 days (constant), so ovulation day is counted from end of cycle
  const ovulationDay = finalCycleDuration - 14;

  // Fertile/ovulation window: 2 days before ovulation + ovulation day + 1 day after = 4 days
  // Based on: sperm survival (5 days) + egg survival (1 day) = 6-day fertile window
  const ovulationStart = ovulationDay - 2;
  const ovulationEnd = ovulationDay + 1;

  const phases = [
    { name: 'menstrual',  start: 0,                          end: finalMenstruationDuration - 1, color: PHASES.menstrual.color },
    { name: 'follicular', start: finalMenstruationDuration,  end: ovulationStart - 1,            color: PHASES.follicular.color },
    { name: 'ovulation',  start: ovulationStart,             end: ovulationEnd,                  color: PHASES.ovulation.color },
    { name: 'luteal',     start: ovulationEnd + 1,           end: finalCycleDuration - 1,        color: PHASES.luteal.color },
  ];

  // Filter out phases that collapsed (can happen with very short cycles)
  const validPhases = phases.filter(p => p.start <= p.end);

  const current = validPhases.find(phase => dayInCycle >= phase.start && dayInCycle <= phase.end) || phases[0];

  const dayOfPhase = dayInCycle - current.start + 1;
  const totalDays = current.end - current.start + 1;
  return {
    phaseName: current.name as PhaseName,
    dayOfPhase,
    totalDays,
    label: `${dayOfPhase}/${totalDays}`,
    color: current.color,
    cycleDates,
    phases: validPhases as { name: PhaseName; start: number; end: number; color: string; }[],
  };
}
