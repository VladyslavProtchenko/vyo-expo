import { ScrollView, View, StyleSheet } from 'react-native';

export default function Physiotherapy() {

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.listContainer}>
      </View>
      <View style={{paddingBottom: 200}}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 50,
    paddingVertical: 24,
    paddingHorizontal: 16,
    
  },
  listContainer: {
    marginVertical: 16,
    
  },
});
