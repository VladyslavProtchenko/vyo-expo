import HomeHeader from '@/components/HomeHeader';
import CalendarWidgetNew from '@/components/home/CalendarWidgetNew';
import ExploreCard from '@/components/home/ExploreCard';
import FeelingCard from '@/components/home/FeelingCard';
import InfoCard from '@/components/home/InfoCard';
import Missions from '@/components/home/Missions';
import useStates from '@/store/useStates';
import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function HomePage() {
  const { isDayCardOpen } = useStates();
  const [isInfo, setIsInfo] = useState(true);

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
