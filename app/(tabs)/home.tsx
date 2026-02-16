import HomeHeader from '@/components/HomeHeader';
import CalendarWidgetNew from '@/app/(tabs)/components/CalendarWidgetNew';
import ExploreCard from '@/app/(tabs)/components/ExploreCard';
import FeelingCard from '@/app/(tabs)/components/FeelingCard';
import InfoCard from '@/app/(tabs)/components/InfoCard';
import Missions from '@/app/(tabs)/components/Missions';
import { useLoadUserData } from '@/hooks/useLoadUserData';
import useStates from '@/store/useStates';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function HomePage() {
  const { isDayCardOpen } = useStates();
  const [isInfo, setIsInfo] = useState(true);
  const { refetch: loadUserData } = useLoadUserData();

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const infoCardData = {
    title: "We noticed you had less than 6 hours of sleep last night.",
    description: "During menstruation, your body needs more recovery. Lack of sleep can increase fatigue, pain, and sensitivity. If you can, try going to bed a bit earlier.",
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <HomeHeader />
      <CalendarWidgetNew />
      {isDayCardOpen && <ExploreCard />}
      {isInfo && <InfoCard title={infoCardData.title} description={infoCardData.description} onClose={() => setIsInfo(false)} />}
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
