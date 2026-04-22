import { Story } from '@/app/(tabs)/components/StoriesModal';
import ButtonGradient from '@/components/ui/ButtonGradient';
import { useTranslation } from 'react-i18next';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { STORAGE_URL } from '@/config/supabase'

const SCREEN_HEIGHT = Dimensions.get('window').height;

// ─── Slide 1 ───────────────────────────────────────────────────────────────

function Slide1() {
  const { t } = useTranslation();
  return (
    <View style={s1.container}>
      <Image source={{ uri: `${STORAGE_URL}/content/phases/figure-2.webp` }} style={s1.figure} contentFit="contain" />
      <View style={s1.content}>
        <Text style={s1.title}>{t('exercise_stories.follicular.slide1.title')}</Text>

        <Text style={s1.body}>
          {t('exercise_stories.follicular.slide1.para1_pre')}
          <Text style={s1.highlight}>{t('exercise_stories.follicular.slide1.para1_hl1')}</Text>
          {t('exercise_stories.follicular.slide1.para1_mid')}
          <Text style={s1.highlight}>{t('exercise_stories.follicular.slide1.para1_hl2')}</Text>
          {t('exercise_stories.follicular.slide1.para1_post')}
        </Text>

        <Text style={s1.body}>{t('exercise_stories.follicular.slide1.para2')}</Text>
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

type Practice = { labelKey: string; image: string; labelSide: 'left' | 'right' };

const PRACTICES: Practice[] = [
  { labelKey: 'exercise_stories.follicular.slide2.practice1', image: `${STORAGE_URL}/content/phases/sport-f-1.webp`, labelSide: 'left' },
  { labelKey: 'exercise_stories.follicular.slide2.practice2', image: `${STORAGE_URL}/content/phases/sport-f-2.webp`, labelSide: 'right' },
  { labelKey: 'exercise_stories.follicular.slide2.practice3', image: `${STORAGE_URL}/content/phases/sport-f-3.webp`, labelSide: 'left' },
  { labelKey: 'exercise_stories.follicular.slide2.practice4', image: `${STORAGE_URL}/content/phases/sport-f-4.webp`, labelSide: 'right' },
];

function Slide2() {
  const { t } = useTranslation();
  return (
    <View style={s2.container}>
      <View style={s2.content}>
        <Text style={s2.subtitle}>{t('exercise_stories.follicular.slide2.subtitle')}</Text>
        <View style={s2.list}>
          {PRACTICES.map((item) => (
            <View key={item.labelKey} style={s2.row}>
              <View style={s2.col}>
                {item.labelSide === 'left' && <Text style={[s2.label, s2.labelRight]}>{t(item.labelKey)}</Text>}
              </View>
              <View style={s2.col}>
                <Image source={{ uri: item.image }} style={s2.photo} contentFit="cover" />
              </View>
              <View style={s2.col}>
                {item.labelSide === 'right' && <Text style={[s2.label, s2.labelLeft]}>{t(item.labelKey)}</Text>}
              </View>
            </View>
          ))}
        </View>
      </View>

      <ButtonGradient title={t('exercise_stories.follicular.slide3.button')} />
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
  labelLeft: { textAlign: 'left', width: '100%'  },
});

// ─── Export ────────────────────────────────────────────────────────────────

export const createFollicularStories = (navigate?: () => void): Story[] => [
  { id: 1, render: () => <Slide1 /> },
  {
    id: 2,
    render: () => <Slide2 />,
    bottomContent: navigate ? <ButtonGradient title="See exercises for today" onPress={navigate} /> : undefined,
  },
];

export const FOLICULAR_STORIES: Story[] = createFollicularStories();
