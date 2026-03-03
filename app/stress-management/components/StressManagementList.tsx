import { TIPS } from '@/constants/sleepTips';
import React, { useMemo } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

function getRandomTips(count: number) {
  const shuffled = [...TIPS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((tip, index) => {
    const [title, description] = tip.split(/\s+[—–-]\s+/);
    return {
      id: index + 1,
      title: title?.replace(/\*\*/g, '').trim() ?? tip,
      description: description?.replace(/\*\*/g, '').trim() ?? '',
      isIcon: true,
    };
  });
}

export default function StressManagementList() {
  const tipsData = useMemo(() => getRandomTips(4), []);

  const renderTextIconCard = ({ item }: { item: any }) => (
    <View style={styles.textIconCard}>
      <Image source={require('@/assets/images/icons/tip-icon.png')} style={styles.cardIcon} />
      <Text style={styles.textIconCardTitle}>{item.title}</Text>
      <Text style={styles.textIconCardDescription}>{item.description}</Text>
    </View>
  );

  const renderItem = ({ item }: { item: any }) => renderTextIconCard({ item });

  return (
    <View style={styles.wrapper}>
      <FlatList
        horizontal
        data={tipsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
  },
  listContainer: {
    gap: 12,
  },
  textIconCard: {
    padding: 16,
    borderRadius: 16,
    width: 150,
    height: 170,
    backgroundColor: '#F5F5F5',
    justifyContent: 'flex-start',
  },
  cardIcon: {
    width: 34,
    height: 34,
    marginBottom: 12,
  },
  textIconCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
  },
  textIconCardDescription: {
    fontSize: 12,
    color: 'black',
  },
});
