import { View, Text, StyleSheet, Image } from "react-native";
import ButtonRounded from "../../_components/ui/ButtonRounded";
export default function FeelingCard({ navigation }: { navigation: any }) {

  const handleLogQuickly = () => {
    navigation.navigate('Symptoms');
  }

  return (
    <View style={styles.card}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 8, flex:1, marginRight: 16}}>
        <Image source={require('../../../assets/images/icons/pinkHeart.png')} style={styles.cardIcon} />
        <Text style={styles.cardTitle}>How are you feeling today?</Text>
      </View>
      <ButtonRounded
        type='black'
        title='Log quickly'
        onPress={handleLogQuickly}
        className={{ paddingHorizontal: 12, paddingVertical: 8, width: 'auto', minHeight: 34, borderRadius: 999}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFEEF5',
    padding: 16,
    borderRadius: 16,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon:{
    width: 36,
    height: 36,
  },
  cardTitle:{
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '500',
    flex: 1,
  },
  cardButton:{
    flex: 1,
    width: 100,
    height: 34,
  },
});