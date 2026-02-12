import React, { useState } from 'react';
import { Image, Modal, Pressable, Text, View, StyleSheet } from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs, { Dayjs } from 'dayjs';
import MaterialIcons from 'react-native-vector-icons/Octicons';
import { typography } from '../../styles/globalStyles';

// Кастомный компонент месяца для поддержки текущего месяца
const CustomMonth = (props: { name: { full: string; short: string }; isSelected: boolean; index: number }) => {
  const currentMonth = dayjs().month(); // Текущий месяц (0-11)
  const currentYear = dayjs().year(); // Текущий год
  const isActive = props.index === currentMonth;

  const containerStyle = [
    localStyles.customMonth,
    isActive && localStyles.activeMonth,
    props.isSelected && localStyles.selectedMonth,
  ];

  const textStyle = [
    localStyles.customMonthText,
    isActive && localStyles.activeMonthText,
    props.isSelected && localStyles.selectedMonthText,
  ];

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{props.name.full}</Text>
    </View>
  );
};


const localStyles = StyleSheet.create({
  customMonth: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    width: '100%',
  },
  activeMonth: {
    backgroundColor: 'white',
    borderColor: '#FF3B30',
    borderWidth: 1,
    borderRadius: 24,
  },
  selectedMonth: {
    backgroundColor: '#FF3B30',
    borderRadius: 24,
  },
  customMonthText: {
    fontSize: 16,
  },
  activeMonthText: {
    color: '#FF3B30',
    fontWeight: '600',
  },
  selectedMonthText: {
    color: 'white',
    fontWeight: '600',
  },
});


interface IProps {
  title?: string;
  value: string | null | Dayjs;
  setValue: (date: any) => void;
  type?: 'year' | 'month' | 'day';
}

export default ({
  title = 'set date',
  value,
  setValue,
  type = 'day',
}: IProps) => {
  const [open, setOpen] = useState(false);

  return (
    <View>
      <Pressable
        onPress={() => setOpen(true)}
        style={styles.trigger}
      >
        <Text style={[typography.p, value? styles.active_title : styles.title]}>{title}</Text>
        {value ? <Text style={[typography.p, styles.value]}>{dayjs(value).format('DD MMMM YYYY')}</Text>: <View></View>}
        
        <MaterialIcons style={styles.icon} name="calendar" size={24} color="black" />
      </Pressable>

      <Modal visible={open} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setOpen(false)}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <DateTimePicker
              mode="single"
              date={value ? value : dayjs()}
              onChange={(params: any) => setValue(dayjs(params.date).format('YYYY-MM-DD'))}
              maxDate={dayjs()}
              initialView={type}
              navigationPosition="right"
              // @ts-ignore
              styles={calendarStyles}
              components={{
                Month: CustomMonth,
              }}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

 const calendarStyles = {
   day: {
     borderRadius: 32,
     justifyContent: 'center',
     alignItems: 'center' as const,
   },
   selected: { 
     backgroundColor: '#FF3B30',
     borderRadius: 32,
   },
   selected_label: {
     color: 'white',
     fontWeight: '600',
   },
   today: {
     borderWidth: 1.5,
     borderColor: '#FF3B30',
     borderRadius: 32,
   },
   today_label: {
     color: '#FF3B30',
     fontWeight: '600',
   },
   month_label: { fontSize: 16 },
   year_label: { fontSize: 16 },
   selected_month: {
     backgroundColor: '#FF3B30',
     borderRadius: 24,
   },
   selected_month_label: {
     color: 'white',
     fontWeight: '600',
   },
   active_month: {
    backgroundColor: 'white',
    borderColor: '#FF3B30',
    borderRadius: 24,
    borderWidth: 1,
   },
   active_month_label: {
    color: '#FF3B30',
    fontWeight: '600',
    fontSize: 16,
   },
  
  selected_year: {
    backgroundColor: 'white',
    borderColor: '#FF3B30',
    borderRadius: 24,
    borderWidth: 1,
  },
  selected_year_label: {
   color: '#FF3B30',
   fontWeight: '600',
  },
  active_year: {
     backgroundColor: '#FF3B30',
     borderRadius: 24,
  },
  active_year_label: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  header: {
    marginBottom: 20,
    paddingBottom: 16,
  },
  month_selector_label: {
    fontSize:18,
    fontWeight: '600',
  },
  year_selector_label: {
    fontSize: 18,
    fontWeight: '600',
  },
  button_next_image: {
    tintColor: '#FF3B30',
    width: 20,
    height: 20,
  },
  button_prev_image: {
    tintColor: '#FF3B30',
    width: 20,
    height: 20,
  },
}

const styles = StyleSheet.create({
  trigger: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    padding: 16,
    paddingBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // bg-black/50
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16, // rounded-2xl
    padding: 16, // p-4
    borderWidth: 1,
    borderColor: '#9CA3AF', // border-gray-400
    width: '90%', // w-[90%]
    maxHeight: '90%', // max-h-[90%]
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8, // mb-2
  },
  value: {
    alignSelf: 'flex-end',
    marginBottom: 2,
  },
  title: {
    position: 'absolute',
    left: 16,
    top: 24,
    opacity: 0.4
  },
  active_title: {
    position: 'absolute',
    left: 16,
    top: 10,
    opacity: 0.4
  },
  icon: {
    marginBottom: 16,
  }
});
