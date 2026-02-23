import { supabase } from '@/config/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useProductSettings = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['productSettings'],
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
  });

  return {
    isVegetarian: query.data?.is_vegetarian ?? false,
    isVegan: query.data?.is_vegan ?? false,
    updateSettings: updateSettings.mutate,
  };
};
