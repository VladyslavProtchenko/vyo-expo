import { Story } from '@/app/(tabs)/components/StoriesModal';
import ButtonGradient from '@/components/ui/ButtonGradient';
import NutritionArticleCard from '@/components/stories/NutritionArticleCard';
import { useTranslation } from 'react-i18next';
import { BlurView } from 'expo-blur';
import { Dimensions, Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { STORAGE_URL } from '@/config/supabase'

const SCREEN_HEIGHT = Dimensions.get('window').height;

// ─── Slide 1 ───────────────────────────────────────────────────────────────

function Slide1() {
  const { t } = useTranslation();
  return (
    <View style={s1.container}>
      <View style={s1.content}>
        <Text style={s1.title}>{t('nutrition_stories.menstrual.slide1.title')}</Text>

        <Text style={s1.body}>
          {t('nutrition_stories.menstrual.slide1.para1_pre')}
          <Text style={s1.highlight}>{t('nutrition_stories.menstrual.slide1.para1_hl')}</Text>
          {t('nutrition_stories.menstrual.slide1.para1_post')}
        </Text>

        <Text style={s1.body}>
          {t('nutrition_stories.menstrual.slide1.para2_pre')}
          <Text style={s1.highlight}>{t('nutrition_stories.menstrual.slide1.para2_hl1')}</Text>
          {t('nutrition_stories.menstrual.slide1.para2_mid')}
          <Text style={s1.highlight}>{t('nutrition_stories.menstrual.slide1.para2_hl2')}</Text>
          {t('nutrition_stories.menstrual.slide1.para2_post')}
        </Text>
      </View>

      <Image source={{ uri: `${STORAGE_URL}/content/phases/figure-1.webp` }} style={s1.figure} resizeMode="contain" />
    </View>
  );
}

const s1 = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#021F11' },
  content: { flex: 1, paddingHorizontal: 16, gap: 24, paddingTop: SCREEN_HEIGHT * 0.25 },
  title: { fontFamily: 'Poppins', fontWeight: '600', fontSize: 32, lineHeight: 40, color: '#ffffff' },
  body: { fontFamily: 'Poppins', fontWeight: '400', fontSize: 18, lineHeight: 28, color: '#ffffff' },
  highlight: { fontFamily: 'Poppins', fontWeight: '600', fontSize: 24, lineHeight: 28, color: '#FF8FBE' },
  figure: { width: 220, height: 220, position: 'absolute', bottom: -50, left: -30 },
});


// ─── Slide 2 ───────────────────────────────────────────────────────────────

function Slide2() {
  const { t } = useTranslation();
  return (
    <View style={s2.container}>
      <View style={s2.nutrient}>
        <View style={[s2.badge, s2.badgeLeft]}>
          <Text style={s2.badgeText}>{t('nutrition_stories.menstrual.slide2.nutrient1_name')}</Text>
        </View>
        <Text style={s2.highlight}>{t('nutrition_stories.menstrual.slide2.nutrient1_hl')}</Text>
        <Text style={s2.body}>{t('nutrition_stories.menstrual.slide2.nutrient1_body')}</Text>
      </View>

      <View style={s2.nutrient}>
        <View style={[s2.badge, s2.badgeRight]}>
          <Text style={s2.badgeText}>{t('nutrition_stories.menstrual.slide2.nutrient2_name')}</Text>
        </View>
        <Text style={s2.highlight}>{t('nutrition_stories.menstrual.slide2.nutrient2_hl')}</Text>
        <Text style={s2.body}>{t('nutrition_stories.menstrual.slide2.nutrient2_body')}</Text>
      </View>

      <View style={s2.nutrient}>
        <View style={[s2.badge, s2.badgeCenter]}>
          <Text style={s2.badgeText}>{t('nutrition_stories.menstrual.slide2.nutrient3_name')}</Text>
        </View>
        <Text style={s2.body}>
          {t('nutrition_stories.menstrual.slide2.nutrient3_pre')}
          <Text style={s2.highlight}>{t('nutrition_stories.menstrual.slide2.nutrient3_hl1')}</Text>
          {t('nutrition_stories.menstrual.slide2.nutrient3_mid')}
          <Text style={s2.highlight}>{t('nutrition_stories.menstrual.slide2.nutrient3_hl2')}</Text>
          {t('nutrition_stories.menstrual.slide2.nutrient3_post')}
        </Text>
      </View>
    </View>
  );
}

const s2 = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#021F11', paddingHorizontal: 16, justifyContent: 'center', gap: 40 },
  nutrient: { gap: 6 },
  badge: { backgroundColor: '#ffffff', paddingHorizontal: 16, paddingVertical: 4, borderRadius: 50, marginBottom: 6 },
  badgeLeft: { alignSelf: 'flex-start', transform: [{ rotate: '-8deg' }] },
  badgeRight: { alignSelf: 'flex-end', transform: [{ rotate: '8deg' }] },
  badgeCenter: { alignSelf: 'center', transform: [{ rotate: '-8deg' }] },
  badgeText: { fontFamily: 'Poppins', fontWeight: '500', fontSize: 24, color: '#021F11' },
  highlight: { fontFamily: 'Poppins', fontWeight: '600', fontSize: 18, color: '#7ED4A0' },
  body: { fontFamily: 'Poppins', fontWeight: '400', fontSize: 18, lineHeight: 26, color: '#ffffff' },
});

// ─── Slide 3 ───────────────────────────────────────────────────────────────

function Slide3() {
  const { t } = useTranslation();
  return (
    <View style={s3.container}>
      <View style={s2.nutrient}>
        <View style={[s2.badge, s3.badgeCenter]}>
          <Text style={s2.badgeText}>{t('nutrition_stories.menstrual.slide3.nutrient1_name')}</Text>
        </View>
        <Text style={s3.highlight}>{t('nutrition_stories.menstrual.slide3.nutrient1_hl')}</Text>
        <Text style={s2.body}>{t('nutrition_stories.menstrual.slide3.nutrient1_body')}</Text>
      </View>

      <View style={s2.nutrient}>
        <View style={[s2.badge, s3.badgeRight]}>
          <Text style={s2.badgeText}>{t('nutrition_stories.menstrual.slide3.nutrient2_name')}</Text>
        </View>
        <Text style={s3.highlight}>{t('nutrition_stories.menstrual.slide3.nutrient2_hl')}</Text>
      </View>
    </View>
  );
}

const s3 = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#021F11', paddingHorizontal: 16, justifyContent: 'center', gap: 40 },
  highlight: { fontFamily: 'Poppins', fontWeight: '600', fontSize: 18, color: '#FFC823' },
  badgeRight: { alignSelf: 'flex-end', transform: [{ rotate: '4deg' }] },
  badgeCenter: { alignSelf: 'center'},
});

// ─── Slide 4 ───────────────────────────────────────────────────────────────

function Slide4() {
  const { t } = useTranslation();
  return (
    <View style={s4.container}>
      <Text style={s4.title}>{t('nutrition_stories.menstrual.slide4.title')}</Text>

      <View style={s4.row}>
        <Image source={{ uri: `${STORAGE_URL}/content/phases/food-1.webp` }} style={s4.photo} resizeMode="cover" />
        <View style={s4.tipRight}>
          <Text style={s4.emoji}>🌿</Text>
          <Text style={s4.tipText}>{t('nutrition_stories.menstrual.slide4.tip1')}</Text>
        </View>
      </View>

      <View style={s4.row}>
        <View style={s4.tipLeft}>
          <Text style={s4.emoji}>🌿</Text>
          <Text style={s4.tipText}>{t('nutrition_stories.menstrual.slide4.tip2')}</Text>
        </View>
        <Image source={{ uri: `${STORAGE_URL}/content/phases/food-2.webp` }} style={s4.photo} resizeMode="cover" />
      </View>

      <BlurView intensity={30} tint="light" style={s4.note}>
        <Text style={s4.noteText}>{t('nutrition_stories.menstrual.slide4.note')}</Text>
      </BlurView>
    </View>
  );
}

const s4 = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#021F11', paddingHorizontal: 16, paddingBottom: 32, gap: 24, justifyContent: 'center', paddingTop: 32 },
  title: { fontFamily: 'Poppins', fontWeight: '600', fontSize: 32, lineHeight: 40, color: '#ffffff' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 24 },
  photo: { width: 160, height: 160, borderRadius: 20, flex: 1 },
  tipRight: { flex: 1, gap: 8 },
  tipLeft: { flex: 1, gap: 8 },
  emoji: { fontSize: 28 },
  tipText: { fontFamily: 'Poppins', fontWeight: '400', fontSize: 16,  color: '#ffffff' },
  note: { borderRadius: 24, paddingHorizontal: 16, paddingVertical: 16, overflow: 'hidden' },
  noteText: { fontFamily: 'Poppins', fontWeight: '400', fontSize: 16, lineHeight: 24, color: '#ffffff' },
});

// ─── Slide 5 ───────────────────────────────────────────────────────────────

function Slide5() {
  const { t } = useTranslation();
  return (
    <View style={s5.container}>
      <View style={s5.content}>
        <Text style={s5.title}>{t('nutrition_stories.menstrual.slide5.title')}</Text>

        <View style={s5.row}>
          <View style={s5.tipLeft}>
            <Text style={s5.emoji}>🌿</Text>
            <Text style={s5.tipText}>{t('nutrition_stories.menstrual.slide5.tip1')}</Text>
          </View>
          <Image source={{ uri: `${STORAGE_URL}/content/phases/food-3.webp` }} style={s5.photo} resizeMode="cover" />
        </View>

        <View style={s5.row}>
          <Image source={{ uri: `${STORAGE_URL}/content/phases/food-4.webp` }} style={s5.photo} resizeMode="cover" />
          <View style={s5.tipRight}>
            <Text style={s5.emoji}>🌿</Text>
            <Text style={s5.tipText}>{t('nutrition_stories.menstrual.slide5.tip2')}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const s5 = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#021F11', paddingHorizontal: 16, paddingTop: 32, paddingBottom: 40 },
  content: { flex: 1, justifyContent: 'center', gap: 20 },
  title: { fontFamily: 'Poppins', fontWeight: '600', fontSize: 32, lineHeight: 40, color: '#ffffff' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 24 },
  photo: { width: 160, height: 160, borderRadius: 20, flex: 1 },
  tipLeft: { flex: 1, gap: 8 },
  tipRight: { flex: 1, gap: 8 },
  emoji: { fontSize: 28 },
  tipText: { fontFamily: 'Poppins', fontWeight: '400', fontSize: 16, lineHeight: 16 * 1.3, letterSpacing: -0.5, color: '#ffffff' },
});

// ─── Export ────────────────────────────────────────────────────────────────

export const createMenstrualStories = (navigate: () => void): Story[] => [
  { id: 1, render: () => <Slide1 /> },
  { id: 2, render: () => <Slide2 /> },
  { id: 3, render: () => <Slide3 /> },
  { id: 4, render: () => <Slide4 /> },
  {
    id: 5,
    render: () => <Slide5 />,
    bottomContent: <NutritionArticleCard onPress={navigate} />,
  },
];

export const createMenstrualStoriesInfo = (onClose: () => void, navigate: () => void): Story[] => [
  { id: 1, render: () => <Slide1 /> },
  { id: 2, render: () => <Slide2 /> },
  { id: 3, render: () => <Slide3 /> },
  { id: 4, render: () => <Slide4 /> },
  {
    id: 5,
    render: () => <Slide5 />,
    bottomContent: <NutritionArticleCard onPress={() => { onClose(); navigate(); }} />,
  },
];
