import { supabase } from '@/config/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface UpdateProfileData {
  age?: number;
  weight?: number;
  height?: number;
  waist?: number;
  hips?: number;
  unit_system?: 'metric' | 'imperial';
  onboarding_completed?: boolean;
  is_quiz_skipped?: boolean;
  last_completed_quiz_step?: number;
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateProfileData) => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        throw new Error('Not authenticated');
      }

      const { error } = await supabase
        .from('profiles')
        .upsert({ id: session.user.id, ...data }, { onConflict: 'id' });

      if (error) throw error;

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['onboarding-data'] });
    },
  });
};
