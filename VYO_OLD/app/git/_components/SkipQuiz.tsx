import React, { useState } from 'react';
import { Modal, Pressable, Text, View, StyleSheet } from 'react-native';
import { typography } from '../../styles/globalStyles';
import ButtonRounded from './ui/ButtonRounded';

export default ({navigation}: {navigation: any}) => {
  const [open, setOpen] = useState(false);

  const handleSkip = () => {
    setOpen(false);
    navigation.navigate('SyncData');
  };

  return (
    <View>
      <Pressable onPress={() => setOpen(true)}>
        <Text style={ typography.p}>Skip</Text>
      </Pressable>

      <Modal visible={open} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setOpen(false)}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <Text style={[typography.h1, { fontSize: 24, marginBottom: 16 }]}>Skip the quiz?</Text>
            <Text style={[typography.p, {marginBottom: 12 }]}>This short quiz helps us tailor a care plan just for you 💛  </Text>
            <Text style={[typography.p, { marginBottom: 24 }]}>No worries — it’s saved and you can come back to it anytime, you’ll find it waiting on your home screen whenever you’re ready.</Text>
            
            <View style={styles.buttonContainer}>
              <ButtonRounded
                title="Stay and proceed"
                type='black'
                onPress={() => setOpen(false)}
              />  
              <ButtonRounded
                title="Skip"
                onPress={handleSkip}
              />  
              
              
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};



const styles = StyleSheet.create({

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
    width: '90%',
    // maxWidth: 400,
  },

  buttonContainer: {
    gap: 12,
    alignItems: 'center',
  },
});
