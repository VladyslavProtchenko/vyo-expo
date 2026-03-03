import { supabase } from '@/config/supabase';
import { useQuery } from '@tanstack/react-query';

export type ShoppingListRow = {
  id: string;
  user_id: string;
  date: string;
  products: string[];
  custom_products: string[];
  created_at: string;
  updated_at: string;
};

export const useShoppingLists = () => {
  return useQuery({
    queryKey: ['shoppingLists'],
    queryFn: async (): Promise<ShoppingListRow[]> => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('shopping_lists')
        .select('*')
        .eq('user_id', session.user.id)
        .order('date', { ascending: false });

      if (error) throw error;
      return (data ?? []) as ShoppingListRow[];
    },
  });
};

export const useShoppingListById = (id: string | undefined) => {
  return useQuery({
    queryKey: ['shoppingList', id],
    enabled: !!id,
    queryFn: async (): Promise<ShoppingListRow | null> => {
      if (!id) return null;
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('shopping_lists')
        .select('*')
        .eq('id', id)
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (error) throw error;
      return data as ShoppingListRow | null;
    },
  });
};

export const useShoppingListForToday = () => {
  const today = new Date().toISOString().slice(0, 10);
  return useQuery({
    queryKey: ['shoppingListToday', today],
    queryFn: async (): Promise<ShoppingListRow | null> => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('shopping_lists')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('date', today)
        .order('updated_at', { ascending: false })
        .limit(1);

      if (error) throw error;
      const row = (data as ShoppingListRow[])?.[0] ?? null;
      return row;
    },
  });
};
