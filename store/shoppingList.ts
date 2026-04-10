import { create } from 'zustand';

type ProductsKey = 'products' | 'selectedProducts' | 'customProducts';

interface ShoppingListStore {
  products: string[];
  selectedProducts: string[];
  customProducts: string[];
  setProducts: (key: ProductsKey, items: string[]) => void;
  reset: () => void;
}

export const useShoppingListStore = create<ShoppingListStore>((set) => ({
  products: [],
  selectedProducts: [],
  customProducts: [],

  setProducts: (key, items) => set({ [key]: items }),
  reset: () => set({ products: [], selectedProducts: [], customProducts: [] }),
}));
