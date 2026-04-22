import { Story } from '@/app/(tabs)/components/StoriesModal';
import { createFollicularStories } from '@/components/stories/nutrition-normal/SlidesFollicular';
import { createLutealStories } from '@/components/stories/nutrition-normal/SlidesLuteal';
import { createMenstrualStories } from '@/components/stories/nutrition-normal/SlidesMenstrual';
import { createOvulationStories } from '@/components/stories/nutrition-normal/SlidesOvulation';
import { createFollicularStoriesEndo } from '@/components/stories/nutrition-endo/SlidesFollicular';
import { createLutealStoriesEndo } from '@/components/stories/nutrition-endo/SlidesLuteal';
import { createMenstrualStoriesEndo } from '@/components/stories/nutrition-endo/SlidesMenstrual';
import { createOvulationStoriesEndo } from '@/components/stories/nutrition-endo/SlidesOvulation';
import { CurrentPhaseInfo, PhaseName } from '@/store/phase';
import useUserStore from '@/store/useUserStore';
import useStoriesStore from '@/store/useStoriesStore';
import { useRouter } from 'expo-router';
import { ImageSourcePropType } from 'react-native';
import { useCallback, useMemo } from 'react';

export type ArticleCardData = {
  image: ImageSourcePropType;
  titleKey: string;
  timeKey: string;
};

const ARTICLE_MAP: Record<PhaseName, { normal: ArticleCardData; endo: ArticleCardData }> = {
  menstrual: {
    normal: {
      image: require('@/assets/images/nutrients/article-card-m.webp'),
      titleKey: 'nutrition_stories.menstrual.slide5.article_title',
      timeKey: 'nutrition_stories.menstrual.slide5.article_time',
    },
    endo: {
      image: require('@/assets/images/nutrients/article-card-m.webp'),
      titleKey: 'nutrition_stories_endo.menstrual.slide6.article_title',
      timeKey: 'nutrition_stories_endo.menstrual.slide6.article_time',
    },
  },
  follicular: {
    normal: {
      image: require('@/assets/images/nutrients/article-card-f.webp'),
      titleKey: 'nutrition_stories.follicular.slide2.article_title',
      timeKey: 'nutrition_stories.follicular.slide2.article_time',
    },
    endo: {
      image: require('@/assets/images/nutrients/article-card-f.webp'),
      titleKey: 'nutrition_stories_endo.follicular.slide2.article_title',
      timeKey: 'nutrition_stories_endo.follicular.slide2.article_time',
    },
  },
  ovulation: {
    normal: {
      image: require('@/assets/images/nutrients/article-card-o.webp'),
      titleKey: 'nutrition_stories.ovulation.slide3.article_title',
      timeKey: 'nutrition_stories.ovulation.slide3.article_time',
    },
    endo: {
      image: require('@/assets/images/nutrients/article-card-o.webp'),
      titleKey: 'nutrition_stories_endo.ovulation.slide3.article_title',
      timeKey: 'nutrition_stories_endo.ovulation.slide3.article_time',
    },
  },
  luteal: {
    normal: {
      image: require('@/assets/images/nutrients/article-card-l.webp'),
      titleKey: 'nutrition_stories.luteal.slide3.article_title',
      timeKey: 'nutrition_stories.luteal.slide3.article_time',
    },
    endo: {
      image: require('@/assets/images/nutrients/article-card-l.webp'),
      titleKey: 'nutrition_stories_endo.luteal.slide3.article_title',
      timeKey: 'nutrition_stories_endo.luteal.slide3.article_time',
    },
  },
};

type NutritionStoriesResult = {
  stories: Story[];
  articleId: string;
  articleCardData: ArticleCardData;
};

/**
 * @param source - 'phase' shows buttons on last slide (+ article card for menstrual),
 *                 'products' shows only article card, no buttons
 */
export function useNutritionStories(source: 'phase' | 'products' = 'phase'): NutritionStoriesResult {
  const { phaseName } = CurrentPhaseInfo();
  const diagnosis = useUserStore((s) => s.diagnosis);
  const isEndo = diagnosis !== null && diagnosis !== 'normal';
  const router = useRouter();
  const close = useStoriesStore((s) => s.close);

  const articleId = `${phaseName}-${isEndo ? 'endo' : 'general'}`;

  const navigateToArticle = useCallback(() => {
    close();
    router.push({ pathname: '/nutrition-article', params: { id: articleId } } as any);
  }, [articleId, close]);

  const navigateToProducts = useCallback(() => {
    close();
    router.push('/products' as any);
  }, [close]);

  const stories = useMemo<Story[]>(() => {
    if (source === 'products') {
      // From products page: article card only, no navigation buttons
      if (isEndo) {
        return {
          menstrual: createMenstrualStoriesEndo(navigateToArticle),
          follicular: createFollicularStoriesEndo(undefined, navigateToArticle),
          ovulation: createOvulationStoriesEndo(undefined, navigateToArticle),
          luteal: createLutealStoriesEndo(undefined, navigateToArticle),
        }[phaseName] ?? [];
      }
      return {
        menstrual: createMenstrualStories(navigateToArticle),
        follicular: createFollicularStories(undefined, navigateToArticle),
        ovulation: createOvulationStories(undefined, navigateToArticle),
        luteal: createLutealStories(undefined, navigateToArticle),
      }[phaseName] ?? [];
    }

    // From phase page: buttons + article card for menstrual
    const nav = phaseName === 'menstrual' ? navigateToArticle : navigateToProducts;

    if (isEndo) {
      return {
        menstrual: createMenstrualStoriesEndo(nav),
        follicular: createFollicularStoriesEndo(nav),
        ovulation: createOvulationStoriesEndo(nav),
        luteal: createLutealStoriesEndo(nav),
      }[phaseName] ?? [];
    }

    return {
      menstrual: createMenstrualStories(nav),
      follicular: createFollicularStories(nav),
      ovulation: createOvulationStories(nav),
      luteal: createLutealStories(nav),
    }[phaseName] ?? [];
  }, [phaseName, isEndo, source, navigateToArticle, navigateToProducts]);

  return {
    stories,
    articleId,
    articleCardData: ARTICLE_MAP[phaseName][isEndo ? 'endo' : 'normal'],
  };
}
