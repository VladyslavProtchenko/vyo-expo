import { ScrollView, View, StyleSheet } from 'react-native';
import Card from './components/Card';
import List from './components/List';
import HomeHeader from '../_components/HomeHeader';
import Menu from './components/Menu';

export default function CarePlan() {

  return (
    <ScrollView style={styles.scrollView}>
      <HomeHeader />
      <Card />
      <View style={styles.listContainer}>
        <List />
        <Menu />
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