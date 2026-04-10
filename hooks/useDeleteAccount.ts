import { supabase } from '@/config/supabase';
import { useAuthCleanup } from '@/hooks/useAuthCleanup';
import { markManualSignOut } from '@/utils/authSessionEvents';
import * as Sentry from '@sentry/react-native';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

export const useDeleteAccount = () => {
  const router = useRouter();
  const { clearAllUserData } = useAuthCleanup();

  return useMutation({
    mutationFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('User not authenticated');

      Sentry.addBreadcrumb({ category: 'auth', message: 'Account deletion attempt', level: 'info' });

      const { error } = await supabase.rpc('delete_user_account');
      if (error) throw error;

      return true;
    },
    onSuccess: async () => {
      Sentry.addBreadcrumb({ category: 'auth', message: 'Account deleted successfully', level: 'info' });
      markManualSignOut();
      clearAllUserData();
      Sentry.setUser(null);
      await supabase.auth.signOut();
      router.replace('/account-deleted' as any);
    },
    onError: (error) => {
      Sentry.captureException(error, { tags: { action: 'delete_account' } });
    },
  });
};
