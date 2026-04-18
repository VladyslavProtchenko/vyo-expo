import ArticleVideoCard from '@/app/body-care-article/components/ArticleVideoCard';
import ForestCard from '@/app/article-screen/components/ForestCard';
import { text } from '@/constants/styles';
import { AppColors } from '@/constants/theme';
import { stressArticles } from '@/constants/stressArticles';
import { forestSessions } from '@/constants/forestSessions';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronDown, ChevronUp, X } from 'lucide-react-native';
import { useState } from 'react';
import {
  FlatList,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ArticleScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [refsOpen, setRefsOpen] = useState(false);

  const article = stressArticles.find((a) => a.id === Number(id));

  if (!article) return null;

  const fullTitle = article.subtitle
    ? `${article.title} \u2013 ${article.subtitle}`
    : article.title;

  const hasTechBlock = article.technique || article.duration || article.goal;

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={article.isForest ? styles.scrollForest : styles.scroll}>
        {/* Forest hero image */}
        {article.isForest && article.forestImage ? (
          <View style={styles.heroWrapper}>
            <Image source={{ uri: article.forestImage }} style={styles.heroImage} resizeMode="cover" />
            <TouchableOpacity style={styles.closeBtnHero} onPress={() => router.back()}>
              <X size={20} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          /* Close */
          <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
            <X size={20} color="#292929" />
          </TouchableOpacity>
        )}

        {/* Title */}
        <Text style={[text.title28, styles.title]}>{fullTitle}</Text>

        {/* Author */}
        {article.author ? (
          <View style={styles.authorRow}>
            <Image source={{ uri: article.author.image }} style={styles.authorAvatar} />
            <View style={styles.authorInfo}>
              <Text style={styles.label}>Author</Text>
              <Text style={styles.authorName}>{article.author.name}</Text>
              <Text style={styles.authorTitle}>{article.author.title}</Text>
            </View>
          </View>
        ) : null}

        {/* Forest cards */}
        {article.isForest ? (
          <FlatList
            data={forestSessions}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <ForestCard session={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
            style={styles.forestList}
          />
        ) : null}

        {/* Video */}
        {article.videoUrl ? <ArticleVideoCard videoId={article.videoUrl} /> : null}

        {/* Key takeaways */}
        {article.keyTakeways ? (
          <View style={styles.takeawaysBlock}>
            <Text style={styles.takeawaysTitle}>Key takeaways</Text>
            <Text style={text.text}>{article.keyTakeways}</Text>
          </View>
        ) : null}

        {/* Cute therapy: video feed */}
        {article.tag === 'Cute therapy' && article.videos ? (
          <View style={styles.videoList}>
            {article.videos.map((vid) => (
              <ArticleVideoCard key={vid} videoId={vid} />
            ))}
          </View>
        ) : (
          <>
            {/* Technique / Duration / Goal */}
            {hasTechBlock ? (
              <View style={styles.techBlock}>
                {article.technique ? (
                  <Text style={text.text}>
                    <Text style={[text.title16, styles.noMargin]}>Technique: </Text>
                    {article.technique}
                  </Text>
                ) : null}
                {article.duration ? (
                  <Text style={text.text}>
                    <Text style={[text.title16, styles.noMargin]}>Duration: </Text>
                    {article.duration}
                  </Text>
                ) : null}
                {article.goal ? (
                  <Text style={text.text}>
                    <Text style={[text.title16, styles.noMargin]}>Goal: </Text>
                    {article.goal}
                  </Text>
                ) : null}
              </View>
            ) : null}

            {/* How to do it */}
            {article.howToDo && article.howToDo.length > 0 ? (
              <View style={styles.section}>
                <Text style={[text.title16, styles.sectionTitle]}>How to do it:</Text>
                {article.howToDo.map((step, i) => (
                  <Text key={i} style={text.text}>
                    {i + 1}. {step}
                  </Text>
                ))}
              </View>
            ) : null}

            {/* Why it works */}
            {article.howItWorks ? (
              <View style={styles.section}>
                <Text style={[text.title16, styles.sectionTitle]}>Why it works:</Text>
                <Text style={text.text}>{article.howItWorks}</Text>
              </View>
            ) : null}

            {/* Science */}
            {article.science ? (
              <View style={styles.section}>
                <Text style={[text.title16, styles.sectionTitle]}>Science:</Text>
                <Text style={text.text}>{article.science}</Text>
              </View>
            ) : null}
          </>
        )}

        {/* References */}
        {article.references.length > 0 ? (
          <View style={styles.section}>
            <TouchableOpacity style={styles.refsHeader} onPress={() => setRefsOpen((v) => !v)}>
              <Text style={text.title16}>References</Text>
              {refsOpen ? <ChevronUp size={20} color="#292929" /> : <ChevronDown size={20} color="#292929" />}
            </TouchableOpacity>
            {refsOpen &&
              article.references.map((ref, i) => (
                <Text key={i} style={styles.reference}>
                  {i + 1}. {ref.text}
                  {ref.url ? (
                    <Text style={styles.refLink} onPress={() => Linking.openURL(ref.url!)}>
                      {' '}Link.
                    </Text>
                  ) : null}
                </Text>
              ))}
          </View>
        ) : null}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scroll: {
    paddingHorizontal: 16,
    paddingVertical: 50,
  },
  scrollForest: {
    paddingHorizontal: 16,
    paddingBottom: 50,
  },
  heroWrapper: {
    marginHorizontal: -16,
    marginBottom: 24,
  },
  heroImage: {
    width: '100%',
    height: 300,
    borderBottomLeftRadius: 100,
  },
  closeBtnHero: {
    position: 'absolute',
    top: 48,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtn: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  title: {
    color: '#292929',
    marginBottom: 24,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  authorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  authorInfo: {
    gap: 4,
    flex: 1,
  },
  label: {
    fontFamily: 'Poppins',
    fontSize: 12,
    lineHeight: 12 * 1.2,
    color: AppColors.gray,
  },
  authorName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    lineHeight: 12,
    color: '#292929',
  },
  authorTitle: {
    fontFamily: 'Poppins',
    fontSize: 12,
    lineHeight: 12 * 1.2,
    color: '#262222',
  },
  takeawaysBlock: {
    backgroundColor: '#D6F5E6',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    gap: 8,
  },
  takeawaysTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#292929',
    marginBottom: 4,
  },
  techBlock: {
    backgroundColor: '#FFF7E6',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    gap: 4,
  },
  bold: {
    fontFamily: 'Poppins-SemiBold',
  },
  noMargin: {
    marginBottom: 0,
  },
  forestList: {
    marginBottom: 24,
  },
  videoList: {
    gap: 0,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 4,
  },
  refsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reference: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#292929',
    lineHeight: 22,
    marginTop: 4,
  },
  refLink: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
});
