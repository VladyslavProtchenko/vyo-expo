import { Story } from '@/app/(tabs)/components/StoriesModal';
import ButtonGradient from '@/components/ui/ButtonGradient';
import { useTranslation } from 'react-i18next';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;

// ─── Slide 1 ───────────────────────────────────────────────────────────────

function Slide1() {
  const { t } = useTranslation();
  return (
    <View style={s1.container}>
      <View style={s1.content}>
        <Text style={s1.title}>{t('nutrition_stories_endo.luteal.slide1.title')}</Text>

        <Text style={s1.body}>
          {t('nutrition_stories_endo.luteal.slide1.para1_pre')}
          <Text style={s1.highlight}>{t('nutrition_stories_endo.luteal.slide1.para1_hl')}</Text>
          {t('nutrition_stories_endo.luteal.slide1.para1_post')}
        </Text>

        <Text style={s1.body}>{t('nutrition_stories_endo.luteal.slide1.para2')}</Text>

        <Text style={s1.body}>
          {t('nutrition_stories_endo.luteal.slide1.para3_pre')}
          <Text style={s1.highlight}>{t('nutrition_stories_endo.luteal.slide1.para3_hl1')}</Text>
          {t('nutrition_stories_endo.luteal.slide1.para3_mid')}
          <Text style={s1.highlight}>{t('nutrition_stories_endo.luteal.slide1.para3_hl2')}</Text>
          {t('nutrition_stories_endo.luteal.slide1.para3_post')}
        </Text>

        <Text style={s1.body}>{t('nutrition_stories_endo.luteal.slide1.para4')}</Text>
      </View>

      <Image source={require('@/assets/images/phases/figure-1.webp')} style={s1.figure} resizeMode="contain" />
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
      <View style={s2.content}>
        <View style={s2.nutrient}>
          <View style={[s2.badge, s2.badgeLeft]}>
            <Text style={s2.badgeText}>{t('nutrition_stories_endo.luteal.slide2.nutrient1_name')}</Text>
          </View>
          <Text style={s2.body}>
            {t('nutrition_stories_endo.luteal.slide2.nutrient1_pre')}
            <Text style={s2.highlight}>{t('nutrition_stories_endo.luteal.slide2.nutrient1_hl1')}</Text>
            {t('nutrition_stories_endo.luteal.slide2.nutrient1_mid1')}
            <Text style={s2.highlight}>{t('nutrition_stories_endo.luteal.slide2.nutrient1_hl2')}</Text>
            {t('nutrition_stories_endo.luteal.slide2.nutrient1_mid2')}
            <Text style={s2.highlight}>{t('nutrition_stories_endo.luteal.slide2.nutrient1_hl3')}</Text>
          </Text>
        </View>

        <View style={s2.nutrient}>
          <View style={[s2.badge, s2.badgeCenter]}>
            <Text style={s2.badgeText}>{t('nutrition_stories_endo.luteal.slide2.nutrient2_name')}</Text>
          </View>
          <Text style={s2.body}>
            {t('nutrition_stories_endo.luteal.slide2.nutrient2_pre')}
            <Text style={s2.highlight}>{t('nutrition_stories_endo.luteal.slide2.nutrient2_hl')}</Text>
            {t('nutrition_stories_endo.luteal.slide2.nutrient2_post')}
          </Text>
        </View>

        <View style={s2.nutrient}>
          <View style={[s2.badge, s2.badgeRight]}>
            <Text style={s2.badgeText}>{t('nutrition_stories_endo.luteal.slide2.nutrient3_name')}</Text>
          </View>
          <Text style={s2.body}>
            {t('nutrition_stories_endo.luteal.slide2.nutrient3_pre')}
            <Text style={s2.highlight}>{t('nutrition_stories_endo.luteal.slide2.nutrient3_hl1')}</Text>
            {t('nutrition_stories_endo.luteal.slide2.nutrient3_mid')}
            <Text style={s2.highlight}>{t('nutrition_stories_endo.luteal.slide2.nutrient3_hl2')}</Text>
            {t('nutrition_stories_endo.luteal.slide2.nutrient3_post')}
          </Text>
        </View>
      </View>
    </View>
  );
}

const s2 = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#021F11', paddingHorizontal: 16 },
  content: { flex: 1, paddingTop: SCREEN_HEIGHT * 0.2, gap: 40 },
  nutrient: { gap: 6 },
  badge: { backgroundColor: '#ffffff', paddingHorizontal: 16, paddingVertical: 4, borderRadius: 50, marginBottom: 6 },
  badgeLeft: { alignSelf: 'flex-start', transform: [{ rotate: '-4deg' }] },
  badgeCenter: { alignSelf: 'center' },
  badgeRight: { alignSelf: 'flex-end', transform: [{ rotate: '4deg' }] },
  badgeText: { fontFamily: 'Poppins', fontWeight: '500', fontSize: 24, color: '#021F11' },
  highlight: { fontFamily: 'Poppins', fontWeight: '600', fontSize: 18, color: '#7ED4A0' },
  body: { fontFamily: 'Poppins', fontWeight: '400', fontSize: 18, lineHeight: 26, color: '#ffffff' },
});

// ─── Slide 3 ───────────────────────────────────────────────────────────────

function Slide3() {
  const { t } = useTranslation();
  return (
    <View style={s3.container}>
      <View style={s3.content}>
        <View style={s3.nutrient}>
          <View style={[s3.badge, s3.badgeCenter]}>
            <Text style={s3.badgeText}>{t('nutrition_stories_endo.luteal.slide3.nutrient1_name')}</Text>
          </View>
          <Text style={s3.body}>
            {t('nutrition_stories_endo.luteal.slide3.nutrient1_pre')}
            <Text style={s3.highlight}>{t('nutrition_stories_endo.luteal.slide3.nutrient1_hl1')}</Text>
            {t('nutrition_stories_endo.luteal.slide3.nutrient1_mid')}
            <Text style={s3.highlight}>{t('nutrition_stories_endo.luteal.slide3.nutrient1_hl2')}</Text>
            {t('nutrition_stories_endo.luteal.slide3.nutrient1_post')}
          </Text>
        </View>

        <View style={s3.nutrient}>
          <View style={[s3.badge, s3.badgeRight]}>
            <Text style={s3.badgeText}>{t('nutrition_stories_endo.luteal.slide3.nutrient2_name')}</Text>
          </View>
          <Text style={s3.body}>
            <Text style={s3.highlight}>{t('nutrition_stories_endo.luteal.slide3.nutrient2_hl1')}</Text>
            {t('nutrition_stories_endo.luteal.slide3.nutrient2_mid')}
            <Text style={s3.highlight}>{t('nutrition_stories_endo.luteal.slide3.nutrient2_hl2')}</Text>
            {t('nutrition_stories_endo.luteal.slide3.nutrient2_post')}
          </Text>
        </View>
      </View>

    </View>
  );
}

const s3 = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#021F11', paddingHorizontal: 16, paddingBottom: 40 },
  content: { flex: 1, paddingTop: SCREEN_HEIGHT * 0.2, gap: 80 },
  nutrient: { gap: 6 },
  badge: { backgroundColor: '#ffffff', paddingHorizontal: 16, paddingVertical: 4, borderRadius: 50, marginBottom: 6 },
  badgeCenter: { alignSelf: 'center' },
  badgeRight: { alignSelf: 'flex-end', transform: [{ rotate: '4deg' }] },
  badgeText: { fontFamily: 'Poppins', fontWeight: '500', fontSize: 24, color: '#021F11' },
  highlight: { fontFamily: 'Poppins', fontWeight: '600', fontSize: 18, color: '#FFC823' },
  body: { fontFamily: 'Poppins', fontWeight: '400', fontSize: 18, lineHeight: 26, color: '#ffffff' },
});

// ─── Slide 4 ───────────────────────────────────────────────────────────────

function Slide4() {
  const { t } = useTranslation();
  return (
    <View style={s4.container}>
      <View style={s4.content}>
        <Text style={s4.title}>{t('nutrition_stories_endo.luteal.slide4.title')}</Text>

        <View style={s4.row}>
          <Image source={require('@/assets/images/phases/food-1.webp')} style={s4.photo} resizeMode="cover" />
          <View style={s4.tip}>
            <Text style={s4.emoji}>🌿</Text>
            <Text style={s4.tipText}>{t('nutrition_stories_endo.luteal.slide4.tip1')}</Text>
          </View>
        </View>

        <View style={s4.rowReverse}>
          <View style={s4.tip}>
            <Text style={s4.emoji}>🌿</Text>
            <Text style={s4.tipText}>{t('nutrition_stories_endo.luteal.slide4.tip2')}</Text>
          </View>
          <Image source={require('@/assets/images/phases/food-3.webp')} style={s4.photo} resizeMode="cover" />
        </View>
      </View>

      <ButtonGradient title={t('nutrition_stories_endo.luteal.slide4.button')} />
    </View>
  );
}

const s4 = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#021F11', paddingHorizontal: 16, paddingBottom: 40 },
  content: { flex: 1, justifyContent: 'center', gap: 24 },
  title: { fontFamily: 'Poppins', fontWeight: '600', fontSize: 32, lineHeight: 40, color: '#ffffff' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  rowReverse: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  photo: { width: 150, height: 180, borderRadius: 20, flex: 1 },
  tip: { flex: 1, gap: 8 },
  emoji: { fontSize: 24 },
  tipText: { fontFamily: 'Poppins', fontWeight: '400', fontSize: 16, lineHeight: 22, color: '#ffffff' },
});

// ─── Export ────────────────────────────────────────────────────────────────

export const LUTEAL_STORIES_ENDO: Story[] = [
  { id: 1, render: () => <Slide1 /> },
  { id: 2, render: () => <Slide2 /> },
  { id: 3, render: () => <Slide3 /> },
  { id: 4, render: () => <Slide4 /> },
];
