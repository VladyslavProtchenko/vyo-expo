import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Linking } from 'react-native';
import { colors, typography } from '../../styles/globalStyles';
import { Props } from '../_types/props';

const openLink = (url: string) => {
  Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
};
export default function ArticlePage({ route }: Props<'ArticleScreen'>) {
  const { articleId } = route.params || {};
  console.log(articleId);
  return (
    <ScrollView style={styles.container}>
      <Image source={require('../../assets/images/article-image.webp')} style={styles.image} />
      <View style={styles.content}>

        <Text style={[typography.h1, styles.title]}>Article title</Text>
        <Text style={typography.p}>10 min reading</Text>

        <View style={styles.green}>
          <Text style={styles.greenTitle}>Key takeways</Text>
          <Text style={styles.greenP}>Women’s health is key to overall well-being. Regular check-ups, a balanced diet, and exercise help manage unique challenges like menstruation, pregnancy, and menopause.</Text>
        </View>
        <Text style={[typography.p]}>
          Women’s health is a vital aspect of overall well-being, encompassing a range of issues from reproductive health to chronic diseases. It is essential for women to prioritize their health by engaging in regular check-ups, maintaining a balanced diet, and staying physically active. Understanding the unique health challenges women face, such as hormonal changes during menstruation, pregnancy, and menopause, can empower them to make informed decisions about their health.
        </Text>
        <Text style={styles.subtitle}>Crucial role of nutrition</Text>
        <Text style={typography.p}> Women’s health is a vital aspect of overall well-being, encompassing a range of issues from reproductive health to chronic diseases. It is essential for women to prioritize their health by engaging in regular check-ups, maintaining a balanced diet, and staying physically active. Understanding the unique health challenges women face, such as hormonal changes during menstruation, pregnancy, and menopause, can empower them to make informed decisions about their health. </Text>

        <Text style={styles.subtitle}>References</Text>
        {Array.from({length: 4}).map((_, index) => (
          <Text 
            style={[typography.p, {marginBottom: 8}]} 
            key={index}
          >
            {index + 1}. Source name{' '}
            <Text 
              style={styles.referenceLink}
              onPress={() => openLink('https://www.google.com')}
            >
              Link
            </Text>
          </Text>
        ))}
      </View>
      <View style={{height: 100}}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50,
  },
  title: {
    fontSize:24,
  },
  image: {
    width: '150%',
    alignSelf: 'center',
    height: 300,
    borderBottomLeftRadius: 200,
    marginBottom: 20, 
  },
  content: {
    paddingHorizontal: 16,
  },
  green: {
    borderRadius: 24,
    backgroundColor: '#D6F5E6',
    marginTop:16,
    padding:16,
    gap:8,
    marginBottom: 16,
  },
  greenTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  greenP: {
    fontSize: 14,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
  },
  referenceLink: {
    fontSize: 14,
    paddingLeft: 4,
    fontWeight: 'bold',
    color: colors.link,
    textDecorationLine: 'underline',

  },
});