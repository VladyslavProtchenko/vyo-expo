import { MoveLeft, Trash } from 'lucide-react-native'
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import { Props } from '../_types/props'
import { PRODUCTS_IMAGES } from '../_store/products'
import ButtonGradient from '../_components/ui/ButtonGradient'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../_types/types'

export default function ProductsAll({ route }: Props<'ProductsAll'>) {
  const categoryName = route.params?.categoryName || 'Products';
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}> 
      <TouchableOpacity onPress={() => navigation.goBack()} style={{flexDirection: 'row', alignItems: 'center', marginBottom: 4}}>
        <MoveLeft size={30} color="black" />
        <Text style={{fontFamily: 'Poppins', fontSize: 16, fontWeight: '600', marginLeft: 12, flex: 1}}>{categoryName} products</Text>
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop:24}}>
          {allProducts.map((product) => (
            <View key={product} style={{width: 100, alignItems: 'center', position: 'relative'}}>
              <TouchableOpacity style={{position: 'absolute', top: 4, right: 4, zIndex: 1, borderRadius: 100, padding: 6, paddingHorizontal: 10, backgroundColor: 'rgba(0, 0, 0, 0.8)'}}>
                <Trash size={20} color="white" />
                </TouchableOpacity>
              <Image source={PRODUCTS_IMAGES[product as keyof typeof PRODUCTS_IMAGES]} style={{width: 100, height: 100, borderRadius: 12, backgroundColor: 'white', marginBottom:4}} />
              <Text style={{textAlign: 'center', fontSize: 12, fontFamily: 'Poppins', color: '#404040'}}>{product}</Text>
            </View>
          ))}
        </View>


            
      </ScrollView>
      <View style={{position: 'absolute', bottom: 35, left: 0, right: 0, alignItems: 'center', paddingHorizontal: 16}}>
        <ButtonGradient title="save" className={{width: '100%'}} onPress={() => navigation.goBack()} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 0,
    backgroundColor: 'white',
    position: 'relative'
  },


})

const allProducts = [
  'Acerola cherry',
  'Almonds',
  'Apple with skin',
  'Avocado',
  'Baked salmon',
  'Baked sweet potato',
  'Baked trout',
  'Banana',
  'Beef liver',
  'Black currant',
  'Boiled chicken breast',
  'Boiled potato',
  'Brie cheese',
  'Canned sardines',
  'Canned tuna',
  'Canola oil',
  'Cashews',
  'Cheddar cheese',
  'Chia seeds',
  'Chicken egg',
  'Chicken liver',
  'Cooked Atlantic salmon',
  'Cooked Brussels sprouts',
  'Cooked asparagus',
  'Cooked bluefin tuna',
  'Cooked broccoli',
  'Cooked brown rice',
  'Cooked buckwheat',
  'Cooked chickpeas',
  'Cooked green peas',
  'Cooked kidney beans',
  'Cooked lentils',
  'Cooked millet',
  'Cooked mushrooms',
  'Cooked mussels',
  'Cooked oats',
  'Cooked pearl barley',
  'Cooked pork',
  'Cooked spinach',
  'Cooked white beans',
  'Cottage cheese',
  'Dark chocolate (70%)',
  'Dates',
  'Dried apricots',
  'Dried figs',
  'Dry oats',
  'Durum wheat pasta',
  'Flaxseed oil',
  'Flaxseed',
  'Fortified cereal',
  'Fortified nutritional yeast',
  'Fortified plant milk',
  'Fresh parsley',
  'Fresh strawberries',
  'Grapefruit',
  'Ground flaxseed',
  'Hazelnuts',
  'Kiwifruit',
  'Orange',
  'Pacific herring, cooked',
  'Peanuts',
  'Pear with skin',
  'Pistachios',
  'Plain yogurt',
  'Prunes',
  'Pumpkin seeds',
  'Raisins',
  'Raspberries',
  'Raw Atlantic mackerel',
  'Raw cabbage',
  'Raw carrot',
  'Raw spinach',
  'Red bell pepper, raw',
  'Roast turkey',
  'Rose hips, raw',
  'Salmon fish oil',
  'Sesame seeds',
  'Soybean oil',
  'Stewed beef',
  'Sunflower seeds',
  'Tangerine',
  'Tofu',
  'Tomato juice',
  'Tomato',
  'Walnuts',
  'White cabbage',
  'Whole grain bread',
  'Whole milk',
]



