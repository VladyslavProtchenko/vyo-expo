import 'dayjs/locale/en-gb';
import { View, Text, StyleSheet, ViewStyle, TouchableOpacity } from "react-native";
import dayjs, { Dayjs } from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import { CurrentPhaseInfo } from "../../_store/phase";
import React from "react";
import { weekDays } from "../../_store/variables";
import { typography } from "../../../styles/globalStyles";
import useProfileStore from "../../_store/useProfileStore";
import useStates from "../../_store/useStates";

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.locale('en-gb');

export default function CalendarWidgetNew() {
  const { isDayCardOpen, setIsDayCardOpen, selectedDate, setSelectedDate } = useStates();
  const { phases, phaseName } = CurrentPhaseInfo();
  const { startMenstruation, cycleDuration } = useProfileStore();

  console.log(phases, 'phases');
  console.log(phaseName, 'phaseName');
  
  const today = dayjs();
  const startOfWeek = dayjs().weekday(0); // Понедельник
  const start = dayjs(startMenstruation);

  // Устанавливаем сегодняшнюю дату как дефолтную при первом рендере
  React.useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(today);
    }
  }, []);

  // Функция для получения дня в цикле для любой даты
  const getDayInCycle = (date: Dayjs): number => {
    const diffFromStart = date.diff(start, 'day');
    return (diffFromStart % cycleDuration + cycleDuration) % cycleDuration;
  };

  // Функция для получения фазы по дню в цикле
  const getPhaseForDay = (dayInCycle: number) => {
    return phases.find(p => dayInCycle >= p.start && dayInCycle <= p.end);
  };

  // Функция для получения стиля цвета круга
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

  // Функция для получения стиля сегодняшнего дня
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

  // Функция для получения стиля прошедших дней (с opacity 0.6)
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
          const isPast = date.isBefore(today, 'day'); // Прошедший день
          const isSelected = selectedDate ? date.isSame(selectedDate, 'day') : false;

          // Вычисляем день в цикле для текущей даты
          const dayInCycle = getDayInCycle(date);
          
          // Находим фазу для этого дня
          const phase = getPhaseForDay(dayInCycle);
          
          // Определяем цвет (всегда показываем цвет фазы, если она найдена)
          const color = phase ? phase.color : 'gray';
          
          // Опционально: можно добавить метку для текущей фазы
          // const isActivePhase = phase?.name === phaseName;
          // const dayOfPhase = phase ? dayInCycle - phase.start + 1 : null;
          // const totalDays = phase ? phase.end - phase.start + 1 : null;

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
                    // Повторный клик на активный день с открытой карточкой - закрываем и возвращаем на сегодня
                    setSelectedDate(today);
                    setIsDayCardOpen(false);
                  } else {
                    // Клик на другой день ИЛИ клик на день с закрытой карточкой - открываем
                    setSelectedDate(date);
                    setIsDayCardOpen(true);
                  }
                }}
              >
                <View style={[
                  styles.dayCircle,
                  !isPast && !isToday && !isSelected && getColorStyle(color), // Бордер только для будущих дней
                  isPast && !isSelected && getPastStyle(color), // Фон с opacity 0.6 для прошедших дней
                  isToday && !isSelected && getTodayStyle(color), // Сегодня - обычный размер с фоном
                  isSelected && styles.activeDay, // Выбранный день - увеличенный размер
                  isSelected && getTodayStyle(color), // Выбранный день - цветной фон
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
