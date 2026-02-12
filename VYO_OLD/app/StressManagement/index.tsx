import { MoveLeft } from 'lucide-react-native'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import VideoCard from '../_components/ui/VideoCard'
import { BUCKET_URL } from '../../Constants'
import { typography } from '../../styles/globalStyles'
import { useState } from 'react'
import { Props } from '../_types/props'

export default function StressManagement({ navigation }: Props<'StressManagement'>) {
  const [level, setLevel] = useState<'nevbie' | 'medium' | 'advanced'>('nevbie')
  const items = [
    {title:'Pilates', count: 13, image: `${BUCKET_URL}images/app/category-1.webp`},
    {title:'Yoga', count: 13, image: `${BUCKET_URL}images/app/category-2.webp`},
    {title:'Fitness at home', count: 13, image: `${BUCKET_URL}images/app/category-3.webp`},
    {title:'Pelvic excersises', count: 13, image: `${BUCKET_URL}images/app/category-4.webp`},
    {title:'Pain relief', count: 13, image: `${BUCKET_URL}images/app/category-5.webp`},
    {title:'Posture workouts', count: 13, image: `${BUCKET_URL}images/app/category-6.webp`},
  ]
  
  return (
    <SafeAreaView style={styles.container}> 

      <TouchableOpacity onPress={() => navigation.goBack()} style={{flexDirection: 'row', alignItems: 'center', marginBottom: 4}}>
        <MoveLeft size={30} color="black" />
        <Text style={{fontFamily: 'Poppins', fontSize: 16, fontWeight: '600', marginLeft: 12}}>Stress Management</Text>
      </TouchableOpacity>
      <View style={styles.tagsContainer}>
        {['nevbie', 'medium', 'advanced'].map(item => {
          const isActive = level === item;
          return (
            <TouchableOpacity key={item} onPress={() => setLevel(item as 'nevbie' | 'medium' | 'advanced')}>
              <Text
                style={[
                  typography.p,
                  styles.tag,
                  isActive ? styles.tagActive : styles.tagInactive
                ]}
              >{item}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
      
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 16}}>
          {items.map((item, index) => (
            <VideoCard
              key={index}
              videoUrl="https://www.w3schools.com/html/mov_bbb.mp4"
              title={item.title}
              style={{
                width: "45%",
                height: 150,
                marginRight: index < 12 ? 12 : 0,
                }}
              />
            ))}
          </View>
        </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10, // gap-2.5
  },
  tag: {
    paddingHorizontal: 16, // px-4
    paddingVertical: 10, // py-2.5
    borderWidth: 1,
    borderRadius: 24, // rounded-full
    borderColor: '#E7E8ED', // border-gray-400
  },
  tagActive: {
    backgroundColor: '#FEF08A', // bg-yellow-200
  },
  tagInactive: {
    backgroundColor: 'transparent',
  },
})