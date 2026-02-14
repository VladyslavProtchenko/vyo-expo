import { typography } from "@/constants/typography";
import { CurrentPhaseInfo } from "@/store/phase";
import useStates from "@/store/useStates";
import useUserStore from "@/store/useUserStore";
import { weekDays } from "@/store/variables";
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/en-gb';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.locale('en-gb');

export default function CalendarWidgetNew() {
  const { isDayCardOpen, setIsDayCardOpen, selectedDate, setSelectedDate } = useStates();
  const { startMenstruation, cycleDuration } = useUserStore();

  const today = dayjs();
  const startOfWeek = dayjs().weekday(0);
  
  // Fallback если данных нет
  if (!startMenstruation || !cycleDuration) {
    return (
      <View style={styles.container}>
        <Text style={[typography.p, { textAlign: 'center', opacity: 0.6 }]}>
          Please complete your profile to see calendar
        </Text>
      </View>
    );
  }

  const { phases } = CurrentPhaseInfo();
  const start = dayjs(startMenstruation);

  React.useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(today);
    }
  }, []);

  const getDayInCycle = (date: Dayjs): number => {
    const diffFromStart = date.diff(start, 'day');
    return (diffFromStart % cycleDuration + cycleDuration) % cycleDuration;
  };

  const getPhaseForDay = (dayInCycle: number) => {
    return phases.find(p => dayInCycle >= p.start && dayInCycle <= p.end);
  };

  const getColorStyle = (color: string): ViewStyle => {
    const colorMap: Record<string, ViewStyle> = {
      gray: { borderWidth: 1, borderColor: '#E5E7EB' },
      red: { borderWidth: 2, borderColor: '#F87171' },
      pink: { borderWidth: 2, borderColor: '#F472B6' },
      yellow: { borderWidth: 2, borderColor: '#FBBF24' },
      green: { borderWidth: 2, borderColor: '#34D399' },
    };
    return colorMap[color] || { borderWidth: 1, borderColor: '#E5E7EB' };
  };

  const getTodayStyle = (color: string): ViewStyle => {
    const todayMap: Record<string, ViewStyle> = {
      gray: { backgroundColor: '#E5E7EB' },
      red: { backgroundColor: '#F87171' },
      pink: { backgroundColor: '#F472B6' },
      yellow: { backgroundColor: '#FBBF24' },
      green: { backgroundColor: '#34D399' },
    };
    return todayMap[color] || { backgroundColor: '#E5E7EB' };
  };

  const getPastStyle = (color: string): ViewStyle => {
    const pastMap: Record<string, ViewStyle> = {
      gray: { backgroundColor: 'rgba(229, 231, 235, 0.6)' },
      red: { backgroundColor: 'rgba(248, 113, 113, 0.6)' },
      pink: { backgroundColor: 'rgba(244, 114, 182, 0.6)' },
      yellow: { backgroundColor: 'rgba(251, 191, 36, 0.6)' },
      green: { backgroundColor: 'rgba(52, 211, 153, 0.6)' },
    };
    return pastMap[color] || { backgroundColor: 'rgba(229, 231, 235, 0.6)' };
  };

  return (
    <View style={styles.container}>
      {weekDays.map((_, index) => {
        const date = startOfWeek.add(index, 'day');
        const isToday = date.isSame(today, 'day');
        const isPast = date.isBefore(today, 'day');
        const isSelected = selectedDate ? date.isSame(selectedDate, 'day') : false;

        const dayInCycle = getDayInCycle(date);
        const phase = getPhaseForDay(dayInCycle);
        const color = phase ? phase.color : 'gray';

        return (
          <View key={index} style={styles.dayContainer}>
            <Text style={[typography.p, styles.dayLabel]}>
              {date.format('ddd')}
            </Text>
            <TouchableOpacity 
              style={styles.dayCircleContainer} 
              onPress={() => {
                const isSameDay = selectedDate && date.isSame(selectedDate, 'day');
                
                if (isSameDay && isDayCardOpen) {
                  setSelectedDate(today);
                  setIsDayCardOpen(false);
                } else {
                  setSelectedDate(date);
                  setIsDayCardOpen(true);
                }
              }}
            >
              <View style={[
                styles.dayCircle,
                !isPast && !isToday && !isSelected && getColorStyle(color),
                isPast && !isSelected && getPastStyle(color),
                isToday && !isSelected && getTodayStyle(color),
                isSelected && styles.activeDay,
                isSelected && getTodayStyle(color),
              ]}>
                <View style={styles.dayContent}>
                  <Text style={[typography.p, (isToday || isPast || isSelected) && { color: 'white' }]}>
                    {date.format('D')}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dayContainer: {
    alignItems: 'center',
    gap: 5,
  },
  dayLabel: {
    fontSize: 12,
    opacity: 0.6,
  },
  dayCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',  
  },
  activeDay: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  dayCircleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayContent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
