import { useRouter } from 'expo-router';
import { MoveLeft, Trash } from 'lucide-react-native';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import FocusOnCard from '@/app/products/components/FocusOnCard';
import ButtonRounded from '@/components/ui/ButtonRounded';
import CustomSwitch from '@/components/ui/CustomSwitch';
import { useDeletedProducts } from '@/hooks/useDeletedProducts';
import { useProductSettings } from '@/hooks/useProductSettings';
import { CurrentPhaseInfo } from '@/store/phase';
import { Product, Products } from '@/store/products';
import useProductsStore from '@/store/useProducts';

const nutrientToCategoryMap: Record<string, string> = {
  'iron': 'Iron',
  'magnesium': 'Magnesium',
  'omega-3': 'Omega-3',
  'potassium': 'Potassium',
  'vitamin-b': 'B vitamins',
  'vitamin-b6': 'B vitamins',
  'vitamin-e': 'Vitamin E',
  'choline': 'Choline',
  'antioxidants': 'Antioxidants',
  'fiber': 'Fiber',
  'methionine-cysteine': 'Methionine-Cysteine',
};

export default function ProductsSettings() {
  const router = useRouter();
  const { isVegetarian, isVegan, updateSettings } = useProductSettings();
  const { phaseName } = CurrentPhaseInfo();
  const phaseNutrients = useProductsStore((state) => state.productsInfo[phaseName as keyof typeof state.productsInfo].nutrients);
  
  const phaseCategories = phaseNutrients
    .map((nutrient) => nutrientToCategoryMap[nutrient])
    .filter((category): category is string => category !== undefined)
    .filter((category, index, array) => array.indexOf(category) === index);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <MoveLeft size={30} color="black" />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Customize your products</Text>
          <Text style={styles.infoDescription}>
            Remove products you don't like to personalize your plan. We'll ask you to review this each phase in your first
            cycle. You can edit the list in Settings.
          </Text>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>I am vegetarian</Text>
            <CustomSwitch value={isVegetarian} onValueChange={(value) => updateSettings({ is_vegetarian: value })} />
          </View>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>I am vegan</Text>
            <CustomSwitch value={isVegan} onValueChange={(value) => updateSettings({ is_vegan: value })} />
          </View>
        </View>
        <FocusOnCard />

        <View style={styles.spacer}></View>

        {phaseCategories.map((item) => (
          <CategoryList key={item} title={item} />
        ))}

        <View style={styles.deletedProductsCard}>
          <View>
            <Text style={styles.deletedProductsTitle}>Changed your mind?</Text>
            <Text style={styles.deletedProductsDescription}>Restore deleted products.</Text>
          </View>
          <ButtonRounded
            title="See deleted"
            onPress={() => router.push('/products/deleted' as any)}
            className={{ width: 'auto', minHeight: 34, backgroundColor: 'transparent', borderWidth: 1 }}
            textStyle={{ fontSize: 12 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Маппинг названий категорий на питательные вещества
const getNutrientsForCategory = (category: string): string[] => {
  const mapping: Record<string, string[]> = {
    'Iron': ['iron'],
    'Omega-3': ['omega-3'],
    'Potassium': ['potassium'],
    'B vitamins': ['vitamin-b1', 'vitamin-b2', 'vitamin-b6', 'vitamin-b9', 'vitamin-b12'],
    'Magnesium': ['magnesium'],
    'Choline': ['choline'],
    'Antioxidants': ['antioxidants'],
    'Fiber': ['fiber'],
    'Methionine-Cysteine': ['methionine-cysteine'],
    'Vitamin E': ['vitamin-e'],
  };
  return mapping[category] || [];
};

// Функция фильтрации продуктов по питательным веществам
const filterProductsByNutrients = (category: string, deletedProducts: string[] = []): Product[] => {
  const nutrients = getNutrientsForCategory(category);
  if (nutrients.length === 0) return [];

  return Products.filter((product) => {
    return !deletedProducts.includes(product.name) && 
           nutrients.some((nutrient) => product.nutrients.includes(nutrient));
  });
};

const CategoryList = ({ title }: { title: string }) => {
  const router = useRouter();
  const { deletedProducts, updateDeletedProducts } = useDeletedProducts();
  
  const filteredProducts = filterProductsByNutrients(title, deletedProducts);
  const topProducts = filteredProducts.slice(0, 10);

  const handleDelete = (productName: string) => {
    if (!deletedProducts.includes(productName)) {
      updateDeletedProducts([...deletedProducts, productName]);
    }
  };

  return (
    <>
      <Text style={styles.categoryTitle}>Top {title} products:</Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScrollView}
        contentContainerStyle={styles.categoryScrollContent}
      >
        {topProducts.map((product) => {
          return (
            <View key={product.name} style={styles.productCard}>
              <TouchableOpacity
                onPress={() => handleDelete(product.name)}
                disabled={deletedProducts.includes(product.name)}
                style={[
                  styles.deleteButton,
                  deletedProducts.includes(product.name) && styles.deleteButtonDisabled,
                ]}
              >
                <Trash size={20} color="white" />
              </TouchableOpacity>
              {product.imageUrl ? (
                <Image source={product.imageUrl} style={styles.productImage} />
              ) : (
                <View style={styles.productImagePlaceholder}>
                  <Text style={styles.productImagePlaceholderText}>
                    {product.name.charAt(0)}
                  </Text>
                </View>
              )}
              <Text style={styles.productName}>{product.name}</Text>
            </View>
          );
        })}
        <TouchableOpacity
          onPress={() => router.push({ pathname: '/products/all', params: { categoryName: title } } as any)}
          style={styles.seeAllButton}
        >
          <Text style={styles.seeAllButtonText}>See all</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoCard: {
    backgroundColor: '#F5F3F3',
    borderRadius: 12,
    justifyContent: 'center',
    padding: 16,
    marginTop: 16,
  },
  infoTitle: {
    fontFamily: 'ArchivoBlack-Regular',
    fontSize: 24,
    marginBottom: 8,
    fontWeight: '800',
  },
  infoDescription: {
    marginBottom: 12,
    fontFamily: 'Poppins',
    fontSize: 14,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    marginBottom: 2,
  },
  switchLabel: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
  },
  spacer: {
    marginBottom: 16,
    gap: 16,
  },
  deletedProductsCard: {
    padding: 16,
    borderRadius: 24,
    backgroundColor: '#F5F5F5',
    gap: 8,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deletedProductsTitle: {
    fontWeight: '500',
    fontFamily: 'Poppins',
  },
  deletedProductsDescription: {
    fontSize: 12,
    fontFamily: 'Poppins',
  },
  categoryTitle: {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  categoryScrollView: {
    marginBottom: 24,
  },
  categoryScrollContent: {
    gap: 12,
  },
  productCard: {
    width: 100,
    alignItems: 'center',
    position: 'relative',
  },
  deleteButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    zIndex: 1,
    borderRadius: 100,
    padding: 6,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  deleteButtonDisabled: {
    backgroundColor: 'rgba(128, 128, 128, 0.8)',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: 'white',
    marginBottom: 4,
  },
  productImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
    marginBottom: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImagePlaceholderText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#999',
    textTransform: 'uppercase',
  },
  productName: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Poppins',
    color: '#404040',
  },
  seeAllButton: {
    width: 100,
    height: 100,
    alignItems: 'center',
    backgroundColor: '#F5F3F3',
    borderRadius: 12,
    justifyContent: 'center',
  },
  seeAllButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins',
    color: '#404040',
    fontWeight: '600',
  },
  card: {
    padding: 16,
    borderRadius: 16,
    marginTop: 20,
    alignItems: 'center',
  },
});
