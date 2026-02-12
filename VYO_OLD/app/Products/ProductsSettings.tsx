import { MoveLeft, Trash } from 'lucide-react-native'
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PRODUCTS_IMAGES } from '../_store/products'
import ButtonRounded from '../_components/ui/ButtonRounded'
import { useState } from 'react'
import CustomSwitch from '../_components/ui/CustomSwitch'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../_types/types'
import FocusOnCard from './components/focunOnCard'

export default function ProductsSettings() {
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView style={styles.container}> 
        <TouchableOpacity onPress={() => navigation.goBack()} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <MoveLeft size={30} color="black" />
          <ButtonRounded type='black' className={{ width:70, minHeight: 34 }} title="Save" onPress={() => navigation.goBack()} />
        </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={{ backgroundColor: '#F5F3F3', borderRadius: 12, justifyContent: 'center', padding:16, marginTop:16}} >
          <Text style={{fontFamily: 'ArchivoBlack-Regular ', fontSize: 24, marginBottom: 8, fontWeight: '800'}}>Customize your products</Text>
          <Text style={{marginBottom: 12, fontFamily: 'Poppins', fontSize: 14}}>
          Remove products you don’t like to personalize your plan. We’ll ask you to review this each phase in your first cycle. You can edit the list in Settings.
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical:4, marginBottom: 2 }}>
            <Text style={{fontFamily: 'Poppins', fontSize: 16, fontWeight: '600'}}>I am vegetarian</Text>
            <CustomSwitch value={isVegetarian} onValueChange={setIsVegetarian} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',  paddingVertical:4  }}>
            <Text style={{fontFamily: 'Poppins', fontSize: 16, fontWeight: '600'}}>I am vegan</Text>
            <CustomSwitch value={isVegan} onValueChange={setIsVegan} />
          </View>

        </View>
        <FocusOnCard />


        <View style={{ marginBottom: 16, gap: 16 }}>
        </View>

        {
          ['Iron', 'Omega-3', 'Potassium', 'B vitamins', 'Magnesium'].map((item, index) => (
            <CategoryList key={item} title={item} index={index*10} navigation={navigation} />
          ))
        }

        <View style={{ padding:16, borderRadius:24, backgroundColor: '#F5F5F5',  gap: 8, marginBottom: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{fontWeight: 500}}>Changed your mind?</Text>
            <Text style={{fontSize: 12}}>Restore deleted products.</Text>
          </View>
          <ButtonRounded title="See deleted" onPress={() => navigation.navigate('ProductsDeleted')} className={{ width: 'auto', minHeight: 34, backgroundColor: 'transparent', borderWidth: 1, }} textStyle={{ fontSize: 12 }} />
        </View>
            
      </ScrollView>
    </SafeAreaView>
  )
}

const CategoryList = ({title, index, navigation}: {title: string, index: number, navigation: any}) => {
  return (
    <>
      <Text style={{fontFamily: 'Poppins', fontSize: 18, fontWeight: '600', marginBottom: 8}}>Top {title} products:</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false} 
          style={{marginBottom: 24}}
          contentContainerStyle={{gap:12}}
        >
          {allProducts.slice(index, index + 10).map((product) => (
            <View key={product} style={{width: 100, alignItems: 'center', position: 'relative'}}>
              <TouchableOpacity style={{position: 'absolute', top: 4, right: 4, zIndex: 1, borderRadius: 100, padding: 6, paddingHorizontal: 10, backgroundColor: 'rgba(0, 0, 0, 0.8)'}}>
                <Trash size={20} color="white" />
                </TouchableOpacity>
              <Image source={PRODUCTS_IMAGES[product as keyof typeof PRODUCTS_IMAGES]} style={{width: 100, height: 100, borderRadius: 12, backgroundColor: 'white', marginBottom:4}} />
              <Text style={{textAlign: 'center', fontSize: 12, fontFamily: 'Poppins', color: '#404040'}}>{product}</Text>
            </View>
          ))}
          <TouchableOpacity
            onPress={() => navigation.navigate('ProductsAll', { categoryName: title })}
            style={{width: 100, height: 100, alignItems: 'center', backgroundColor: '#F5F3F3', borderRadius: 12, justifyContent: 'center'}}
          >
            <Text style={{fontSize: 16, fontFamily: 'Poppins', color: '#404040', fontWeight: '600' }}>See all</Text>
          </TouchableOpacity>
        </ScrollView>
    </>
  )
}
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



