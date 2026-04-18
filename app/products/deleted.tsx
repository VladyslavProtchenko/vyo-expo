import { useRouter } from 'expo-router';
import { MoveLeft, RotateCcw } from 'lucide-react-native';
import { Image } from 'expo-image';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useDeletedProducts } from '@/hooks/useDeletedProducts';
import { Products } from '@/store/products';

export default function ProductsDeleted() {
  const router = useRouter();
  const { deletedProducts, isLoading, updateDeletedProducts, isUpdating } = useDeletedProducts();
  
  const deletedProductsList = Products.filter((product) => 
    deletedProducts.includes(product.name)
  );

  const handleRestore = (productName: string) => {
    const updatedList = deletedProducts.filter((name) => name !== productName);
    updateDeletedProducts(updatedList);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}
      >
        <MoveLeft size={30} color="black" />
        <Text style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: '600', marginLeft: 12, flex: 1 }}>
          Deleted items
        </Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 24, fontFamily: 'Poppins', fontSize: 14, color: '#404040' }}>
        Restore earlier deleted products and they appear in your daily recommendation sets.
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : deletedProductsList.length === 0 ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
            <Text style={{ fontFamily: 'Poppins', fontSize: 16, color: '#404040' }}>
              No deleted products
            </Text>
          </View>
        ) : (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', marginTop: 24, gap: 12 }}>
            {deletedProductsList.map((product) => {
              return (
                <View key={product.name} style={{ width: '31%', alignItems: 'center', position: 'relative', marginBottom: 16 }}>
                  <TouchableOpacity
                    onPress={() => handleRestore(product.name)}
                    disabled={isUpdating}
                    style={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      zIndex: 1,
                      borderRadius: 100,
                      padding: 6,
                      paddingHorizontal: 10,
                      backgroundColor: 'rgba(34, 171, 139, 0.8)',
                    }}
                  >
                    <RotateCcw size={20} color="white" />
                  </TouchableOpacity>
                  {product.imageUrl ? (
                    <Image
                      source={{ uri: product.imageUrl ?? undefined }}
                      style={{ width: 100, height: 100, borderRadius: 12, backgroundColor: 'white', marginBottom: 4 }}
                      contentFit="cover"
                      transition={200}
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
        )}
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
