import { useGetDiagnosis } from '@/hooks/useDiagnosisData';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import HowToImplementCard from './care-plan/how-to-implement/HowToImplementCard';
import WhatDoesItMeanCard from './WhatDoesItMeanCard';

export default function CarePlanList({ isGray }: { isGray?: boolean }) {
  const { data: diagnosisData } = useGetDiagnosis();
  const hasNonNormalDiagnosis = diagnosisData?.diagnosis && diagnosisData.diagnosis !== 'normal';

  const items = [
    ...(hasNonNormalDiagnosis ? [<WhatDoesItMeanCard key="what-mean" isGray={isGray} />] : []),
    <HowToImplementCard key="how-to" isGray={isGray} />,
  ];

  return (
    <FlatList
      horizontal
      data={items}
      renderItem={({ item }) => item}
      keyExtractor={(_, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    gap: 12,
  },
});
