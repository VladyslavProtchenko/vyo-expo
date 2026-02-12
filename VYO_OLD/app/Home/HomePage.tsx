import { ScrollView, StyleSheet} from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../_types/types';
import HomeHeader from '../_components/HomeHeader';
import CalendarWidgetNew from './components/CalendarWidgetNew';
import Missions from './components/Missions';
import ExploreCard from './components/ExploreCard';
import InfoCard from './components/InfoCard';
import { useState } from 'react';
import useStates from '../_store/useStates';
import FeelingCard from './components/FeelingCard';

type HomeScreenProps = BottomTabScreenProps<TabParamList, 'Home'>;

export default function HomePage({navigation}: HomeScreenProps) {
  const { isDayCardOpen } = useStates();
  const [isInfo, setIsInfo] = useState(true)

  const infoCardData = {
    title: "We noticed you had less than 6 hours of sleep last night.",
    description: "During menstruation, your body needs more recovery. Lack of sleep can increase fatigue, pain, and sensitivity. If you can, try going to bed a bit earlier.",
  }

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
      {/* <DayCard /> */}
      <Missions />
      <FeelingCard navigation={navigation} />

      {/* <View style={styles.cards}>
        <View style={styles.cardImageContainer}>
          <Image source={require('../../assets/images/login.png')} style={styles.cardImage} />
        </View>
        <View style={styles.card}>
          <Image source={require('../../assets/images/icons/pinkHeart.png')} style={styles.cardIcon} />
          <Text style={[typography.h1, styles.cardTitle]}>My Care Plan</Text>
          <Text style={[typography.p, styles.carText]}>Endometriosis</Text>
          <Text style={[typography.p, styles.carText]}>10% completed</Text>
          <ProgressBar value={10} height={8} radius={4} trackColor="#E5E7EB" /> 
          <ButtonGradient 
            title='See Full Plan'
            onPress={() => {}}
            className={styles.cardButton}
            textStyle={{ fontSize: 14 }}
          />
        </View>
        
      </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    paddingTop: 75,
    paddingHorizontal: 16,
    paddingBottom: 200, 
  },
  cards: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    lineHeight: 18,
    marginBottom: 4,
  },
  cardImageContainer: {
    flex: 1,
  },
  cardImage:{
    width: '100%',
    height: 200,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  cardIcon:{
    width: 34,
    height: 34,
    marginBottom: 12,
  },
  carText:{
    fontSize: 12,
    marginBottom: 4,
  },
  cardButton: {
    marginTop: 'auto',
    width: 140,
    height: 36,
    paddingHorizontal: 0,
    borderRadius: 999,
    overflow: 'hidden',
  },
}); 
