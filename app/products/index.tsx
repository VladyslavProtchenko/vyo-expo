import { useRouter } from 'expo-router';
import { MoveLeft, Settings2, ShoppingCart } from 'lucide-react-native';
import { Image } from 'expo-image';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CarePlanList from '@/app/(tabs)/components/List';
import SkipPoster from '@/app/phase/components/SkipPoster';
import FocusOnCard from '@/app/products/components/FocusOnCard';
import References from '@/app/products/components/References';
import B from '@/components/B';
import ButtonGradient from '@/components/ui/ButtonGradient';
import ButtonRounded from '@/components/ui/ButtonRounded';
import { useProductVariants } from '@/hooks/useProductVariants';
import { useShoppingListStore } from '@/store/shoppingList';
import useUserStore from '@/store/useUserStore';

export default function Products() {
  const router = useRouter();
  const { products, isLoading, refresh } = useProductVariants();
  const setProducts = useShoppingListStore((s) => s.setProducts);
  const { isQuizSkipped } = useUserStore();

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/home' as any)}>
          <MoveLeft size={30} color="black" />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <TouchableOpacity onPress={() => router.push('/shopping-list')} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <ShoppingCart size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/products/settings' as any)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Settings2 size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{ fontFamily: 'ArchivoBlack-Regular', fontSize: 24, fontWeight: '600', marginBottom: 8, marginTop: 16 }}>
          Nutrients focus for today
        </Text>

        <FocusOnCard />

        {isQuizSkipped ? <SkipPoster /> : <CarePlanList isGray={true} />}

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
          <Text style={{ marginBottom: 4, fontFamily: 'Poppins', fontSize: 16, fontWeight: '600' }}>Today's list</Text>
          <Text style={{ marginBottom: 12, fontFamily: 'Poppins', fontSize: 14 }}>
            Adding these products to your shopping list helps you stay on track with nutrients during this phase.
          </Text>
          {products.map((product, index) => (
            <View key={`${product.name}-${index}`} style={{ alignItems: 'center', gap: 8, width: 100 }}>
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
          <ButtonGradient
            title="Add to shopping list"
            onPress={() => {
              setProducts('products', products.map((p) => p.name));
              router.push('/shopping-list/add');
            }}
            className={{ width: '100%' }}
          />
          <ButtonRounded
            title={isLoading ? 'Generating...' : 'Generate new'}
            onPress={refresh}
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
        <Text style={{ fontFamily: 'Poppins', fontSize: 18, fontWeight: '600', marginBottom: 8 }}>Recommended supplements</Text>
        <Text style={{ marginBottom: 16 }}>Use them if you couldn't fully rely on food today.</Text>

        <View style={{ padding: 16, borderRadius: 24, backgroundColor: '#F5F5F5', gap: 8, marginBottom: 24 }}>
          {supplements.map((supplement) => (
            <View key={supplement.title} style={{ flexDirection: 'row', width: '100%', gap: 8 }}>
              <Image source={require('@/assets/images/pill.webp')} style={{ width: 50, height: 50, borderRadius: 12 }} />
              <View style={{ flex: 1, gap: 4, justifyContent: 'center' }}>
                <Text>
                  <B>{supplement.title}</B>
                </Text>
                <Text style={styles.supplementDescription}>{supplement.description}</Text>
              </View>
              <Text>{supplement.dosage}</Text>
            </View>
          ))}
        </View>
        <Text>Food examples are for illustrative purposes only. Actual nutrient levels can vary based on food origin, freshness, and cooking methods (e.g., boiling or frying may reduce vitamin content). Aim for a diverse diet to ensure optimal intake</Text>
        <Text
          style={{ marginBottom: 16, textDecorationLine: 'underline', color: 'blue' }}
          onPress={() => Linking.openURL('https://ods.od.nih.gov/factsheets/list-all/')}
        >
          Learn more
        </Text>

        <References />

        <View style={styles.disclaimerBox}>
          <Text style={styles.disclaimerText}>
            This app is not a medical device and does not provide diagnoses. These recommendations are based on published research and general wellness practices. Always consult your healthcare provider before starting new supplements or making significant lifestyle changes.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const stats = [
  { title: '<4', description: 'No worries! Supplements help fill the gaps.', color: '#C9DA5D' },
  { title: '5-7', description: 'On good track! Supplements can still support balance', color: '#99DA5D' },
  { title: '>7', description: 'Well-done! You\'re likely covered for today', color: '#5DDA9D' },
];

const supplements = [
  { title: 'Iron', description: '~150g of beef steak + 1 cup of boiled white beans + a large serving of spinach', dosage: '18 mg' },
  { title: 'Magnesium', description: '~2 slices of whole-grain bread + 1/2 cup of pumpkin seeds', dosage: '310 mg' },
  { title: 'Vitamin B1 (Thiamine)', description: '~1/2 cup of sunflower seeds or a serving of green peas', dosage: '1,1 mg' },
  { title: 'Vitamin B2 (Riboflavin)', description: '~200g of grilled mushrooms + 150g of cooked spinach', dosage: '1,1 mg' },
  { title: 'Vitamin B6 (Pyridoxine)', description: '~1 medium banana + 150g of roasted chicken breast', dosage: '1,3 mg' },
  { title: 'Vitamin B9 (Folic acid)', description: '~1 cup of cooked asparagus and a portion of spinach', dosage: '400 mcg DFE' },

  { title: 'Vitamin B12 (Cobalamin)', description: '~1 salmon fillet or 2 large eggs', dosage: '2,4 mcg' },
  { title: 'Omega-3 (EPA/DHA)', description: '~30g of walnuts or a small piece of mackerel', dosage: '500 mg' },

  { title: 'Potassium', description: '30 min before meal', dosage: '200mg' },
  { title: 'B vitamins', description: '30 min before meal', dosage: '10mg' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  supplementDescription: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    lineHeight: 12 * 1.4,
    color: '#676767',
  },
  disclaimerBox: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    marginBottom: 24,
  },
  disclaimerText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    lineHeight: 18,
    color: '#404040',
  },
});
