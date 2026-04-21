import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';

type Props = {
  name: string;
  title: string;
  image: string | ReturnType<typeof require>;
};

export default function ArticleAuthor({ name, title, image }: Props) {
  const source = typeof image === 'string' ? { uri: image } : image;
  return (
    <View style={styles.row}>
      <Image source={source} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.label}>Author</Text>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  info: {
    gap: 4,
    flex: 1,
  },
  label: {
    fontFamily: 'Poppins',
    fontSize: 12,
    lineHeight: 14,
    color: '#828282',
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    lineHeight: 16,
    color: '#292929',
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 12,
    lineHeight: 15,
    color: '#262222',
  },
});
