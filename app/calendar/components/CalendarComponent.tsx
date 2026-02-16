import { colors } from '@/constants/typography';
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

// Светлые оттенки для всех фаз цикла
const lightColors = {
  menstrual: '#FFADAD', // Светлый красный (50% от #FF5B5B на белом)
  follicular: '#BCADFF', // Светлый фиолетовый (50% от #795BFF на белом)
  ovulation: '#B9FFAD', // Светлый зеленый (50% от #74FF5B на белом)
  luteal: '#E8ADFF', // Светлый розовый (50% от #D15BFF на белом)
};

export default function CalendarComponent() {
  const { startMenstruation, cycleDuration, menstruationDuration } = useUserStore();
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [calendarWidth, setCalendarWidth] = useState(0);
  const today = dayjs().format('YYYY-MM-DD');

  // Вычисляем отмеченные даты на основе фаз цикла
  const markedDates = useMemo(() => {
    const marked: any = {};
    const start = dayjs(startMenstruation);
    const ovulationDay = cycleDuration - 14;
    const todayDate = dayjs();

    // Генерируем даты для нескольких циклов (прошлые и будущие)
    for (let cycleOffset = -6; cycleOffset <= 6; cycleOffset++) {
      const cycleStart = start.add(cycleOffset * cycleDuration, 'day');

      // Менструальная фаза
      for (let i = 0; i < menstruationDuration; i++) {
        const dateObj = cycleStart.add(i, 'day');
        const date = dateObj.format('YYYY-MM-DD');
        marked[date] = {
          color: lightColors.menstrual,
          startingDay: i === 0,
          endingDay: i === menstruationDuration - 1,
        };
      }

      // Фолликулярная фаза
      for (let i = menstruationDuration; i < ovulationDay; i++) {
        const dateObj = cycleStart.add(i, 'day');
        const date = dateObj.format('YYYY-MM-DD');
        marked[date] = {
          color: lightColors.follicular,
          startingDay: i === menstruationDuration,
          endingDay: i === ovulationDay - 1,
        };
      }

      // Овуляция
      const ovulationDateObj = cycleStart.add(ovulationDay, 'day');
      const ovulationDate = ovulationDateObj.format('YYYY-MM-DD');
      marked[ovulationDate] = {
        color: lightColors.ovulation,
        startingDay: true,
        endingDay: true,
      };

      // Лютеиновая фаза
      for (let i = ovulationDay + 1; i < cycleDuration; i++) {
        const dateObj = cycleStart.add(i, 'day');
        const date = dateObj.format('YYYY-MM-DD');
        marked[date] = {
          color: lightColors.luteal,
          startingDay: i === ovulationDay + 1,
          endingDay: i === cycleDuration - 1,
        };
      }
    }

    // Отмечаем сегодняшний день кругом с бордером
    if (marked[today]) {
      marked[today] = {
        ...marked[today],
        selected: true,
        textColor: '#000',
      };
    } else {
      marked[today] = {
        selected: true,
        textColor: '#000',
      };
    }

    return marked;
  }, [startMenstruation, cycleDuration, menstruationDuration, today]);

  if (!startMenstruation || !cycleDuration) {
    return (
      <View style={styles.container}>
        <Text style={{ fontFamily: 'Poppins', textAlign: 'center', opacity: 0.6 }}>
          Please complete your profile to see calendar
        </Text>
      </View>
    );
  }

  const todayOverlay = useMemo(() => {
    if (!calendarWidth) return null;
    if (!currentMonth.isSame(dayjs(), 'month')) return null;

    const monthStart = currentMonth.startOf('month');
    const startWeekday = monthStart.day(); // 0 Sunday ... 6 Saturday
    const dayOfMonth = dayjs().date();
    const flatIndex = startWeekday + dayOfMonth - 1;
    const row = Math.floor(flatIndex / 7);
    const col = flatIndex % 7;

    const cellWidth = calendarWidth / 7;
    const ringSize = 44;

    // Calibrated for react-native-calendars layout to keep the ring center-aligned
    // with the day number cell across rows.
    const topOffset = 90;
    const rowHeight = 64;
    const overlayShiftX = 0;
    const overlayShiftY =-1;

    // Determine phase for today and use saturated color for border
    const todayColor = markedDates?.[today]?.color;
    let borderColor = colors.menstrual; // default
    
    if (todayColor === lightColors.menstrual) {
      borderColor = colors.menstrual;
    } else if (todayColor === lightColors.follicular) {
      borderColor = colors.follicular;
    } else if (todayColor === lightColors.ovulation) {
      borderColor = colors.ovulation;
    } else if (todayColor === lightColors.luteal) {
      borderColor = colors.luteal;
    }

    return {
      left: col * cellWidth + (cellWidth - ringSize) / 2 + overlayShiftX,
      top: topOffset + row * rowHeight + overlayShiftY,
      borderColor,
    };
  }, [calendarWidth, currentMonth, markedDates, today]);

  return (
    <View style={styles.container}>
      <View style={styles.calendarWrap} onLayout={(e) => setCalendarWidth(e.nativeEvent.layout.width)}>
        <Calendar
          markingType={'period'}
          markedDates={markedDates}
          onDayPress={(day: any) => {}}
          // Custom header
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
            selectedDayTextColor: '#000',
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
              today: {
                borderRadius: 32,
                overflow: 'hidden',
              },
              todayText: {
                color: '#000',
              },
              selected: {
                backgroundColor: 'transparent',
              },
              selectedText: {
                color: '#000',
              },
            },
          }}
        />
        {todayOverlay && (
          <View
            pointerEvents="none"
            style={[
              styles.todayAbsoluteOverlay,
              {
                left: todayOverlay.left,
                top: todayOverlay.top,
                borderColor: todayOverlay.borderColor,
              },
            ]}
          />
        )}
      </View>
      <View style={styles.labels}>
        <View style={styles.label}>
          <View style={{ width: 12, height: 12, backgroundColor: colors.menstrual, borderRadius: 10 }} />
          <Text style={styles.labelText}>Period</Text>
        </View>
        <View style={styles.label}>
          <View style={{ width: 12, height: 12, backgroundColor: colors.follicular, borderRadius: 10 }} />
          <Text style={styles.labelText}>Follicular</Text>
        </View>
        <View style={styles.label}>
          <View style={{ width: 12, height: 12, backgroundColor: colors.ovulation, borderRadius: 10 }} />
          <Text style={styles.labelText}>Ovulation</Text>
        </View>
        <View style={styles.label}>
          <View style={{ width: 12, height: 12, backgroundColor: colors.luteal, borderRadius: 10 }} />
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
  calendarWrap: {
    position: 'relative',
  },
  todayAbsoluteOverlay: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    backgroundColor: 'transparent',
    transform: [{ scale: 1.2 }],
    zIndex: 20,
  },
});
