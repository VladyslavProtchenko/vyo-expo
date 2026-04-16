import Recommendations from '@/app/body-care/components/Recommendations';
import SkipPoster from '@/app/phase/components/SkipPoster';
import useUserStore from '@/store/useUserStore';
import { useRouter } from 'expo-router';
import { ChevronRight, MoveLeft } from 'lucide-react-native';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BodyCare() {
  const router = useRouter();
  const { isQuizSkipped } = useUserStore();

  const categories = [
    { title: 'Pilates', count: 13, image: require('@/assets/images/body-care/category-1.webp') },
    { title: 'Yoga', count: 13, image: require('@/assets/images/body-care/category-2.webp') },
    { title: 'Fitness at home', count: 13, image: require('@/assets/images/body-care/category-3.webp') },
    { title: 'Pelvic excersises', count: 13, image: require('@/assets/images/body-care/category-4.webp') },
    { title: 'Pain relief', count: 13, image: require('@/assets/images/body-care/category-5.webp') },
    { title: 'Posture workouts', count: 13, image: require('@/assets/images/body-care/category-6.webp') },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}
      >
        <MoveLeft size={30} color="black" />
        <Text style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: '600', marginLeft: 12 }}>Body care</Text>
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        {isQuizSkipped ? <SkipPoster /> : <Recommendations />}
        <Text style={{ fontFamily: 'ArchivoBlack-Regular', fontSize: 16, marginBottom: 12, marginTop: 24 }}>All categories</Text>

        <View>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={category.title}
              onPress={() => router.push({ pathname: '/category-page', params: { categoryName: category.title } } as any)}
              style={{
                padding: 16,
                alignItems: 'center',
                backgroundColor: '#F5F5F5',
                borderRadius: 24,
                flexDirection: 'row',
                marginBottom: index < categories.length - 1 ? 12 : 0,
              }}
            >
              <View style={{ height: 50, width: 50, borderRadius: 8, marginRight: 8, overflow: 'hidden' }}>
                <Image source={category.image} style={{ height: 50, width: 50 }} resizeMode="cover" />
              </View>
              <View>
                <Text style={{ fontFamily: 'ArchivoBlack-Regular', fontSize: 16, fontWeight: '600' }}>{category.title}</Text>
                <Text style={{ fontFamily: 'Poppins', fontSize: 12, fontWeight: '400' }}>{category.count} workouts</Text>
              </View>
              <ChevronRight size={24} color="black" style={{ marginLeft: 'auto' }} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
});
