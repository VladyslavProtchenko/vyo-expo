import { supabase } from '@/config/supabase';
import useUserStore from '@/store/useUserStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateIsPain = () => {
  const queryClient = useQueryClient();
  const { setUser } = useUserStore();

  return useMutation({
    mutationFn: async (value: boolean) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('medical_data')
        .update({ is_pain: value })
        .eq('user_id', session.user.id);

      if (error) throw error;
      return value;
    },
    onSuccess: (value) => {
      setUser({ isPain: value });
      queryClient.invalidateQueries({ queryKey: ['userData'] });
    },
  });
};
