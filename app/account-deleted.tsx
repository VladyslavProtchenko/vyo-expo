import { AppColors } from '@/constants/theme';
import { StyleSheet, Text, View } from 'react-native';

export default function AccountDeletedScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>💜</Text>
      <Text style={styles.title}>Your account has been deleted</Text>
      <Text style={styles.subtitle}>We hope to see you again someday</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    gap: 12,
  },
  emoji: {
    fontSize: 56,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    color: AppColors.black,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'Poppins',
    color: AppColors.textMuted,
    textAlign: 'center',
  },
});
