import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import HowToImplementCard from './care-plan/how-to-implement/HowToImplementCard';

function NutrientsCard({ isGray }: { isGray?: boolean }) {
  return (
    <View style={[styles.nutrientsCard, { backgroundColor: isGray ? '#F5F5F5' : 'white' }]}>
      <Image
        source={require('@/assets/images/nutrients/nutrients-card.webp')}
        style={styles.nutrientsImage}
        contentFit="cover"
      />
    </View>
  );
}

export default function CarePlanList({ isGray }: { isGray?: boolean }) {
  const items = [
    <HowToImplementCard key="how-to" isGray={isGray} />,
    <NutrientsCard key="nutrients" isGray={isGray} />,
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
  nutrientsCard: {
    width: 150,
    height: 170,
    borderRadius: 24,
    overflow: 'hidden',
  },
  nutrientsImage: {
    width: '100%',
    height: '100%',
  },
});
