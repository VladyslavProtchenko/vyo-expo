import { supabase } from '@/config/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface UpdateMedicalData {
  start_menstruation?: string | null;
  menstruation_duration?: number;
  cycle_duration?: number;
  flow?: string | null;
  is_regular_period?: string[];
  diagnosed_conditions?: string[];
  symptoms?: string[];
  additional_symptoms?: string[];
  other_symptoms?: string[];
  is_pain?: boolean | null;
  pain_type?: string | null;
  pain_intensity?: number | null;
  pain_period?: string | null;
  pain_location?: string[] | null;
  pain_duration?: string | null;
  pain_case?: string | null;
  is_medicine?: string | null;
  is_pain_change?: string | null;
  surgery?: string | null;
  surgery_date?: string | null;
}

export const useUpdateMedicalData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateMedicalData) => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        throw new Error('Not authenticated');
      }

      const { error } = await supabase
        .from('medical_data')
        .upsert({
          user_id: session.user.id,
          ...data,
        }, {
          onConflict: 'user_id',
        });

      if (error) throw error;

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['onboarding-data'] });
    },
  });
};
