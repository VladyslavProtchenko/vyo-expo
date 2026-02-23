import { supabase } from '@/config/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useDeletedProducts = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['deletedProducts'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('user_product_settings')
        .select('deleted_products')
        .eq('user_id', session.user.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return [] as string[];
        }
        throw error;
      }

      return (data?.deleted_products || []) as string[];
    },
  });

  const mutation = useMutation({
    mutationFn: async (deletedProducts: string[]) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('user_product_settings')
        .upsert({
          user_id: session.user.id,
          deleted_products: deletedProducts,
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;
      return deletedProducts;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deletedProducts'] });
    },
  });

  return {
    deletedProducts: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    updateDeletedProducts: mutation.mutate,
    updateDeletedProductsAsync: mutation.mutateAsync,
    isUpdating: mutation.isPending,
  };
};
