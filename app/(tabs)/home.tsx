import CalendarWidgetNew from '@/app/(tabs)/components/CalendarWidgetNew';
import ExploreCard from '@/app/(tabs)/components/ExploreCard';
import FeelingCard from '@/app/(tabs)/components/FeelingCard';
import InfoCard from '@/app/(tabs)/components/InfoCard';
import Missions from '@/app/(tabs)/components/Missions';
import SkipPoster from '@/app/phase/components/SkipPoster';
import HomeHeader from '@/components/HomeHeader';
import { useDismissAnnouncement } from '@/hooks/useDismissAnnouncement';
import { useGlobalAnnouncement } from '@/hooks/useGlobalAnnouncement';
import { useLoadUserData } from '@/hooks/useLoadUserData';
import useStates from '@/store/useStates';
import useUserStore from '@/store/useUserStore';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

const CYCLE_KEY = 'last_seen_cycle';

function getCurrentCycleStart(
  startMenstruation: string | null,
  cycleDuration: number,
): string | null {
  if (!startMenstruation) return null;
  const today = dayjs();
  const start = dayjs(startMenstruation);
  const currentCycleIndex = Math.floor(today.diff(start, 'day') / cycleDuration);
  return start.add(currentCycleIndex * cycleDuration, 'day').format('YYYY-MM-DD');
}

export default function HomePage() {
  const { isDayCardOpen, setIsDayCardOpen } = useStates();
  const { refetch: loadUserData } = useLoadUserData();
  const { isQuizSkipped, startMenstruation, cycleDuration } = useUserStore();
  const { data: announcement } = useGlobalAnnouncement();
  const dismissAnnouncement = useDismissAnnouncement();

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  useEffect(() => {
    const currentKey = getCurrentCycleStart(startMenstruation, cycleDuration);
    if (!currentKey) return;
    const lastKey = localStorage.getItem(CYCLE_KEY);
    if (lastKey !== currentKey) {
      setIsDayCardOpen(true);
      localStorage.setItem(CYCLE_KEY, currentKey);
    }
  }, [startMenstruation, cycleDuration]);

  const handleDismissAnnouncement = () => {
    if (announcement?.id) {
      dismissAnnouncement.mutate(announcement.id);
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <HomeHeader />
      <CalendarWidgetNew />
      {/* <YoutubeCard playButtonPosition="center" playButtonSize={50} /> */}
      {isDayCardOpen && <ExploreCard />}
      {announcement && (
        <InfoCard 
          title={announcement.title} 
          description={announcement.description} 
          onClose={handleDismissAnnouncement} 
        />
      )}
      {isQuizSkipped && <SkipPoster style={{ marginTop: 24 }} />}
      <Missions />
      <FeelingCard />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 200, 
  },
});
