import { supabase } from '@/config/supabase';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

export const useDeleteAccount = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('User not authenticated');

      // Call RPC function to delete user from auth.users
      // Cascade will automatically delete profiles, medical_data, and diagnosis_results
      const { error } = await supabase.rpc('delete_user_account');

      if (error) throw error;
      
      return true;
    },
    onSuccess: () => {
      // Redirect to login screen
      router.replace('/');
    },
  });
};
