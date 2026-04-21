import { StyleSheet, Text, View } from 'react-native';

type Props = {
  text: string;
};

export default function ArticleKeyTakeaway({ text }: Props) {
  return (
    <View style={styles.block}>
      <Text style={styles.title}>Key takeaways</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: '#D6F5E6',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    gap: 8,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#292929',
    marginBottom: 4,
  },
  text: {
    fontFamily: 'Poppins',
    fontSize: 14,
    lineHeight: 14 * 1.5,
    color: '#262222',
  },
});
