import { useRouter } from 'expo-router';
import { MoveLeft, Settings2, ShoppingCart } from 'lucide-react-native';
import { Image } from 'expo-image';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CarePlanList from '@/app/(tabs)/components/List';
import SkipPoster from '@/app/phase/components/SkipPoster';
import FocusOnCard from '@/app/products/components/FocusOnCard';
import B from '@/components/B';
import References from '@/components/ui/References';
import ButtonGradient from '@/components/ui/ButtonGradient';
import ButtonRounded from '@/components/ui/ButtonRounded';
import { NUTRIENT_INFO } from '@/constants/nutrients';
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
            <View key={supplement.id} style={{ flexDirection: 'row', width: '100%', gap: 8 }}>
              <Image source={require('@/assets/images/pill.webp')} style={{ width: 50, height: 50, borderRadius: 12 }} />
              <View style={{ flex: 1, gap: 4, justifyContent: 'center' }}>
                <Text>
                  <B>{supplement.name}</B>
                </Text>
                <Text style={styles.supplementDescription}>{supplement.foodEquivalent}</Text>
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

        <References references={PRODUCT_REFERENCES} titleVariant="large" />

        <View style={styles.disclaimerBox}>
          <Text style={styles.disclaimerText}>
            This app is not a medical device and does not provide diagnoses. These recommendations are based on published research and general wellness practices. Always consult your healthcare provider before starting new supplements or making significant lifestyle changes.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const PRODUCT_REFERENCES = [
  { text: 'Owen P, Heneghan C, Musgrave H, et al. Oxford Handbook of Obstetrics and Gynaecology. 4th ed. Oxford University Press, 2023.' },
  { text: 'Nillni YI, Rasmusson AM, Paul EL, Pineles SL. The impact of the menstrual cycle and underlying hormones in anxiety and PTSD. Curr Psychiatry Rep. 2021;23(2):8.', url: 'https://link.springer.com/article/10.1007/s11920-020-01221-9' },
  { text: 'Bernal A, Paolieri D. The influence of estradiol and progesterone on neurocognition during the menstrual cycle. Behav Brain Res. 2022;417:113593.', url: 'https://www.sciencedirect.com/science/article/pii/S0166432821004812?via%3Dihub' },
  { text: 'Barth C, Villringer A, Sacher J. Sex hormones affect neurotransmitters and shape the adult female brain. Front Neurosci. 2015;9:37.', url: 'https://www.frontiersin.org/journals/neuroscience/articles/10.3389/fnins.2015.00037/full' },
  { text: 'Rogan MM, Black KE. Dietary energy intake across the menstrual cycle: a narrative review. Nutr Rev. 2023;81(7):869-886.', url: 'https://academic.oup.com/nutritionreviews/article/81/7/869/6823870' },
  { text: 'Hirschberg AL. Sex hormones, appetite and eating behaviour in women. Maturitas. 2012;71:248-256.', url: 'https://linkinghub.elsevier.com/retrieve/pii/S0378512211004154' },
  { text: 'Burdge GC, Wootton SA. Conversion of alpha-linolenic acid to eicosapentaenoic, docosapentaenoic and docosahexaenoic acids in young women. Br J Nutr. 2002;88(4):411-420.' },
  { text: 'Dietary Supplement Fact Sheets', url: 'https://ods.od.nih.gov/factsheets/list-all/' },
  { text: 'FDC USA', url: 'https://fdc.nal.usda.gov/' },
];

const stats = [
  { title: '<4', description: 'No worries! Supplements help fill the gaps.', color: '#C9DA5D' },
  { title: '5-7', description: 'On good track! Supplements can still support balance', color: '#99DA5D' },
  { title: '>7', description: 'Well-done! You\'re likely covered for today', color: '#5DDA9D' },
];

const supplements = [
  NUTRIENT_INFO.iron,
  NUTRIENT_INFO.magnesium,
  NUTRIENT_INFO['vitamin-b1'],
  NUTRIENT_INFO['vitamin-b2'],
  NUTRIENT_INFO['vitamin-b6'],
  NUTRIENT_INFO['vitamin-b9'],
  NUTRIENT_INFO['vitamin-b12'],
  NUTRIENT_INFO['omega-3'],
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
