import { Story } from '@/app/(tabs)/components/StoriesModal';
import ButtonGradient from '@/components/ui/ButtonGradient';
import { useTranslation } from 'react-i18next';
import { Dimensions, Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { STORAGE_URL } from '@/config/supabase'

const SCREEN_HEIGHT = Dimensions.get('window').height;

// ─── Slide 1 ───────────────────────────────────────────────────────────────

function Slide1() {
  const { t } = useTranslation();
  return (
    <View style={s1.container}>
      <View style={s1.content}>
        <Text style={s1.title}>{t('stories.follicular.slide1.title')}</Text>

        <Text style={s1.body}>
          {t('stories.follicular.slide1.para1_pre')}
          <Text style={s1.highlight}>{t('stories.follicular.slide1.para1_hl')}</Text>
          {t('stories.follicular.slide1.para1_post')}
        </Text>

        <Text style={s1.body}>{t('stories.follicular.slide1.para2')}</Text>
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
      <View style={s2.content}>
        <Text style={s2.body}>
          {t('stories.follicular.slide2.para1')}
          {' '}
          <Text style={s2.highlight}>{t('stories.follicular.slide2.para2_hl')}</Text>
          {t('stories.follicular.slide2.para2_post')}
        </Text>
      </View>

      <Image
        source={{ uri: `${STORAGE_URL}/content/phases/figure-1.webp` }}
        style={[s2.figure, { transform: [{ rotate: '-60deg' }] }]}
        resizeMode="contain"
      />
    </View>
  );
}

const s2 = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#021F11' },
  content: { flex: 1, paddingHorizontal: 16, gap: 24, paddingTop: SCREEN_HEIGHT * 0.25 },
  body: { fontFamily: 'Poppins', fontWeight: '400', fontSize: 18, lineHeight: 28, color: '#ffffff' },
  highlight: { fontFamily: 'Poppins', fontWeight: '600', fontSize: 24, lineHeight: 28, color: '#FF8FBE' },
  figure: { width: 220, height: 220, position: 'absolute', bottom: -30, right: -30 },
  list: { gap: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  col: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

// ─── Slide 3 ───────────────────────────────────────────────────────────────

type Practice = { labelKey: string; image: string; labelSide: 'left' | 'right' };

const PRACTICES: Practice[] = [
  { labelKey: 'stories.follicular.slide3.practice1', image: `${STORAGE_URL}/content/phases/stress-m-3-1.webp`, labelSide: 'left' },
  { labelKey: 'stories.follicular.slide3.practice2', image: `${STORAGE_URL}/content/phases/stress-m-3-2.webp`, labelSide: 'right' },
  { labelKey: 'stories.follicular.slide3.practice3', image: `${STORAGE_URL}/content/phases/stress-m-3-3.webp`, labelSide: 'left' },
];

function Slide3() {
  const { t } = useTranslation();
  return (
    <View style={s3.container}>
      <View style={s3.content}>
        <View style={s3.header}>
          <Text style={s3.title}>{t('stories.follicular.slide3.title')}</Text>
          <Text style={s3.subtitle}>{t('stories.follicular.slide3.subtitle')}</Text>
        </View>

        <View style={s3.list}>
          {PRACTICES.map((item) => (
            <View key={item.labelKey} style={s3.row}>
              <View style={s3.col}>
                {item.labelSide === 'left' && <Text style={[s3.label, s3.labelRight]}>{t(item.labelKey)}</Text>}
              </View>
              <View style={s3.col}>
                <Image source={{ uri: item.image }} style={s3.photo} resizeMode="cover" />
              </View>
              <View style={s3.col}>
                {item.labelSide === 'right' && <Text style={[s3.label, s3.labelLeft]}>{t(item.labelKey)}</Text>}
              </View>
            </View>
          ))}
        </View>
      </View>

      <ButtonGradient title={t('stories.follicular.slide3.button')} />
    </View>
  );
}

const s3 = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#021F11', paddingHorizontal: 16, paddingTop: 32, paddingBottom: 40 },
  content: { flex: 1, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom:40 },
  title: { fontFamily: 'Poppins', fontWeight: '600', fontSize: 32, lineHeight: 40, color: '#ffffff', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontFamily: 'Poppins', fontWeight: '400', fontSize: 18, lineHeight: 28, color: '#ffffff', textAlign: 'center' },
  list: { gap: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  col: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  photo: { width: 120, height: 120, borderRadius: 20 },
  label: { fontFamily: 'Poppins', fontWeight: '400', fontSize: 16, color: '#ffffff' },
  labelRight: { textAlign: 'right' },
  labelLeft: { textAlign: 'left' },
});

// ─── Export ────────────────────────────────────────────────────────────────

export const createFollicularStories = (navigate?: () => void): Story[] => [
  { id: 1, render: () => <Slide1 /> },
  { id: 2, render: () => <Slide2 /> },
  {
    id: 3,
    render: () => <Slide3 />,
    bottomContent: navigate ? <ButtonGradient title="See stress management tips" onPress={navigate} /> : undefined,
  },
];

export const FOLICULAR_STORIES: Story[] = createFollicularStories();
