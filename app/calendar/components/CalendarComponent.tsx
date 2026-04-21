import { PHASES, PhaseName } from '@/constants/phases';
import { computePhaseInfo } from '@/store/phase';
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
    const marked: Record<string, { color: string; startingDay?: boolean; endingDay?: boolean }> = {};
    const start = dayjs(startMenstruation);

    // Use shared phase calculation for consistent boundaries
    const { phases } = computePhaseInfo({
      startMenstruation,
      menstruationDuration,
      cycleDuration,
    });

    // Find current cycle and current phase for "active" highlighting
    const daysSinceStart = today.diff(start, 'day');
    const finalCycleDuration = cycleDuration || 28;
    const currentCycleIndex = Math.floor(daysSinceStart / finalCycleDuration);
    const currentCycleStart = start.add(currentCycleIndex * finalCycleDuration, 'day');
    const dayInCycle = today.diff(currentCycleStart, 'day');

    const currentPhase = phases.find(p => dayInCycle >= p.start && dayInCycle <= p.end) || phases[0];
    const activePhaseStartDate = currentCycleStart.add(currentPhase.start, 'day');

    const isActivePeriod = (dateObj: dayjs.Dayjs) =>
      dateObj.isSameOrAfter(activePhaseStartDate, 'day') && dateObj.isSameOrBefore(today, 'day');

    for (let cycleOffset = -6; cycleOffset <= 6; cycleOffset++) {
      const cycleStart = start.add(cycleOffset * finalCycleDuration, 'day');

      for (const phase of phases) {
        const phaseColors = PHASES[phase.name as PhaseName];

        for (let i = phase.start; i <= phase.end; i++) {
          const dateObj = cycleStart.add(i, 'day');
          const date = dateObj.format('YYYY-MM-DD');
          marked[date] = {
            color: isActivePeriod(dateObj) ? phaseColors.color : phaseColors.colorCalendar,
            startingDay: i === phase.start,
            endingDay: i === phase.end,
          };
        }
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
