import { useRouter } from 'expo-router';
import { MoveLeft, RotateCcw } from 'lucide-react-native';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ButtonGradient from '@/components/ui/ButtonGradient';
import { Products } from '@/store/products';

export default function ProductsDeleted() {
  const router = useRouter();
  
  // Получаем все продукты из захардкоженного массива
  const allProducts = Products.map((p) => p.name);

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
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 24 }}>
          {allProducts.map((productName) => {
            const product = Products.find((p) => p.name === productName);
            if (!product) return null;

            return (
              <View key={productName} style={{ width: 100, alignItems: 'center', position: 'relative', marginBottom: 16 }}>
                <TouchableOpacity
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
                      {productName.charAt(0)}
                    </Text>
                  </View>
                )}
                <Text style={{ textAlign: 'center', fontSize: 12, fontFamily: 'Poppins', color: '#404040' }}>
                  {productName}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View style={{ position: 'absolute', bottom: 35, left: 0, right: 0, alignItems: 'center', paddingHorizontal: 16 }}>
        <ButtonGradient title="save" className={{ width: '100%' }} onPress={() => router.back()} />
      </View>
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
