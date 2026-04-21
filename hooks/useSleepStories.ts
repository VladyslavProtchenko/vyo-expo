import { Story } from '@/app/(tabs)/components/StoriesModal';
import { createMenstrualStories } from '@/components/stories/sleep/SlidesMenstrual';
import { createFollicularStories } from '@/components/stories/sleep/SlidesFollicular';
import { createOvulationStories } from '@/components/stories/sleep/SlidesOvulation';
import { createLutealStories } from '@/components/stories/sleep/SlidesLuteal';
import { CurrentPhaseInfo, PhaseName } from '@/store/phase';
import useStoriesStore from '@/store/useStoriesStore';
import { useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';

export function useSleepStories(): Story[] {
  const { phaseName } = CurrentPhaseInfo();
  const close = useStoriesStore((s) => s.close);
  const router = useRouter();

  const navigate = useCallback(() => {
    close();
    router.push('/stress-management' as any);
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
