import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import ButtonGradient from '../../_components/ui/ButtonGradient';
import Calendar from '../../_components/Calendar';
import Select from '../../_components/Select';
import useProfileStore from '../../_store/useProfileStore';
import dayjs from 'dayjs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { typography } from '../../../styles/globalStyles';
import Number from '../../_components/ui/Number';

export default function Step1({goNext}: {goNext: () => void}) {
  const { setValue, age, startMenstruation, menstruationDuration, cycleDuration } = useProfileStore()
  const [ageState, setAgeState] = useState(age);
  const [menstruationDate, setMenstruationDate] = useState(startMenstruation);
  const [menstrDuration, setMenstrDuration] = useState(menstruationDuration);
  const [cycle, setCycle] = useState(cycleDuration);

  const next = () => {
    setValue(ageState, 'age')
    setValue(menstruationDate,'startMenstruation')
    setValue(menstrDuration,'menstruationDuration')
    setValue(cycle,'cycleDuration')
    goNext()
  }

  return (
    <View style={styles.container}>
        <Number number="1" />
        <Text style={[typography.h1, styles.title]}>Share for better care</Text>
        <Text style={typography.subtitle}>How old are you?</Text>
        <Text style={typography.p}>no matter your age, we know you're always fantastic ;)</Text>

        <View style={styles.calendarSpacing}>
        <Select
            title="Your Age"
            value={ageState}
            setValue={setAgeState}
            values={Array.from({ length: 96 }, (_, i) => i + 5)}
          />
        </View>
        
        <Text style={typography.subtitle}>Your cycle - we’ll keep a calendar for you</Text>
        
        <View style={styles.calendarSpacing}>
          <Calendar
            value={menstruationDate}
            setValue={setMenstruationDate}
            title="Start of last menstruation"
          />
        </View>
        
        <View style={styles.selectSpacing}>
          <Select
            title="Menstruation duration"
            value={menstrDuration}
            setValue={setMenstrDuration}
            values={Array.from({ length: 16 }, (_, i) => i + 1)}
          />
        </View>
        
        <View style={styles.selectSpacing}>
          <Select
            title="Cycle duration, ie 28 or 28-32"
            value={cycle}
            setValue={setCycle}
            values={Array.from({ length: 51 }, (_, i) => i + 10)}
          />
        </View>
        
        <View style={styles.buttonSpacing}>
          <ButtonGradient
            disabled={!ageState || !menstruationDate || !menstrDuration || !cycle}
            title="Next"
            icon={(<MaterialIcons color={!ageState || !menstruationDate || !menstrDuration || !cycle ? '#999999' : '#000000'} name="arrow-forward" size={26} />)}
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
  buttonSpacing: {
    marginTop: 'auto', // mt-6
    marginBottom: 50, // mb-[50px]
  },
});

export function getCurrentCycleDates(startDate: string, cycleLength: number) {
  const start = dayjs(startDate);
  return Array.from({ length: cycleLength }, (_, i) => start.add(i, 'day'));
}