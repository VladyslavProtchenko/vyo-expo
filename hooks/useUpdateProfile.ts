import { supabase } from '@/config/supabase';
import useUserStore from '@/store/useUserStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type ProfileField = 'name' | 'weight' | 'height' | 'waist' | 'hips' | 'age' | 'cycleDuration' | 'menstruationDuration' | 'unitSystem';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { setUser } = useUserStore();

  return useMutation({
    mutationFn: async ({ field, value }: { field: ProfileField; value: string | number }) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('User not authenticated');

      const profileFields: ProfileField[] = ['name', 'weight', 'height', 'waist', 'hips', 'age', 'unitSystem'];
      const medicalFields: ProfileField[] = ['cycleDuration', 'menstruationDuration'];

      if (profileFields.includes(field)) {
        const dbFieldMap: Record<'name' | 'weight' | 'height' | 'waist' | 'hips' | 'age' | 'unitSystem', string> = {
          name: 'name',
          weight: 'weight',
          height: 'height',
          waist: 'waist',
          hips: 'hips',
          age: 'age',
          unitSystem: 'unit_system',
        };

        const { error } = await supabase
          .from('profiles')
          .update({ [dbFieldMap[field as keyof typeof dbFieldMap]]: value })
          .eq('id', session.user.id);

        if (error) throw error;
      } else if (medicalFields.includes(field)) {
        const dbFieldMap: Record<'cycleDuration' | 'menstruationDuration', string> = {
          cycleDuration: 'cycle_duration',
          menstruationDuration: 'menstruation_duration',
        };

        const { error } = await supabase
          .from('medical_data')
          .update({ [dbFieldMap[field as keyof typeof dbFieldMap]]: value })
          .eq('user_id', session.user.id);

        if (error) throw error;
      }

      return { field, value };
    },
    onSuccess: ({ field, value }) => {
      setUser({ [field]: value });
      queryClient.invalidateQueries({ queryKey: ['userData'] });
    },
  });
};
