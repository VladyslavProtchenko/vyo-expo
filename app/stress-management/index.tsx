import VideoCard from '@/components/ui/VideoCard';
import { typography } from '@/constants/typography';
import { useRouter } from 'expo-router';
import { MoveLeft } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StressManagement() {
  const router = useRouter();
  const [level, setLevel] = useState<'nevbie' | 'medium' | 'advanced'>('nevbie');

  const items = [
    { title: 'Pilates', count: 13 },
    { title: 'Yoga', count: 13 },
    { title: 'Fitness at home', count: 13 },
    { title: 'Pelvic excersises', count: 13 },
    { title: 'Pain relief', count: 13 },
    { title: 'Posture workouts', count: 13 },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}
      >
        <MoveLeft size={30} color="black" />
        <Text style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: '600', marginLeft: 12 }}>
          Stress Management
        </Text>
      </TouchableOpacity>
      <View style={styles.tagsContainer}>
        {['nevbie', 'medium', 'advanced'].map((item) => {
          const isActive = level === item;
          return (
            <TouchableOpacity key={item} onPress={() => setLevel(item as 'nevbie' | 'medium' | 'advanced')}>
              <Text
                style={[
                  typography.p,
                  styles.tag,
                  isActive ? styles.tagActive : styles.tagInactive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 16 }}>
          {items.map((item, index) => (
            <VideoCard
              key={index}
              videoUrl="https://www.w3schools.com/html/mov_bbb.mp4"
              title={item.title}
              style={{
                width: '45%',
                height: 150,
                marginRight: index < 12 ? 12 : 0,
              }}
            />
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
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 24,
    borderColor: '#E7E8ED',
  },
  tagActive: {
    backgroundColor: '#FEF08A',
  },
  tagInactive: {
    backgroundColor: 'transparent',
  },
});
