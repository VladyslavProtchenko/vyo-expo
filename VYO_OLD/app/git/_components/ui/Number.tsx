import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { typography } from '../../../styles/globalStyles'

export default function Number({ number }: { number: string }) {
  return (
    <Text style={typography.number}>{number}</Text>
  )
}
