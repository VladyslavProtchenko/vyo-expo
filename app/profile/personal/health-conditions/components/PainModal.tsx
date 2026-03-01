import ButtonGradient from '@/components/ui/ButtonGradient';
import { typography } from '@/constants/typography';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ImageBackground, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

interface PainModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function PainModal({ visible, onClose }: PainModalProps) {
  const router = useRouter();

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <ImageBackground 
          source={require('@/assets/images/pain/pain.webp')} 
          resizeMode="cover" 
          style={styles.backgroundImage}
        >
          <Pressable 
            style={styles.closeButton}
            onPress={onClose}
          >
            <MaterialIcons name="close" size={40} color="white" />
          </Pressable>

          <View style={styles.content}>
            <Image 
              source={require('@/assets/images/pain/pain-icon.webp')} 
              style={styles.heartIcon}
            />
            <Text style={[typography.h1, styles.title]}>
              Help us{'\n'}understand your{'\n'}pain better
            </Text>
            <Text style={[typography.p, styles.text]}>
              You've logged pain today. Answer 4 quick questions so we can adjust your care plan and give you more precise support.
            </Text>
            <ButtonGradient
              title="Continue"
              icon={<MaterialIcons name="arrow-forward" size={20} color="black" />}
              onPress={() => {
                onClose();
                router.push('/pain-steps/step-1' as any);
              }}
              className={styles.button}
            />
          </View>
        </ImageBackground>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop: 60,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 10,
    padding: 8,
  },
  content: {
    paddingVertical: 40,
    paddingHorizontal: 16,
    width: '100%',
    justifyContent: 'flex-end',
    flex: 1,
    paddingBottom: 60,
  },
  heartIcon: {
    width: 60,
    height: 38,
    marginBottom: 16,
    resizeMode: 'contain',
  },
  title: {
    color: 'white',
    marginBottom: 8,
    fontSize: 36,
  },
  text: {
    color: 'white',
    marginBottom: 40,
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    borderRadius: 50,
    height: 56,
  },
});
