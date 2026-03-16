import { Story } from '@/app/(tabs)/components/StoriesModal';
import ButtonGradient from '@/components/ui/ButtonGradient';
import { useTranslation } from 'react-i18next';
import { Dimensions, Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;

// ─── Slide 1 ───────────────────────────────────────────────────────────────

function Slide1() {
  const { t } = useTranslation();
  return (
    <View style={s1.container}>
      <Image source={require('@/assets/images/phases/figure-2.webp')} style={s1.figure} resizeMode="contain" />
      <View style={s1.content}>
        <Text style={s1.title}>{t('exercise_stories.menstrual.slide1.title')}</Text>

        <Text style={s1.body}>
          {t('exercise_stories.menstrual.slide1.para1_pre')}
          <Text style={s1.highlight}>{t('exercise_stories.menstrual.slide1.para1_hl')}</Text>
          {t('exercise_stories.menstrual.slide1.para1_post')}
        </Text>
      </View>

    </View>
  );
}

const s1 = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#021F11' },
  content: { flex: 1, paddingHorizontal: 16, gap: 24, paddingTop: SCREEN_HEIGHT * 0.25 },
  title: { fontFamily: 'Poppins', fontWeight: '600', fontSize: 32, lineHeight: 40, color: '#ffffff' },
  body: { fontFamily: 'Poppins', fontWeight: '400', fontSize: 18, lineHeight: 28, color: '#ffffff' },
  highlight: { fontFamily: 'Poppins', fontWeight: '600', fontSize: 24, lineHeight: 28, color: '#E8F54A' },
  figure: { width: 200, height: 200, position: 'absolute', top: -50, left: -80 },
});

// ─── Slide 2 ───────────────────────────────────────────────────────────────

type Practice = { labelKey: string; image: ImageSourcePropType; labelSide: 'left' | 'right' };

const PRACTICES: Practice[] = [
  { labelKey: 'exercise_stories.menstrual.slide2.practice1', image: require('@/assets/images/phases/stress-m-3-1.webp'), labelSide: 'left' },
  { labelKey: 'exercise_stories.menstrual.slide2.practice2', image: require('@/assets/images/phases/stress-m-3-2.webp'), labelSide: 'right' },
  { labelKey: 'exercise_stories.menstrual.slide2.practice3', image: require('@/assets/images/phases/sport-3-3.webp'), labelSide: 'left' },
  { labelKey: 'exercise_stories.menstrual.slide2.practice4', image: require('@/assets/images/phases/sport-3-4.webp'), labelSide: 'right' },
];

function Slide2() {
  const { t } = useTranslation();
  return (
    <View style={s2.container}>
      <View style={s2.content}>
        <Text style={s2.subtitle}>{t('exercise_stories.menstrual.slide2.subtitle')}</Text>
        <View style={s2.list}>
          {PRACTICES.map((item) => (
            <View key={item.labelKey} style={s2.row}>
              <View style={s2.col}>
                {item.labelSide === 'left' && <Text style={[s2.label, s2.labelRight]}>{t(item.labelKey)}</Text>}
              </View>
              <View style={s2.col}>
                <Image source={item.image} style={s2.photo} resizeMode="cover" />
              </View>
              <View style={s2.col}>
                {item.labelSide === 'right' && <Text style={[s2.label, s2.labelLeft]}>{t(item.labelKey)}</Text>}
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const s2 = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#021F11', paddingHorizontal: 16, paddingTop: 32, paddingBottom: 40 },
  content: { flex: 1, justifyContent: 'center' },
  subtitle: { fontFamily: 'Poppins', fontWeight: '400', fontSize: 18, lineHeight: 28, color: '#ffffff', textAlign: 'center', marginBottom: 40 },
  list: { gap: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 32 },
  col: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  photo: { width: 120, height: 120, borderRadius: 20 },
  label: { fontFamily: 'Poppins', fontWeight: '400', fontSize: 16, color: '#ffffff' },
  labelRight: { textAlign: 'right', width: '100%' },
  labelLeft: { textAlign: 'left', width: '100%' },
});

// ─── Slide 3 ───────────────────────────────────────────────────────────────

function Slide3() {
  const { t } = useTranslation();
  return (
    <View style={s3.container}>
      <Image source={require('@/assets/images/phases/figure-2.webp')} style={s3.figure} resizeMode="contain" />
      <View style={s3.content}>
        <Text style={s3.title}>{t('exercise_stories.menstrual.slide3.title')}</Text>

        <View style={s3.list}>
          <View style={s3.itemRow}><Text style={s3.emoji}>🌿</Text><Text style={s3.item}>{t('exercise_stories.menstrual.slide3.item1')}</Text></View>
          <View style={s3.itemRow}><Text style={s3.emoji}>🌿</Text><Text style={s3.item}>{t('exercise_stories.menstrual.slide3.item2')}</Text></View>
          <View style={s3.itemRow}><Text style={s3.emoji}>🌿</Text><Text style={s3.item}>{t('exercise_stories.menstrual.slide3.item3')}</Text></View>
        </View>

        <Text style={s3.body}>
          {t('exercise_stories.menstrual.slide3.para_pre')}
          <Text style={s3.highlight}>{t('exercise_stories.menstrual.slide3.para_hl')}</Text>
          {t('exercise_stories.menstrual.slide3.para_post')}
        </Text>
      </View>

      <ButtonGradient title={t('exercise_stories.menstrual.slide3.button')} />
    </View>
  );
}

const s3 = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#021F11',},
  content: { flex: 1, paddingHorizontal: 16, paddingTop: SCREEN_HEIGHT * 0.25 },
  title: { fontFamily: 'Poppins', fontWeight: '600', fontSize: 32, lineHeight: 40, color: '#ffffff', marginBottom: 16 },
  list: { gap: 16, marginBottom: 40 },
  itemRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  item: { fontFamily: 'Poppins', fontWeight: '400', fontSize: 18, lineHeight: 28, color: '#ffffff' },
  emoji: { fontSize: 32 },
  body: { fontFamily: 'Poppins', fontWeight: '400', fontSize: 18, lineHeight: 28, color: '#ffffff' },
  highlight: { fontFamily: 'Poppins', fontWeight: '700', fontSize: 18, color: '#E8F54A' },
  figure: { width: 200, height: 200, position: 'absolute', bottom: -30, right: -30 },
});

// ─── Export ────────────────────────────────────────────────────────────────

export const MENSTRUAL_STORIES: Story[] = [
  { id: 1, render: () => <Slide1 /> },
  { id: 2, render: () => <Slide2 /> },
  { id: 3, render: () => <Slide3 /> },
];
