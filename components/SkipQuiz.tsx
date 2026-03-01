import ButtonRounded from '@/components/ui/ButtonRounded';
import { typography } from '@/constants/typography';
import { useSavePartialQuiz } from '@/hooks/useProfileData';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

interface SkipQuizProps {
  currentStep: number;
}

export default function SkipQuiz({ currentStep }: SkipQuizProps) {
  const [open, setOpen] = useState(false);
  const { savePartialQuizData, loading } = useSavePartialQuiz();
  const router = useRouter();

  const handleSkip = async () => {
    setOpen(false);
    
    const result = await savePartialQuizData(currentStep);
    
    if (result.success) {
      router.push('/sync-data' as any);
    } else {
      console.error('Failed to save partial quiz:', result.error);
      alert('Failed to save data. Please try again.');
    }
  };

  return (
    <View>
      <Pressable onPress={() => setOpen(true)} disabled={loading}>
        <Text style={typography.p}>Skip</Text>
      </Pressable>

      <Modal visible={open} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setOpen(false)}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <Text style={[typography.h1, { fontSize: 24, marginBottom: 16 }]}>Skip the quiz?</Text>
            <Text style={[typography.p, { marginBottom: 12 }]}>This short quiz helps us tailor a care plan just for you 💛</Text>
            <Text style={[typography.p, { marginBottom: 24 }]}>No worries — it's saved and you can come back to it anytime, you'll find it waiting on your home screen whenever you're ready.</Text>
            
            <View style={styles.buttonContainer}>
              <ButtonRounded
                title="Stay and proceed"
                type='black'
                onPress={() => setOpen(false)}
                enabled={!loading}
                className={styles.fullWidthButton}
              />  
              <ButtonRounded
                title={loading ? "Saving..." : "Skip"}
                onPress={handleSkip}
                enabled={!loading}
                className={styles.fullWidthButton}
              />  
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

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
  },
  buttonContainer: {
    gap: 12,
    width: '100%',
  },
  fullWidthButton: {
    width: '100%',
  },
});
