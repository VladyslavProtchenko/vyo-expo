import HomeHeader from '@/components/HomeHeader';
import CarePlanCard from '@/components/care-plan/Card';
import CarePlanList from '@/components/care-plan/List';
import CarePlanMenu from '@/components/care-plan/Menu';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function CarePlan() {
  return (
    <ScrollView style={styles.scrollView}>
      <HomeHeader />
      <CarePlanCard />
      <View style={styles.listContainer}>
        <CarePlanList />
        <CarePlanMenu />
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
