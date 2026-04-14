import CarePlanCard from '@/app/(tabs)/components/Card';
import CarePlanList from '@/app/(tabs)/components/List';
import CarePlanMenu from '@/app/(tabs)/components/Menu';
import CarePlanPersonalizeCard from '@/app/(tabs)/components/CarePlanPersonalizeCard';
import CarePlanScienceCard from '@/app/(tabs)/components/CarePlanScienceCard';
import SkipPoster from '@/app/phase/components/SkipPoster';
import HomeHeader from '@/components/HomeHeader';
import useUserStore from '@/store/useUserStore';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function CarePlan() {
  const { isQuizSkipped } = useUserStore();

  return (
    <ScrollView style={styles.scrollView}>
      <HomeHeader />
      <CarePlanCard />
      <View style={styles.listContainer}>
        {isQuizSkipped ? (
          <>
            <CarePlanPersonalizeCard />
            <SkipPoster />
            <CarePlanScienceCard />
          </>
        ) : (
          <>
            <CarePlanList />
            <CarePlanMenu />
          </>
        )}
      </View>
      <View style={{ paddingBottom: 200 }}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 50,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  listContainer: {
    marginVertical: 16,
  },
});
