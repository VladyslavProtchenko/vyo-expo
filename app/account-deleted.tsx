import { supabase } from '@/config/supabase';
import { AppColors } from '@/constants/theme';
import useSymptomsStore from '@/store/useSymptoms';
import useUserStore from '@/store/useUserStore';
import { markManualSignOut } from '@/utils/authSessionEvents';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function AccountDeletedScreen() {
  const resetUser = useUserStore((s) => s.resetUser);
  const resetSymptoms = useSymptomsStore((s) => s.reset);

  useEffect(() => {
    const cleanup = async () => {
      markManualSignOut();
      resetUser();
      resetSymptoms();
      await supabase.auth.signOut();
    };

    cleanup();
  }, []);

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
