import React, { useState } from 'react';
import { Text, View, StyleSheet, Modal, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { typography } from '../../styles/globalStyles';

interface IProps {
  title?: string;
  value: string | number | null;
  setValue: (value: any) => void;
  values: (string | number)[];
}

export default function CustomPicker({
  title = 'Select option',
  value,
  setValue,
  values,
}: IProps) {
  const [open, setOpen] = useState(false);

  return (
    <View>
    <Pressable onPress={() => setOpen(true)} style={styles.trigger} >
      <Text style={[typography.p, value? styles.active_title : styles.title]}>{title}</Text>
      {value ? <Text style={[typography.p, styles.value]}>{value}</Text>: <View></View>}
      <MaterialIcons style={styles.icon} name="keyboard-arrow-down" size={24} color="black" />
    </Pressable>

    <Modal visible={open} transparent animationType="fade">
      <Pressable style={styles.modalOverlay} onPress={() => setOpen(false)}>
        <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
     <Picker
         selectedValue={value}
         onValueChange={(itemValue) => setValue(itemValue)}
       >
         {values.map((item, index) => (
           <Picker.Item
             key={index}
             label={String(item)}
             value={item}
          />
         ))}
      </Picker>
        </Pressable>
      </Pressable>
    </Modal>
  </View>

  );
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