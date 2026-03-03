import { supabase } from '@/config/supabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
  });
};
