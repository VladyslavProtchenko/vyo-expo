import { useDeletedProducts } from '@/hooks/useDeletedProducts';
import { useProductSettings } from '@/hooks/useProductSettings';
import * as Sentry from '@sentry/react-native';
import { CurrentPhaseInfo } from '@/store/phase';
import { Products as AllProducts, Product } from '@/store/products';
import { generateProductVariants } from '@/utils/openai';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

const normalize = (str: string) =>
  str.toLowerCase().trim().replace(/\s*\([^)]*\)\s*/g, '');

const getRandomProducts = (isVegan: boolean, isVegetarian: boolean): Product[] => {
  const pool = AllProducts.filter((p) => {
    if (isVegan) return p.dietary === 'vegan';
    if (isVegetarian) return p.dietary === 'vegan' || p.dietary === 'vegetarian';
    return true;
  });
  return [...pool].sort(() => Math.random() - 0.5).slice(0, 9);
};

const findProductsByNames = (names: string[]): Product[] =>
  names
    .map((name) => {
      const n = normalize(name);
      return AllProducts.find((p) => {
        const pn = normalize(p.name);
        return pn === n || pn.includes(n) || n.includes(pn);
      });
    })
    .filter((p): p is Product => p !== undefined);

export function useProductVariants() {
  const [todayStr, setTodayStr] = useState(dayjs().format('YYYY-MM-DD'));
  const previousListsRef = useRef<Record<number, string[]>>({});
  const queryClient = useQueryClient();

  const { deletedProducts } = useDeletedProducts();
  const { isVegetarian, isVegan } = useProductSettings();

  const checkDate = useCallback(() => {
    const current = dayjs().format('YYYY-MM-DD');
    if (current !== todayStr) {
      previousListsRef.current = {};
      setTodayStr(current);
    }
  }, [todayStr]);

  // Проверяем дату при возврате на экран
  useFocusEffect(checkDate);

  // Проверяем дату когда приложение выходит на передний план
  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') checkDate();
    });
    return () => sub.remove();
  }, [checkDate]);

  const { data: products = getRandomProducts(isVegan, isVegetarian), isFetching, refetch } = useQuery({
    queryKey: ['products', todayStr, isVegetarian, isVegan],
    queryFn: async () => {
      const phase = CurrentPhaseInfo().phaseName;
      const names = await generateProductVariants(
        phase,
        previousListsRef.current,
        deletedProducts,
        isVegetarian,
        isVegan,
      );

      if (!names || names.length !== 9) return getRandomProducts(isVegan, isVegetarian);

      const found = findProductsByNames(names);
      if (found.length === 0) return getRandomProducts(isVegan, isVegetarian);

      const listNumber = Object.keys(previousListsRef.current).length + 1;
      previousListsRef.current[listNumber] = names;

      return found;
    },
    staleTime: Infinity,
    throwOnError: (error) => {
      Sentry.captureException(error, { tags: { action: 'load_product_variants' } });
      return false;
    },
  });

  const refresh = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['products', todayStr] });
    refetch();
  }, [todayStr, queryClient, refetch]);

  return { products, isLoading: isFetching, refresh };
}
