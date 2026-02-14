import { useRouter } from 'expo-router';
import { MoveLeft, Settings2 } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import B from '@/components/B';
import CarePlanList from '@/components/care-plan/List';
import FocusOnCard from '@/components/products/FocusOnCard';
import ButtonGradient from '@/components/ui/ButtonGradient';
import ButtonRounded from '@/components/ui/ButtonRounded';
import { CurrentPhaseInfo } from '@/store/phase';
import { Products as AllProducts, Product } from '@/store/products';
import { generateProductVariants } from '@/utils/openai';

export default function Products() {
  const router = useRouter();

  const getRandomProducts = (): Product[] => {
    const shuffled = [...AllProducts].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 9);
  };

  const findProductsByNames = (names: string[]): Product[] => {
    return names
      .map((name) => {
        const normalized = name.toLowerCase().trim();
        
        // Приоритет 1: Точное совпадение
        let product = AllProducts.find((p) => p.name.toLowerCase() === normalized);
        if (product) return product;
        
        // Приоритет 2: Название продукта начинается с искомого слова
        // Например: "apple" -> "Apple with skin"
        product = AllProducts.find((p) => {
          const productName = p.name.toLowerCase();
          return productName.startsWith(normalized + ' ') || productName === normalized;
        });
        if (product) return product;
        
        // Приоритет 3: Искомое слово начинается с названия продукта
        // Например: "Fresh strawberries" -> "Strawberries" (если бы было просто "Strawberries")
        product = AllProducts.find((p) => {
          const productName = p.name.toLowerCase();
          return normalized.startsWith(productName + ' ') || normalized === productName;
        });
        if (product) return product;
        
        // Приоритет 4: Название продукта содержит искомое слово (как отдельное слово)
        // Например: "strawberries" -> "Fresh strawberries"
        const normalizedWords = normalized.split(' ');
        product = AllProducts.find((p) => {
          const productName = p.name.toLowerCase();
          const productWords = productName.split(' ');
          // Проверяем, что все слова из запроса есть в названии продукта
          return normalizedWords.every((word) => productWords.includes(word));
        });
        if (product) return product;
        
        // Приоритет 5: Простое включение (последний вариант)
        product = AllProducts.find((p) => {
          const productName = p.name.toLowerCase();
          return productName.includes(normalized) || normalized.includes(productName);
        });
        
        return product;
      })
      .filter((p): p is Product => p !== undefined);
  };

  const [selectedProducts, setSelectedProducts] = useState<Product[]>(() => getRandomProducts());
  const [loading, setLoading] = useState(false);
  const [previousLists, setPreviousList] = useState<Record<number, string[]>>({});

  const loadProducts = async () => {
    try {
      setLoading(true);
      const currentPhase = CurrentPhaseInfo().phaseName;
      console.log('🔵 Generating products for phase:', currentPhase);

      const productNames = await generateProductVariants(currentPhase, previousLists);
      console.log('✅ Received product names:', JSON.stringify(productNames, null, 2));

      if (productNames && productNames.length === 9) {
        const foundProducts = findProductsByNames(productNames);
        console.log('✅ Found products:', foundProducts.length);
        
        // Логируем какие продукты не найдены
        const missingProducts = productNames.filter((name) => {
          const normalized = name.toLowerCase().trim();
          return !AllProducts.some((p) => {
            const productName = p.name.toLowerCase();
            return productName === normalized || productName.includes(normalized) || normalized.includes(productName);
          });
        });
        if (missingProducts.length > 0) {
          console.warn('⚠️ Missing products:', missingProducts);
        }

        if (foundProducts.length > 0) {
          setSelectedProducts(foundProducts);

          const listNumber = Object.keys(previousLists).length + 1;
          setPreviousList((prev) => ({
            ...prev,
            [listNumber]: productNames,
          }));
          console.log(`📝 Saved list #${listNumber} to history`);
        } else {
          console.warn('⚠️ No products found, using random');
          setSelectedProducts(getRandomProducts());
        }
      }
    } catch (err: any) {
      console.error('❌ Error:', err.message);
      setSelectedProducts(getRandomProducts());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleGenerateNew = () => {
    loadProducts();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}
      >
        <MoveLeft size={30} color="black" />
        <TouchableOpacity onPress={() => router.push('/products/settings' as any)}>
          <Settings2 size={24} color="black" />
        </TouchableOpacity>
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{ fontFamily: 'ArchivoBlack-Regular', fontSize: 24, fontWeight: '600', marginBottom: 8, marginTop: 16 }}>
          Nutrients focus for today
        </Text>

        <FocusOnCard />

        <CarePlanList isGray={true} />

        <View
          style={{
            padding: 16,
            borderRadius: 24,
            backgroundColor: '#F5F5F5',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
            justifyContent: 'space-between',
            marginVertical: 16,
          }}
        >
          <Text style={{ marginBottom: 4, fontFamily: 'Poppins', fontSize: 16, fontWeight: '600' }}>Todays list</Text>
          <Text style={{ marginBottom: 12, fontFamily: 'Poppins', fontSize: 14 }}>
            Adding these products to your shopping list helps you stay on track with nutrients during this phase.
          </Text>
          {selectedProducts.map((product, index) => (
            <View key={`${product.name}-${index}`} style={{ alignItems: 'center', gap: 8, width: 100 }}>
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
              <Text style={{ fontSize: 12, textAlign: 'center' }}>{product.name}</Text>
            </View>
          ))}
        </View>

        <View style={{ padding: 16, borderRadius: 24, backgroundColor: '#F5F5F5', gap: 8 }}>
          <Text>🌿 Superfood of the week</Text>
          <Text>
            <B>Sauerkraut</B> supports the gut barrier and gently modulate estrogen.
          </Text>
        </View>

        <View style={{ width: '100%', marginTop: 16, gap: 8, marginBottom: 24 }}>
          <ButtonGradient title="Add to shopping list" onPress={() => {}} className={{ width: '100%' }} />
          <ButtonRounded
            title={loading ? 'Generating...' : 'Generate new'}
            onPress={handleGenerateNew}
            className={{ width: '100%' }}
          />
        </View>

        <Text style={{ fontFamily: 'Poppins', fontSize: 18, fontWeight: '600', marginBottom: 8 }}>If your food intake varies</Text>
        <Text style={{ fontFamily: 'Poppins', fontSize: 12 }}>
          No tracking required — use this as a flexible guideline based on how many recommended products you eat.
        </Text>

        <View style={{ gap: 8, marginBottom: 16, marginTop: 12, flexDirection: 'row', justifyContent: 'space-between' }}>
          {stats.map((stat) => (
            <View key={stat.title} style={{ padding: 12, borderRadius: 24, backgroundColor: stat.color, flex: 1 }}>
              <Text style={{ marginBottom: 12, fontFamily: 'Poppins', fontSize: 24, fontWeight: '600' }}>{stat.title}</Text>
              <Text style={{ fontFamily: 'Poppins', fontSize: 12 }}>{stat.description}</Text>
            </View>
          ))}
        </View>
        <Text style={{ fontFamily: 'Poppins', fontSize: 18, fontWeight: '600', marginBottom: 8 }}>Recommended supplementss</Text>
        <Text style={{ marginBottom: 16 }}>Use them if you couldn't fully rely on food today.</Text>

        <View style={{ padding: 16, borderRadius: 24, backgroundColor: '#F5F5F5', gap: 8, marginBottom: 24 }}>
          {supplements.map((supplement) => (
            <View key={supplement.title} style={{ flexDirection: 'row', width: '100%', gap: 8 }}>
              <Image source={require('@/assets/images/pill.webp')} style={{ width: 50, height: 50, borderRadius: 12 }} />
              <View style={{ flex: 1, gap: 4, justifyContent: 'center' }}>
                <Text>
                  <B>{supplement.title}</B>
                </Text>
                <Text>{supplement.description}</Text>
              </View>
              <Text>{supplement.dosage}</Text>
            </View>
          ))}
        </View>
        <Text style={{ marginBottom: 16 }}>Dosages are based on evidence-based protocols. Learn more</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const stats = [
  { title: '<4', description: 'No worries! Supplements help fill the gaps.', color: '#C9DA5D' },
  { title: '5-7', description: 'On good track! Supplements can still support balance', color: '#99DA5D' },
  { title: '>7', description: 'Well-done!You\'re likely covered for today', color: '#5DDA9D' },
];

const supplements = [
  { title: 'Iron', description: 'Breakfast with meal, add vit C', dosage: '15 mg ' },
  { title: 'Omega-3', description: 'Breakfast with meal', dosage: '10mg' },
  { title: 'Potassium', description: '30 min before meal', dosage: '200mg' },
  { title: 'B vitamins', description: '30 min before meal', dosage: '10mg' },
  { title: 'Magnesium', description: '30 min before sleep', dosage: '30mg' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
});
