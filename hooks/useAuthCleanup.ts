import { useQueryClient } from '@tanstack/react-query';
import { useShoppingListStore } from '@/store/shoppingList';
import useSymptomsStore from '@/store/useSymptoms';
import useUserStore from '@/store/useUserStore';

export const useAuthCleanup = () => {
  const queryClient = useQueryClient();
  const resetUser = useUserStore((s) => s.resetUser);
  const resetSymptoms = useSymptomsStore((s) => s.reset);
  const resetShoppingList = useShoppingListStore((s) => s.reset);

  const clearAllUserData = () => {
    resetUser();
    resetSymptoms();
    resetShoppingList();
    queryClient.clear();
  };

  return { clearAllUserData };
};
