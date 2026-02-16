import { useRouter } from 'expo-router';
import { MoveLeft, Trash } from 'lucide-react-native';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import FocusOnCard from '@/app/products/components/FocusOnCard';
import ButtonRounded from '@/components/ui/ButtonRounded';
import CustomSwitch from '@/components/ui/CustomSwitch';
import { Product, Products } from '@/store/products';

export default function ProductsSettings() {
  const router = useRouter();
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isVegan, setIsVegan] = useState(false);

  const allProducts = Products.map((p) => p.name);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <MoveLeft size={30} color="black" />
        <ButtonRounded
          type="black"
          className={{ width: 70, minHeight: 34, paddingHorizontal: 12, paddingVertical: 8 }}
          title="Save"
          onPress={() => router.back()}
        />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ backgroundColor: '#F5F3F3', borderRadius: 12, justifyContent: 'center', padding: 16, marginTop: 16 }}>
          <Text style={{ fontFamily: 'ArchivoBlack-Regular', fontSize: 24, marginBottom: 8, fontWeight: '800' }}>
            Customize your products
          </Text>
          <Text style={{ marginBottom: 12, fontFamily: 'Poppins', fontSize: 14 }}>
            Remove products you don't like to personalize your plan. We'll ask you to review this each phase in your first
            cycle. You can edit the list in Settings.
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 4,
              marginBottom: 2,
            }}
          >
            <Text style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: '600' }}>I am vegetarian</Text>
            <CustomSwitch value={isVegetarian} onValueChange={setIsVegetarian} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4 }}>
            <Text style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: '600' }}>I am vegan</Text>
            <CustomSwitch value={isVegan} onValueChange={setIsVegan} />
          </View>
        </View>
        <FocusOnCard />

        <View style={{ marginBottom: 16, gap: 16 }}></View>

        {['Iron', 'Omega-3', 'Potassium', 'B vitamins', 'Magnesium'].map((item) => (
          <CategoryList key={item} title={item} />
        ))}

        <View
          style={{
            padding: 16,
            borderRadius: 24,
            backgroundColor: '#F5F5F5',
            gap: 8,
            marginBottom: 24,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View>
            <Text style={{ fontWeight: '500', fontFamily: 'Poppins' }}>Changed your mind?</Text>
            <Text style={{ fontSize: 12, fontFamily: 'Poppins' }}>Restore deleted products.</Text>
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
  };
  return mapping[category] || [];
};

// Функция фильтрации продуктов по питательным веществам
const filterProductsByNutrients = (category: string): Product[] => {
  const nutrients = getNutrientsForCategory(category);
  if (nutrients.length === 0) return [];

  return Products.filter((product) => {
    return nutrients.some((nutrient) => product.nutrients.includes(nutrient));
  });
};

const CategoryList = ({ title }: { title: string }) => {
  const router = useRouter();
  
  // Фильтруем продукты по питательным веществам категории
  const filteredProducts = filterProductsByNutrients(title);
  // Берем топ 10 продуктов
  const topProducts = filteredProducts.slice(0, 10);

  return (
    <>
      <Text style={{ fontFamily: 'Poppins', fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
        Top {title} products:
      </Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 24 }}
        contentContainerStyle={{ gap: 12 }}
      >
        {topProducts.map((product) => {
          return (
            <View key={product.name} style={{ width: 100, alignItems: 'center', position: 'relative' }}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  zIndex: 1,
                  borderRadius: 100,
                  padding: 6,
                  paddingHorizontal: 10,
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                }}
              >
                <Trash size={20} color="white" />
              </TouchableOpacity>
              {product.imageUrl ? (
                <Image
                  source={product.imageUrl}
                  style={{ width: 100, height: 100, borderRadius: 12, backgroundColor: 'white', marginBottom: 4 }}
                />
              ) : (
                <View
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 12,
                    backgroundColor: '#E0E0E0',
                    marginBottom: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontSize: 32, fontWeight: '600', color: '#999', textTransform: 'uppercase' }}>
                    {product.name.charAt(0)}
                  </Text>
                </View>
              )}
              <Text style={{ textAlign: 'center', fontSize: 12, fontFamily: 'Poppins', color: '#404040' }}>
                {product.name}
              </Text>
            </View>
          );
        })}
        <TouchableOpacity
          onPress={() => router.push({ pathname: '/products/all', params: { categoryName: title } } as any)}
          style={{ width: 100, height: 100, alignItems: 'center', backgroundColor: '#F5F3F3', borderRadius: 12, justifyContent: 'center' }}
        >
          <Text style={{ fontSize: 16, fontFamily: 'Poppins', color: '#404040', fontWeight: '600' }}>See all</Text>
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
  card: {
    padding: 16,
    borderRadius: 16,
    marginTop: 20,
    alignItems: 'center',
  },
});
