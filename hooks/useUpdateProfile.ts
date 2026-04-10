import { supabase } from '@/config/supabase';
import * as Sentry from '@sentry/react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

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

      if (__DEV__) console.log('[useUpdateProfile] session.user:', JSON.stringify(session.user));

      const { error } = await supabase
        .from('profiles')
        .upsert({ id: session.user.id, email: session.user.email, ...data }, { onConflict: 'id' });

      if (error) throw error;

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['onboarding-data'] });
    },
    onError: (error: Error) => {
      if (__DEV__) console.error('[useUpdateProfile] error:', error);
      Sentry.captureException(error, { tags: { action: 'update_profile' } });
      Toast.show({
        type: 'error',
        text1: 'Failed to save',
        text2: error.message || 'Please try again.',
      });
    },
  });
};
