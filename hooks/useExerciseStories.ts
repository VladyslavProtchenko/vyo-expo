import { Story } from '@/app/(tabs)/components/StoriesModal';
import { createMenstrualStories } from '@/components/stories/sport/SlidesMenstrual';
import { createFollicularStories } from '@/components/stories/sport/SlidesFollicular';
import { createOvulationStories } from '@/components/stories/sport/SlidesOvulation';
import { createLutealStories } from '@/components/stories/sport/SlidesLuteal';
import { CurrentPhaseInfo, PhaseName } from '@/store/phase';
import useStoriesStore from '@/store/useStoriesStore';
import { useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';

export function useExerciseStories(): Story[] {
  const { phaseName } = CurrentPhaseInfo();
  const close = useStoriesStore((s) => s.close);
  const router = useRouter();

  const navigate = useCallback(() => {
    close();
    router.push('/body-care' as any);
  }, [close]);

  return useMemo(() => {
    const creators: Record<PhaseName, (nav?: () => void) => Story[]> = {
      menstrual: createMenstrualStories,
      follicular: createFollicularStories,
      ovulation: createOvulationStories,
      luteal: createLutealStories,
    };
    return creators[phaseName]?.(navigate) ?? [];
  }, [phaseName, navigate]);
}
