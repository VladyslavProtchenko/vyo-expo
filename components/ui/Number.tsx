import { typography } from '@/constants/typography';
import React from 'react';
import { Text } from 'react-native';

export default function Number({ number }: { number: string }) {
  return (
    <Text style={typography.number}>{number}</Text>
  );
}