import ArticleAuthor from '@/components/ui/ArticleAuthor';
import ArticleKeyTakeaway from '@/components/ui/ArticleKeyTakeaway';
import FocusCard from '@/components/ui/FocusCard';
import References from '@/components/ui/References';
import { nutritionArticles } from '@/constants/nutritionArticles';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { X } from 'lucide-react-native';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NutritionArticleRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const article = nutritionArticles.find((a) => a.id === id);

  if (!article) return null;

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.heroWrapper}>
          <Image source={article.heroImage} style={styles.heroImage} resizeMode="cover" />
          <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
            <X size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{article.title}</Text>
          <Text style={styles.readingTime}>{article.readingTime}</Text>

          <ArticleAuthor name={article.author.name} title={article.author.title} image={article.author.image} />
          <ArticleKeyTakeaway text={article.keyTakeaway} />

          {article.intro.map((para, i) => (
            <Text key={i} style={styles.body}>{para}</Text>
          ))}

          <View style={styles.quoteBlock}>
            <Text style={styles.quoteText}>{'"'}</Text>
            <Text style={styles.quoteSubText}>{article.quote}</Text>
          </View>

          {article.crucialHeading ? <Text style={styles.heading}>{article.crucialHeading}</Text> : null}
          {article.crucialBody ? <Text style={styles.body}>{article.crucialBody}</Text> : null}

          <View style={styles.focusCardWrapper}>
            <FocusCard showInfoButton={false} />
          </View>

          <View style={styles.nutrientSections}>
            {article.nutrientSections.map((section) => (
              <View key={section.id}>
                <Text style={styles.nutrientName}>{section.name}</Text>
                <Text style={styles.nutrientBody}>
                  {section.description[article.variant] ?? section.description.general}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {article.midImage && article.whatElse.length > 0 && (
          <Image source={article.midImage} style={styles.midImage} resizeMode="cover" />
        )}

        {article.whatElse.length > 0 && (
          <View style={styles.content}>
            <Text style={styles.heading}>What else?</Text>
            {article.whatElse.map((para, i) => (
              <Text key={i} style={styles.body}>{para}</Text>
            ))}
          </View>
        )}

        <View style={styles.referencesBlock}>
          <References references={article.references} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heroWrapper: {
    width: '100%',
    height: 260,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 100,
  },
  closeBtn: {
    position: 'absolute',
    top: 48,
    right: 16,
    padding: 8,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  title: {
    fontFamily: 'ArchivoBlack-Regular',
    fontSize: 28,
    lineHeight: 34,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  readingTime: {
    fontFamily: 'Poppins',
    fontSize: 16,
    lineHeight: 16 * 1.2,
    color: '#888',
    marginBottom: 16,
  },
  body: {
    fontFamily: 'Poppins',
    fontSize: 14,
    lineHeight: 22,
    color: '#292929',
    marginBottom: 14,
  },
  quoteBlock: {
    flexDirection: 'row',
    marginVertical: 8,
    marginBottom: 20,
    width: '90%',
    alignSelf: 'center',
  },
  quoteText: {
    fontFamily: 'Poppins-SemiBoldItalic',
    fontSize: 50,
    lineHeight: 50 * 1.4,
    color: '#1a1a1a',
  },
  quoteSubText: {
    flex: 1,
    fontFamily: 'Poppins-SemiBoldItalic',
    fontSize: 16,
    lineHeight: 16 * 1.4,
    letterSpacing: -0.17,
    color: '#1a1a1a',
    paddingTop: 20,
    textAlign: 'center',
  },
  heading: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    lineHeight: 24 * 1.4,
    color: '#1a1a1a',
    marginBottom: 8,
    marginTop: 4,
  },
  focusCardWrapper: {
    marginBottom: 24,
  },
  nutrientSections: {
    gap: 12,
  },
  nutrientName: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 16 * 1.4,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  nutrientBody: {
    fontFamily: 'Poppins',
    fontSize: 14,
    lineHeight: 22,
    color: '#292929',
  },
  referencesBlock: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  midImage: {
    width: '100%',
    height: 260,
    marginVertical: 20,
    borderBottomLeftRadius: 100,
    borderTopRightRadius: 100,
  },
});
