import { AppColors } from '@/constants/theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CATEGORIES = ['🥦 Nutrition & Supplements', '🫶 Body Care', '🧘 Stress Management'];

export default function CarePlanPersonalizeCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.description}>
        {"To make the experience truly personalized and meaningful, we\u2019re still missing your responses."}
      </Text>
      <Text style={styles.subtitle}>
        {"You'll find thoughtfully designed categories tailored to your needs:"}
      </Text>
      {CATEGORIES.map((label) => (
        <View key={label} style={styles.categoryRow}>
          <Text style={styles.categoryLabel}>{label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: AppColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  description: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '400',
    color: '#262222',
    lineHeight: 24,
    letterSpacing: 0,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '400',
    color: '#262222',
    lineHeight: 24,
    letterSpacing: 0,
    marginBottom: 16,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  emoji: {
    fontSize: 20,
  },
  categoryLabel: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '700',
    color: AppColors.black,
  },
});
