import { supabase } from '@/config/supabase';
import { useMutation } from '@tanstack/react-query';

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
  });
};
