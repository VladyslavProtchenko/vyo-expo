import { supabase } from '@/config/supabase';
import * as Sentry from '@sentry/react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

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
  pain_type?: string[] | null;
  pain_intensity?: number | null;
  pain_period?: string[] | null;
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

      const userId = session.user.id;

      // Ensure profile exists before inserting medical_data (FK constraint)
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', userId)
        .single();

      if (!profile) {
        await supabase
          .from('profiles')
          .upsert({ id: userId, email: session.user.email ?? '' }, { onConflict: 'id' });
      }

      const { error } = await supabase
        .from('medical_data')
        .upsert({ user_id: userId, ...data }, { onConflict: 'user_id' });

      if (error) throw error;

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['onboarding-data'] });
    },
    onError: (error: Error) => {
      if (__DEV__) console.error('[useUpdateMedicalData] error:', error);
      Sentry.captureException(error, { tags: { action: 'update_medical_data' } });
      Toast.show({
        type: 'error',
        text1: 'Failed to save',
        text2: error.message || 'Please try again.',
      });
    },
  });
};
