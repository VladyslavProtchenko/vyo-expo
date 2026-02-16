import { typography } from '@/constants/typography';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function InfoCard({
  title, 
  description,
  onClose
}: { title: string; description: string; onClose: () => void }) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.noteHeader}>
          <View style={styles.titleBox}>
            <Image source={require('@/assets/images/icons/home_note_icon1.png')} style={styles.cardIcon} />
            <Text style={[typography.p, styles.title]}>{title}</Text>
            <Pressable onPress={onClose}>
              <MaterialIcons name="close" size={24} color="black" style={styles.closeIcon} />
            </Pressable>
          </View>
        </View>
        <Text style={[typography.p, styles.description]}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFAEF',
    borderRadius: 18,
    marginBottom: 12,
    marginTop: 18,
  },
  card: {
    padding: 16,
    paddingTop: 16, 
    borderRadius: 18,
  },  
  titleBox: {
    flexDirection: 'row',
    gap: 8,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardIcon: {
    width: 34,
    height: 34,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flexShrink: 1,
  },
  description: {
    fontSize: 12,
    marginTop: 4,
  },
  closeIcon: {
    marginLeft: 'auto',
  },
});
