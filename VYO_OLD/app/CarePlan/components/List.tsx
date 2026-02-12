import React from 'react';
import { Text, StyleSheet, FlatList, ImageBackground, Image } from 'react-native';

const sampleData = [
  { id: 1, title: 'How to implement?', description: 'Read more about your care plan and step-by-step implementation', isIcon: true },
  { id: 2, title: 'Innovative endo diagnostics', description: '5 min', isImage: true, image: require('../../../assets/images/cardBg.png') },
  { id: 3, title: 'Innovative endo diagnostics', description: '5 min', isImage: true, image: require('../../../assets/images/carePlan.png')  },
  { id: 4, title: 'How to implement?', description: 'Description 4', isIcon: true },
  { id: 5, title: 'How to implement?', description: 'Description 5', isIcon: true },
];

export default function List({ isGray }: { isGray?: boolean }) {
  const renderItem = ({ item }: { item: any }) => (
    <ImageBackground source={item.image ? item.image : null} style={[item.isImage ? styles.cardImage : styles.Card, { backgroundColor: isGray ? '#F5F5F5' : 'white' }]} resizeMode="cover">
      {item.isIcon && <Image source={require('../../../assets/images/pathRed.png')} style={styles.cardIcon} />}
      <Text style={[styles.itemTitle, { color: item.isImage ? 'white' : 'black' }]}>{item.title}</Text>
      <Text style={[styles.itemDescription, { color: item.isImage ? 'white' : 'black' }]}>{item.description}</Text>
    </ImageBackground>
  );

  return (
      <FlatList
        horizontal
        data={sampleData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    gap: 12,
  },
  Card: {
    padding: 16,
    borderRadius: 16,
    overflow: 'hidden',
    width: 150,
    height: 170,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
  },
  cardImage:{
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 16,
    overflow: 'hidden',
    width: 150,
    height: 170,
    justifyContent: 'flex-end',
  },
  cardIcon: {
    width: 34,
    height: 34,
    marginBottom: 12,
  },
  cardContent: {
    flex: 1,
    padding: 16,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  itemDescription: {
    fontSize: 12,
  },
});