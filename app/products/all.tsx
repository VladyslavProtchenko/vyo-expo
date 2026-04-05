import { useLocalSearchParams, useRouter } from 'expo-router';
import { MoveLeft, Trash } from 'lucide-react-native';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useDeletedProducts } from '@/hooks/useDeletedProducts';
import { useProductSettings } from '@/hooks/useProductSettings';
import { filterAllProducts, filterProductsByNutrients } from './utils';

export default function ProductsAll() {
  const router = useRouter();
  const { categoryName } = useLocalSearchParams<{ categoryName?: string }>();
  const displayCategoryName = categoryName || 'Products';
  const { deletedProducts, updateDeletedProducts } = useDeletedProducts();
  const { isVegan, isVegetarian } = useProductSettings();

  const handleDelete = (productName: string) => {
    if (!deletedProducts.includes(productName)) {
      updateDeletedProducts([...deletedProducts, productName]);
    }
  };

  const filteredProducts = categoryName
    ? filterProductsByNutrients(categoryName, deletedProducts, { isVegan, isVegetarian })
    : filterAllProducts(deletedProducts, { isVegan, isVegetarian });

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}
      >
        <MoveLeft size={30} color="black" />
        <Text style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: '600', marginLeft: 12, flex: 1 }}>
          {displayCategoryName} products
        </Text>
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', marginTop: 24, gap: 12 }}>
          {filteredProducts.map((product) => {
            return (
              <View key={product.name} style={{ width: '31%', alignItems: 'center', position: 'relative', marginBottom: 16 }}>
                <TouchableOpacity
                  onPress={() => handleDelete(product.name)}
                  disabled={deletedProducts.includes(product.name)}
                  style={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    zIndex: 1,
                    borderRadius: 100,
                    padding: 6,
                    paddingHorizontal: 10,
                    backgroundColor: deletedProducts.includes(product.name) 
                      ? 'rgba(128, 128, 128, 0.8)' 
                      : 'rgba(0, 0, 0, 0.8)',
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 0,
    backgroundColor: 'white',
    position: 'relative',
  },
});
