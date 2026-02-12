import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

export default function OpenCard() {
  return (
    <View style={styles.card}>
      <Image source={require('../../assets/images/cardBg.png')} style={styles.cardImage} />
      <Text style={styles.cardTitle}>Innovative endo diagnostics</Text>
      <Text style={styles.cardDescription}>5 min</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
  },
  cardImage: {
    width: '100%',
    height: 100,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 12,
    color: '#666',
  },
});