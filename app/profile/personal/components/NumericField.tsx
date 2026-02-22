import Input from '@/components/ui/Input';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
import useUserStore from '@/store/useUserStore';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface NumericFieldProps {
  title: string;
  field: 'weight' | 'height' | 'waist' | 'hips' | 'cycleDuration' | 'menstruationDuration';
  defaultValue: string;
}

export default function NumericField({ title, field, defaultValue }: NumericFieldProps) {
  const storeValue = useUserStore((state) => state[field]);
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newValue, setNewValue] = useState(storeValue ? storeValue.toString() : '');

  const handlePress = () => {
    setNewValue(storeValue ? storeValue.toString() : '');
    setIsModalVisible(true);
  };

  const handleSave = () => {
    const value = parseFloat(newValue);
    if (isNaN(value) || value <= 0) return;
    
    updateProfile({ field, value }, {
      onSuccess: () => setIsModalVisible(false),
      onError: (error) => console.error(`Error saving ${field}:`, error),
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setNewValue(storeValue ? storeValue.toString() : '');
  };

  return (
    <>
      <TouchableOpacity
        style={styles.menuCard}
        activeOpacity={0.7}
        onPress={handlePress}
      >
        <Text style={styles.menuItemText}>{title}</Text>
        <View style={styles.valueContainer}>
          <Text style={styles.valueText}>
            {storeValue ? storeValue.toString() : defaultValue}
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#000" style={styles.arrow} />
        </View>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit {title}</Text>
            <Input
              type="numeric"
              placeholder={`Enter ${title.toLowerCase()}`}
              value={newValue}
              onChange={setNewValue}
              style={styles.modalInput}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={handleCancel}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSave}
                activeOpacity={0.7}
                disabled={isPending || !newValue.trim() || isNaN(parseFloat(newValue))}
              >
                <Text style={styles.saveButtonText}>
                  {isPending ? 'Saving...' : 'Save'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  menuCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 50,
    paddingHorizontal: 16,
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#000',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  valueText: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: '#000',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  arrow: {
    marginLeft: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    width: '85%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#000',
    marginBottom: 20,
  },
  modalInput: {
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'flex-end',
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#E7E8ED',
    backgroundColor: 'white',
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#000',
  },
  saveButton: {
    backgroundColor: '#000',
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#FFF',
  },
});
