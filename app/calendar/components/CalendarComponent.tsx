import { PHASES } from '@/constants/phases';
import useUserStore from '@/store/useUserStore';
import { MaterialIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export default function CalendarComponent() {
  const { startMenstruation, cycleDuration, menstruationDuration } = useUserStore();
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const today = dayjs();
  const todayStr = today.format('YYYY-MM-DD');

  const markedDates = useMemo(() => {
    const marked: any = {};
    const start = dayjs(startMenstruation);
    const ovulationDay = cycleDuration - 14;

    // Find current cycle and current phase boundaries
    const daysSinceStart = today.diff(start, 'day');
    const currentCycleIndex = Math.floor(daysSinceStart / cycleDuration);
    const currentCycleStart = start.add(currentCycleIndex * cycleDuration, 'day');
    const dayInCycle = today.diff(currentCycleStart, 'day');

    // Determine current phase start day (within cycle)
    let currentPhaseStart: number;
    if (dayInCycle < menstruationDuration) {
      currentPhaseStart = 0; // menstrual
    } else if (dayInCycle < ovulationDay) {
      currentPhaseStart = menstruationDuration; // follicular
    } else if (dayInCycle === ovulationDay) {
      currentPhaseStart = ovulationDay; // ovulation
    } else {
      currentPhaseStart = ovulationDay + 1; // luteal
    }

    const activePhaseStartDate = currentCycleStart.add(currentPhaseStart, 'day');

    const isActivePeriod = (dateObj: dayjs.Dayjs) =>
      dateObj.isSameOrAfter(activePhaseStartDate, 'day') && dateObj.isSameOrBefore(today, 'day');

    for (let cycleOffset = -6; cycleOffset <= 6; cycleOffset++) {
      const cycleStart = start.add(cycleOffset * cycleDuration, 'day');

      // Менструальная фаза
      for (let i = 0; i < menstruationDuration; i++) {
        const dateObj = cycleStart.add(i, 'day');
        const date = dateObj.format('YYYY-MM-DD');
        marked[date] = {
          color: isActivePeriod(dateObj) ? PHASES.menstrual.color : PHASES.menstrual.colorLight,
          startingDay: i === 0,
          endingDay: i === menstruationDuration - 1,
        };
      }

      // Фолликулярная фаза
      for (let i = menstruationDuration; i < ovulationDay; i++) {
        const dateObj = cycleStart.add(i, 'day');
        const date = dateObj.format('YYYY-MM-DD');
        marked[date] = {
          color: isActivePeriod(dateObj) ? PHASES.follicular.color : PHASES.follicular.colorLight,
          startingDay: i === menstruationDuration,
          endingDay: i === ovulationDay - 1,
        };
      }

      // Овуляция
      const ovulationDateObj = cycleStart.add(ovulationDay, 'day');
      const ovulationDate = ovulationDateObj.format('YYYY-MM-DD');
      marked[ovulationDate] = {
        color: isActivePeriod(ovulationDateObj) ? PHASES.ovulation.color : PHASES.ovulation.colorLight,
        startingDay: true,
        endingDay: true,
      };

      // Лютеиновая фаза
      for (let i = ovulationDay + 1; i < cycleDuration; i++) {
        const dateObj = cycleStart.add(i, 'day');
        const date = dateObj.format('YYYY-MM-DD');
        marked[date] = {
          color: isActivePeriod(dateObj) ? PHASES.luteal.color : PHASES.luteal.colorLight,
          startingDay: i === ovulationDay + 1,
          endingDay: i === cycleDuration - 1,
        };
      }
    }

    return marked;
  }, [startMenstruation, cycleDuration, menstruationDuration, todayStr]);

  if (!startMenstruation || !cycleDuration) {
    return (
      <View style={styles.container}>
        <Text style={{ fontFamily: 'Poppins', textAlign: 'center', opacity: 0.6 }}>
          Please complete your profile to see calendar
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Calendar
        markingType={'period'}
        markedDates={markedDates}
        onDayPress={() => {}}
        renderHeader={(date: any) => {
          const month = dayjs(date).format('MMMM');
          return (
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setCurrentMonth((prev) => prev.subtract(1, 'month'))}>
                <MaterialIcons name="chevron-left" size={28} color="#000" />
              </TouchableOpacity>
              <Text style={styles.monthText}>{month}</Text>
              <TouchableOpacity onPress={() => setCurrentMonth((prev) => prev.add(1, 'month'))}>
                <MaterialIcons name="chevron-right" size={28} color="#000" />
              </TouchableOpacity>
            </View>
          );
        }}
        key={currentMonth.format('YYYY-MM')}
        current={currentMonth.format('YYYY-MM-DD')}
        hideArrows={true}
        theme={{
          textDayFontFamily: 'Poppins',
          textDayFontSize: 18,
          // @ts-ignore
          'stylesheet.calendar.header': {
            dayHeader: {
              marginVertical: 16,
            },
          },
          // @ts-ignore
          'stylesheet.calendar.main': {
            week: {
              marginBottom: 32,
              flexDirection: 'row',
              justifyContent: 'space-around',
            },
          },
          // @ts-ignore
          'stylesheet.day.period': {
            text: {
              color: '#000',
              fontSize: 18,
            },
            todayText: {
              color: '#fff',
              fontSize: 18,
            },
            today: {
              borderRadius: 17,
              transform: [{ scale: 1.1 }],
            },
          },
        }}
      />
      <View style={styles.labels}>
        <View style={styles.label}>
          <View style={{ width: 12, height: 12, backgroundColor: PHASES.menstrual.color, borderRadius: 10 }} />
          <Text style={styles.labelText}>Period</Text>
        </View>
        <View style={styles.label}>
          <View style={{ width: 12, height: 12, backgroundColor: PHASES.follicular.color, borderRadius: 10 }} />
          <Text style={styles.labelText}>Follicular</Text>
        </View>
        <View style={styles.label}>
          <View style={{ width: 12, height: 12, backgroundColor: PHASES.ovulation.color, borderRadius: 10 }} />
          <Text style={styles.labelText}>Ovulation</Text>
        </View>
        <View style={styles.label}>
          <View style={{ width: 12, height: 12, backgroundColor: PHASES.luteal.color, borderRadius: 10 }} />
          <Text style={styles.labelText}>Luteal</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    gap: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  monthText: {
    width: '40%',
    fontFamily: 'Poppins',
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 8,
    marginBottom: 32,
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  labelText: {
    fontFamily: 'Poppins',
    fontSize: 16,
  },
});
