import { supabase } from '@/config/supabase';
import * as Sentry from '@sentry/react-native';
import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

export const useSaveShoppingList = () => {
  return useMutation({
    mutationFn: async ({
      products,
      customProducts,
      date,
      listId,
    }: {
      products: string[];
      customProducts: string[];
      date: string;
      listId?: string;
    }) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('Not authenticated');

      if (listId) {
        const { error } = await supabase
          .from('shopping_lists')
          .update({
            products,
            custom_products: customProducts,
            updated_at: new Date().toISOString(),
          })
          .eq('id', listId)
          .eq('user_id', session.user.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('shopping_lists').insert({
          user_id: session.user.id,
          date,
          products,
          custom_products: customProducts,
        });
        if (error) throw error;
      }
      return { products, customProducts, date };
    },
    onError: (error: Error) => {
      Sentry.captureException(error, { tags: { action: 'save_shopping_list' } });
      Toast.show({ type: 'error', text1: 'Failed to save', text2: error.message || 'Please try again.' });
    },
  });
};
