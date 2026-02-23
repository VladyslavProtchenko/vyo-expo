import { supabase } from '@/config/supabase';
import useUserStore from '@/store/useUserStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type MedicalArrayField = 
  | 'diagnosed_conditions'
  | 'symptoms'
  | 'other_symptoms'
  | 'is_regular_period'
  | 'pain_location'
  | 'additional_symptoms';

const dbToStoreMap: Partial<Record<MedicalArrayField, string>> = {
  diagnosed_conditions: 'diagnoses',
  symptoms: 'symptoms',
  other_symptoms: 'otherSymptoms',
  is_regular_period: 'isRegularPeriod',
  pain_location: 'painLocation',
};

export const useUpdateMedicalArray = () => {
  const queryClient = useQueryClient();
  const { setUser } = useUserStore();

  return useMutation({
    mutationFn: async ({ field, value }: { field: MedicalArrayField; value: string[] }) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('medical_data')
        .update({ [field]: value })
        .eq('user_id', session.user.id);

      if (error) throw error;
      return { field, value };
    },
    onSuccess: ({ field, value }) => {
      const storeField = dbToStoreMap[field];
      if (storeField) {
        setUser({ [storeField]: value } as any);
      }
      queryClient.invalidateQueries({ queryKey: ['userData'] });
    },
  });
};
