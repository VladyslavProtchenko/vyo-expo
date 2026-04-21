import dayjs, { Dayjs } from 'dayjs';
import { PHASES, PHASE_NAMES, PhaseName } from '@/constants/phases';
import useUserStore from './useUserStore';

export type { PhaseName } from '@/constants/phases';
export { PHASES, PHASE_NAMES } from '@/constants/phases';

const DEFAULT_CYCLE_DURATION = 28;
const DEFAULT_MENSTRUATION_DURATION = 5;
const DEFAULT_LUTEAL_PHASE_LENGTH = 14;

interface PhaseResult {
  phaseName: PhaseName;
  dayOfPhase: number;
  totalDays: number;
  label: string;
  color: string;
  cycleDates: Dayjs[];
  fertileWindow: { start: number; end: number };
  phases: {
    name: PhaseName;
    start: number;
    end: number;
    color: string;
  }[];
}

interface PhaseInput {
  startMenstruation: string | null;
  menstruationDuration: number | null;
  cycleDuration: number | null;
}

// Pure function — no store dependency, testable, reusable
export function computePhaseInfo(input: PhaseInput): PhaseResult {
  const { startMenstruation, menstruationDuration, cycleDuration } = input;

  const defaultStart = dayjs().subtract(14, 'day');

  // Normalize to start of day to avoid time-of-day drift
  const start = (startMenstruation ? dayjs(startMenstruation) : defaultStart).startOf('day');
  const today = dayjs().startOf('day');
  const finalCycleDuration = cycleDuration || DEFAULT_CYCLE_DURATION;
  const finalMenstruationDuration = menstruationDuration || DEFAULT_MENSTRUATION_DURATION;

  const diffFromStart = today.diff(start, 'day');
  const dayInCycle = (diffFromStart % finalCycleDuration + finalCycleDuration) % finalCycleDuration;

  // cycleDates from the CURRENT cycle start, not the original start date
  const cyclesPassed = Math.floor(diffFromStart / finalCycleDuration);
  const currentCycleStart = start.add(cyclesPassed * finalCycleDuration, 'day');
  const cycleDates = Array.from({ length: finalCycleDuration }, (_, i) =>
    currentCycleStart.add(i, 'day')
  );

  // Luteal phase is ~14 days (relatively constant), ovulation counted from cycle end
  const ovulationDay = finalCycleDuration - DEFAULT_LUTEAL_PHASE_LENGTH;

  // Fertile window: 5 days before ovulation + ovulation day = 6 days
  // Based on: sperm survival (up to 5 days) + egg survival (12-24 hours)
  const fertileWindow = {
    start: Math.max(0, ovulationDay - 5),
    end: ovulationDay,
  };

  // Ovulation display phase: 2 days before + ovulation day + 1 day after
  const ovulationStart = ovulationDay - 2;
  const ovulationEnd = ovulationDay + 1;

  const phases = [
    { name: 'menstrual',  start: 0,                         end: finalMenstruationDuration - 1, color: PHASES.menstrual.color },
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
    fertileWindow,
    phases: validPhases as { name: PhaseName; start: number; end: number; color: string }[],
  };
}

// Non-reactive — for use in Zustand actions, queryFn, and other non-component contexts
export function CurrentPhaseInfo(): PhaseResult {
  const { startMenstruation, menstruationDuration, cycleDuration } = useUserStore.getState();
  return computePhaseInfo({ startMenstruation, menstruationDuration, cycleDuration });
}

// Reactive hook — for use in React components (re-renders when store changes)
export function useCurrentPhase(): PhaseResult {
  const startMenstruation = useUserStore((s) => s.startMenstruation);
  const menstruationDuration = useUserStore((s) => s.menstruationDuration);
  const cycleDuration = useUserStore((s) => s.cycleDuration);
  return computePhaseInfo({ startMenstruation, menstruationDuration, cycleDuration });
}
