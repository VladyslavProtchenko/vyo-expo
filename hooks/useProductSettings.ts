import { supabase } from '@/config/supabase';
import * as Sentry from '@sentry/react-native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

export const useProductSettings = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['productSettings'],
    throwOnError: (error) => {
      Sentry.captureException(error, { tags: { action: 'load_product_settings' } });
      Toast.show({ type: 'error', text1: 'Failed to load settings', text2: error.message || 'Please restart the app.' });
      return false;
    },
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('user_product_settings')
        .select('is_vegetarian, is_vegan')
        .eq('user_id', session.user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      return {
        is_vegetarian: data?.is_vegetarian ?? false,
        is_vegan: data?.is_vegan ?? false,
      };
    },
  });

  const updateSettings = useMutation({
    mutationFn: async (settings: { is_vegetarian?: boolean; is_vegan?: boolean }) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('user_product_settings')
        .upsert({
          user_id: session.user.id,
          ...settings,
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productSettings'] });
    },
    onError: (error: Error) => {
      Sentry.captureException(error, { tags: { action: 'update_product_settings' } });
      Toast.show({ type: 'error', text1: 'Failed to save settings', text2: error.message || 'Please try again.' });
    },
  });

  return {
    isVegetarian: query.data?.is_vegetarian ?? false,
    isVegan: query.data?.is_vegan ?? false,
    updateSettings: updateSettings.mutate,
  };
};
