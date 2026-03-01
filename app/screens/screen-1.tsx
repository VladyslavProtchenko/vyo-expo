import { StyleSheet, Text, View } from 'react-native';

export default function Screen1() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Screen 1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
  },
});
