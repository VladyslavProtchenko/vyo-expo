import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Props } from '../_types/types';

export default function PrivacyScreen({ navigation }: Props<'Privacy'>) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.text}>
          Your privacy is important to us. This privacy policy explains how we collect, use, and protect your personal information.
        </Text>
        <Text style={styles.heading}>Information We Collect</Text>
        <Text style={styles.text}>
          We collect information that you provide directly to us, including your health data, profile information, and usage data.
        </Text>
        <Text style={styles.heading}>How We Use Your Information</Text>
        <Text style={styles.text}>
          We use your information to provide and improve our services, personalize your experience, and communicate with you.
        </Text>
        <Text style={styles.heading}>Data Security</Text>
        <Text style={styles.text}>
          We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
  },
});
