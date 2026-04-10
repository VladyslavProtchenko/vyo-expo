import { supabase } from '@/config/supabase';
import * as Sentry from '@sentry/react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

export const useDeleteShoppingList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (listId: string) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('shopping_lists')
        .delete()
        .eq('id', listId)
        .eq('user_id', session.user.id);

      if (error) throw error;
      return listId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shoppingLists'] });
      queryClient.invalidateQueries({ queryKey: ['shoppingList'] });
      queryClient.invalidateQueries({ queryKey: ['shoppingListToday'] });
    },
    onError: (error: Error) => {
      Sentry.captureException(error, { tags: { action: 'delete_shopping_list' } });
      Toast.show({ type: 'error', text1: 'Failed to delete', text2: error.message || 'Please try again.' });
    },
  });
};
