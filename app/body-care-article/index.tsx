import { bodyCareArticles } from '@/constants/bodyCareArticles';
import { text } from '@/constants/styles';
import ArticleAuthor from '@/components/ui/ArticleAuthor';
import ArticleVideoCard from './components/ArticleVideoCard';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { X, ChevronDown, ChevronUp } from 'lucide-react-native';
import { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BodyCareArticle() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [refsOpen, setRefsOpen] = useState(false);

  const article = bodyCareArticles.find((a) => a.id === Number(id));

  if (!article) return null;

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Close button */}
        <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
          <X size={24} color="#292929" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={[text.title28, styles.title]}>{article.title}</Text>

        {/* Author */}
        <ArticleAuthor name={article.author.name} title={article.author.title} image={article.author.image} />

        {/* Video */}
        <ArticleVideoCard videoId={article.videoUrl} />

        {/* Model */}
        {article.model.name ? (
          <View style={styles.modelBlock}>
            <Text style={styles.label}>Model</Text>
            <Text style={styles.authorName}>{article.model.name}</Text>
            <Text style={styles.authorTitle}>{article.model.text}</Text>
          </View>
        ) : null}

        {/* Summary */}
        {article.summary.length > 0 && (
          <View style={styles.summaryBlock}>
            <Text style={styles.summaryTitle}>Summary</Text>
            {article.summary.map((line, i) => (
              <Text key={i} style={text.text}>{line}</Text>
            ))}
          </View>
        )}

        {/* Key insights */}
        {article.keyInsights.length > 0 && (
          <View style={styles.section}>
            <Text style={text.title16}>Key insights:</Text>
            {article.keyInsights.map((item, i) => (
              <Text key={i} style={text.text}>• {item}</Text>
            ))}
          </View>
        )}

        {/* How to practice */}
        {article.howToPractice.length > 0 && (
          <View style={[styles.section, styles.practiceBlock]}>
            <Text style={text.title16}>How to practice:</Text>
            {article.howToPractice.map((item, i) => (
              <Text key={i} style={text.text}>• {item}</Text>
            ))}
            {article.howToPracticeText ? (
              <Text style={[text.text, { marginTop: 8 }]}>{article.howToPracticeText}</Text>
            ) : null}
          </View>
        )}

        {/* Common mistakes */}
        {article.commonMistakes.length > 0 && (
          <View style={styles.section}>
            <Text style={text.title16}>Common mistakes:</Text>
            {article.commonMistakes.map((item, i) => (
              <Text key={i} style={text.text}>• {item}</Text>
            ))}
          </View>
        )}

        {/* References */}
        {article.references.length > 0 && (
          <View style={styles.section}>
            <TouchableOpacity style={styles.refsHeader} onPress={() => setRefsOpen((v) => !v)}>
              <Text style={text.title16}>References</Text>
              {refsOpen ? <ChevronUp size={20} color="#292929" /> : <ChevronDown size={20} color="#292929" />}
            </TouchableOpacity>
            {refsOpen && article.references.map((ref, i) => (
              <Text key={i} style={styles.reference}>{i + 1}. {ref}</Text>
            ))}
          </View>
        )}

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
  closeBtn: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  title: {
    color: '#292929',
    marginBottom: 24,
  },
  videoCard: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoImage: {
    width: '100%',
    height: '100%',
  },
  playBtn: {
    position: 'absolute',
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modelBlock: {
    gap: 4,
    marginBottom: 24,
  },
  summaryBlock: {
    backgroundColor: '#D6F5E6',
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
    gap: 8,
  },
  summaryTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    fontWeight: '600',
    color: '#292929',
    marginBottom: 8,
  },
  section: {
    marginBottom: 16,
  },
  practiceBlock: {
    backgroundColor: '#FFF7E6',
    borderRadius: 16,
    padding: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: '#292929',
    marginBottom: 8,
  },
  bullet: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#292929',
    lineHeight: 22,
  },
  refsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reference: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#292929',
    lineHeight: 22,
    marginTop: 4,
  },
});
