import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import ButtonGradient from '../../_components/ui/ButtonGradient';
import Input from '../../_components/ui/Input';
import useProfileStore from '../../_store/useProfileStore';
import dayjs from 'dayjs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { typography } from '../../../styles/globalStyles';
import Number from '../../_components/ui/Number';

export default function Step1_2({goNext}: {goNext: () => void}) {
  const { setValue, weight, height, waist, hips, unitSystem } = useProfileStore()
  const [weightState, setWeightState] = useState(weight ? String(weight) : '');
  const [heightState, setHeightState] = useState(height ? String(height) : '');
  const [waistState, setWaistState] = useState(waist ? String(waist) : '');
  const [hipsState, setHipsState] = useState(hips ? String(hips) : '');

  const handleNumericChange = (value: string, setter: (value: string) => void) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setter(numericValue);
  };

  const next = () => {
    const weightNum = weightState ? parseFloat(weightState) : 0
    const heightNum = heightState ? parseFloat(heightState) : 0
    const waistNum = waistState ? parseFloat(waistState) : 0
    const hipsNum = hipsState ? parseFloat(hipsState) : 0
    
    setValue(isNaN(weightNum) ? 0 : weightNum, 'weight')
    setValue(isNaN(heightNum) ? 0 : heightNum, 'height')
    setValue(isNaN(waistNum) ? 0 : waistNum, 'waist')
    setValue(isNaN(hipsNum) ? 0 : hipsNum, 'hips')
    goNext()
  }
  
  return (
    <View style={styles.container}>
        <Number number="2" />
        <Text style={[typography.h1, styles.title]}>Share for better care</Text>
        <Text style={typography.p}>We use this data to tailor your care plan and provide personalized nutrition and health insights.</Text>

        <View style={styles.unitSystemContainer}>
          <Text style={styles.unitSystemLabel}>Select measurement system</Text>
          <View style={styles.segmentedControl}>
            <Pressable
              style={[styles.segment, unitSystem === 'metric' && styles.segmentActive]}
              onPress={() => setValue('metric', 'unitSystem')}
            >
              <Text style={[styles.segmentText, unitSystem === 'metric' && styles.segmentTextActive]}>
                kg/cm
              </Text>
            </Pressable>
            <Pressable
              style={[styles.segment, unitSystem === 'imperial' && styles.segmentActive]}
              onPress={() => setValue('imperial', 'unitSystem')}
            >
              <Text style={[styles.segmentText, unitSystem === 'imperial' && styles.segmentTextActive]}>
                lb/ft
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.calendarSpacing}>
          <Input
            type="numeric"
            value={weightState}
            onChange={(value) => handleNumericChange(value, setWeightState)}
            placeholder={unitSystem === 'metric' ? 'Weight (kg)' : 'Weight (lbs)'}
          />
        </View>
        <View style={styles.calendarSpacing}>
          <Input
            type="numeric"
            value={heightState}
            onChange={(value) => handleNumericChange(value, setHeightState)}
            placeholder={unitSystem === 'metric' ? 'Height (cm)' : 'Height (in)'}
          />
        </View>
        
        <View style={styles.selectSpacing}>
          <Input
            type="numeric"
            value={waistState}
            onChange={(value) => handleNumericChange(value, setWaistState)}
            placeholder={unitSystem === 'metric' ? 'Waist (cm)' : 'Waist (in)'}
          />
        </View>
        
        <View style={styles.selectSpacing}>
          <Input
            type="numeric"
            value={hipsState}
            onChange={(value) => handleNumericChange(value, setHipsState)}
            placeholder={unitSystem === 'metric' ? 'Hips (cm)' : 'Hips (in)'}
          />
        </View>
        
        <View style={styles.buttonSpacing}>
          <ButtonGradient
            disabled={!weightState || !heightState || !waistState || !hipsState}
            title="Next"  
            icon={(<MaterialIcons color={!weightState || !heightState || !waistState || !hipsState ? '#999999' : '#000000'} name="arrow-forward" size={26} />)}
            onPress={next}
          /> 
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    paddingHorizontal: 16, // p-6
  },

  number: {
    marginTop: 12, // mt-6
  },

  title: {
    width: '100%',
    marginBottom: 24, // mb-6
  },
  subtitle: {
    fontFamily: 'Archivo Black',
    fontSize: 20, // text-[20px]
    width: '100%',
    marginBottom: 4, // mb-1
  },
  helperText: {
    fontSize: 12, // text-[12px]
    opacity: 0.6,
    fontWeight: '300', // font-light
    marginBottom: 24, // mb-6
  },
  calendarSpacing: {
    marginTop: 16, // mt-6
    marginBottom: 24, // mb-6
  },
  cycleTitle: {
    marginBottom: 24, // mb-6
  },
  selectSpacing: {
    marginBottom: 24, // mb-6
  },
  unitSystemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 8,
  },
  unitSystemLabel: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
  },
  segmentedControl: {
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    padding: 2,
  },
  segment: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: 'transparent',
  },
  segmentActive: {
    backgroundColor: '#FFFFFF',
  },
  segmentText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  segmentTextActive: {
    color: '#1E3A8A',
  },
  buttonSpacing: {
    marginTop: 'auto', // mt-6
    marginBottom: 50, // mb-[50px]
  },
});

export function getCurrentCycleDates(startDate: string, cycleLength: number) {
  const start = dayjs(startDate);
  return Array.from({ length: cycleLength }, (_, i) => start.add(i, 'day'));
}