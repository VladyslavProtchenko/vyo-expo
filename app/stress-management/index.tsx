import SkipPoster from '@/app/phase/components/SkipPoster';
import StressManagementList from '@/app/stress-management/components/StressManagementList';
import { stressArticles } from '@/constants/stressArticles';
import { typography } from '@/constants/typography';
import useUserStore from '@/store/useUserStore';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { MoveLeft } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';

type Tag = 'All' | 'Breathing' | 'Forest bathing' | 'Cute therapy' | 'PMR' | 'Singing';
const tags: Tag[] = ['All', 'Breathing', 'Forest bathing', 'Cute therapy', 'PMR', 'Singing'];

export default function StressManagement() {
  const router = useRouter();
  const [activeTag, setActiveTag] = useState<Tag>('All');
  const { isQuizSkipped } = useUserStore();

  const filtered = activeTag === 'All'
    ? stressArticles
    : stressArticles.filter((a) => a.tag === activeTag);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <TouchableOpacity onPress={() => router.back()} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
        <MoveLeft size={30} color="black" />
        <Text style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: '600', marginLeft: 12 }}>
          Stress Management
        </Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[1]}>
        {/* Tips list — scrolls away */}
        <View>
          {isQuizSkipped ? <SkipPoster /> : <StressManagementList />}
        </View>

        {/* Tags — sticks to top */}
        <View style={styles.tagsWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {tags.map((tag) => (
              <TouchableOpacity key={tag} onPress={() => setActiveTag(tag)} style={{ marginRight: 8 }}>
                <Text style={[typography.p, styles.tag, activeTag === tag ? styles.tagActive : styles.tagInactive]}>
                  {tag}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Grid */}
        <View style={styles.grid}>
          {filtered.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => router.push({ pathname: '/article-screen', params: { id: item.id } } as any)}
              activeOpacity={0.9}
            >
              <Image source={{ uri: item.image }} style={styles.cardImage} contentFit="cover" />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.65)']}
                style={StyleSheet.absoluteFill}
              />
              <View style={styles.cardOverlay}>
                <Text style={styles.cardTitle} numberOfLines={2}>{item.cardTitle ?? item.title}</Text>
                <Text style={styles.cardSub}>
                  {item.time ? `${item.time} min` : (item.cardSubtitle ?? item.subtitle)}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    gap: 16,
  },
  tagsWrapper: {
    backgroundColor: 'white',
    paddingVertical: 8,
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    width: '47%',
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  cardTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: 'white',
    lineHeight: 18,
  },
  cardSub: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: 'white',
    marginTop: 2,
  },
});
