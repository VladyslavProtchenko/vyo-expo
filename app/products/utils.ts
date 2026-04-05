import { DietaryTag, Nutrient, Product, Products } from '@/store/products';

export type DietaryFilter = { isVegan: boolean; isVegetarian: boolean };

export const getNutrientsForCategory = (category: string): Nutrient[] => {
  const mapping: Record<string, Nutrient[]> = {
    'Iron': ['iron'],
    'Omega-3': ['omega-3'],
    'Potassium': ['potassium'],
    'B vitamins': ['vitamin-b1', 'vitamin-b2', 'vitamin-b6', 'vitamin-b9', 'vitamin-b12'],
    'Magnesium': ['magnesium'],
    'Choline': ['choline'],
    'Antioxidants': ['vitamin-c', 'vitamin-e'],
    'Fiber': ['fiber'],
    'Methionine-Cysteine': ['methionine-cysteine'],
    'Vitamin E': ['vitamin-e'],
  };
  return mapping[category] || [];
};

const getAllowedDietaryTags = (dietary: DietaryFilter): DietaryTag[] | null => {
  if (dietary.isVegan) return ['vegan'];
  if (dietary.isVegetarian) return ['vegan', 'vegetarian'];
  return null;
};

const matchesDietary = (product: Product, allowedTags: DietaryTag[] | null): boolean => {
  if (allowedTags === null) return true;
  return product.dietary !== undefined && allowedTags.includes(product.dietary);
};

export const filterProductsByNutrients = (
  category: string,
  deletedProducts: string[] = [],
  dietary: DietaryFilter = { isVegan: false, isVegetarian: false },
): Product[] => {
  const nutrients = getNutrientsForCategory(category);
  if (nutrients.length === 0) return [];

  const allowedTags = getAllowedDietaryTags(dietary);
  return Products.filter(
    (product) =>
      !deletedProducts.includes(product.name) &&
      nutrients.some((nutrient) => product.nutrients.includes(nutrient)) &&
      matchesDietary(product, allowedTags),
  );
};

export const filterAllProducts = (
  deletedProducts: string[] = [],
  dietary: DietaryFilter = { isVegan: false, isVegetarian: false },
): Product[] => {
  const allowedTags = getAllowedDietaryTags(dietary);
  return Products.filter(
    (product) =>
      !deletedProducts.includes(product.name) &&
      matchesDietary(product, allowedTags),
  );
};
