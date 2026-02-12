import { typography } from '@/constants/typography';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import { Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

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
  const [show, setShow] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(
    value ? dayjs(value).toDate() : new Date()
  );

  const onChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setTempDate(selectedDate);
    }
  };

  const onConfirm = () => {
    setValue(dayjs(tempDate).format('YYYY-MM-DD'));
    setShow(false);
  };

  const onCancel = () => {
    setShow(false);
    setTempDate(value ? dayjs(value).toDate() : new Date());
  };

  return (
    <View>
      <Pressable
        onPress={() => {
          setTempDate(value ? dayjs(value).toDate() : new Date());
          setShow(true);
        }}
        style={styles.trigger}
      >
        <Text style={[typography.p, value ? styles.active_title : styles.title]}>{title}</Text>
        {value ? (
          <Text style={[typography.p, styles.value]}>
            {dayjs(value).format('DD MMMM YYYY')}
          </Text>
        ) : (
          <View></View>
        )}
        
        <Octicons style={styles.icon} name="calendar" size={24} color="black" />
      </Pressable>

      <Modal visible={show} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={onCancel}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <View style={styles.pickerContainer}>
              <DateTimePicker
                value={tempDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onChange}
                maximumDate={new Date()}
                minimumDate={new Date('1950-01-01')}
                themeVariant="light"
                style={styles.picker}
              />
            </View>
            <View style={styles.modalFooter}>
              <Pressable onPress={onCancel} style={styles.cancelButtonContainer}>
                <MaterialIcons name="close" size={36} color="red" />
              </Pressable>
              <Pressable onPress={onConfirm} style={styles.confirmButtonContainer}>
                <MaterialIcons name="check" size={37} color="" />
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: '90%',
    overflow: 'hidden',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#9CA3AF',
  },
  pickerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  picker: {
    width: '100%',
    alignSelf: 'center',
  },
  modalFooter: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 24,
  },
  cancelButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    width: '50%',
  },
  confirmButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    width: '50%',
  },
  value: {
    alignSelf: 'flex-end',
    marginBottom: 2,
  },
  title: {
    position: 'absolute',
    left: 16,
    top: 24,
    opacity: 0.4,
  },
  active_title: {
    position: 'absolute',
    left: 16,
    top: 10,
    opacity: 0.4,
  },
  icon: {
    marginBottom: 16,
  },
});
