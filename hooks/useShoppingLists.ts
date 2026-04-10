import { supabase } from '@/config/supabase';
import * as Sentry from '@sentry/react-native';
import { useQuery } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

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
    throwOnError: (error) => {
      Sentry.captureException(error, { tags: { action: 'load_shopping_lists' } });
      Toast.show({ type: 'error', text1: 'Failed to load lists', text2: error.message || 'Please try again.' });
      return false;
    },
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
    throwOnError: (error) => {
      Sentry.captureException(error, { tags: { action: 'load_shopping_list_by_id' } });
      Toast.show({ type: 'error', text1: 'Failed to load list', text2: error.message || 'Please try again.' });
      return false;
    },
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
    throwOnError: (error) => {
      Sentry.captureException(error, { tags: { action: 'load_shopping_list_today' } });
      return false;
    },
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
