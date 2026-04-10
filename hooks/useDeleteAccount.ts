import { supabase } from '@/config/supabase';
import { useAuthCleanup } from '@/hooks/useAuthCleanup';
import { markManualSignOut } from '@/utils/authSessionEvents';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

export const useDeleteAccount = () => {
  const router = useRouter();
  const { clearAllUserData } = useAuthCleanup();

  return useMutation({
    mutationFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('User not authenticated');

      const { error } = await supabase.rpc('delete_user_account');
      if (error) throw error;

      return true;
    },
    onSuccess: async () => {
      markManualSignOut();
      clearAllUserData();
      await supabase.auth.signOut();
      router.replace('/account-deleted' as any);
    },
  });
};
