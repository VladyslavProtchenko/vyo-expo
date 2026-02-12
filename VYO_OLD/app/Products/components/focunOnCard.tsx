import { View, Text, StyleSheet, Image } from 'react-native'
import { CurrentPhaseInfo } from '../../_store/phase'
import useProductsStore from '../../_store/useProducts'

export default function FocusOnCard() {
  const { phaseName } = CurrentPhaseInfo();
  const nutrients = useProductsStore(state => state.productsInfo[phaseName as keyof typeof state.productsInfo].nutrients);

  const phaseIcon = {
    menstrual: require('../../../assets/images/icons/pi1.png'),
    follicular: require('../../../assets/images/icons/pi2.png'),
    ovulation: require('../../../assets/images/icons/pi3.png'),
    luteal: require('../../../assets/images/icons/pi4.png'),
  }
  const phaseColor = {
    menstrual: '#FFE5E5',
    follicular: '#FFE5F5',
    ovulation: '#FFF8E5',
    luteal: '#E5FFF5',
  }

  return (
    <View style={[styles.card, {backgroundColor: phaseColor[phaseName as keyof typeof phaseColor]}]}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 12}}>
        <View>
          <Text style={{fontSize: 14, fontFamily: 'Poppins'}}>Focus for</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
            <Image source={phaseIcon[phaseName as keyof typeof phaseIcon]} style={{width: 16, height: 16}} />
            <Text style={{fontSize: 16, fontFamily: 'Poppins', fontWeight: '600'}}>{phaseName} phase</Text>
          </View>
        </View>
        <View style={{width: 30, height: 30, borderRadius: 100, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#404040'}}>
          <Text style={{fontSize: 16, fontFamily: 'Poppins', fontWeight: '600'}}>?</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap'}}>
        {nutrients.map((item) =>(
          <View key={item} style={{paddingHorizontal: 8, paddingVertical: 4, borderRadius: 16, backgroundColor: 'white', marginRight: 4, marginBottom: 4}}>
            <Text style={{fontSize: 12, fontFamily: "Poppins", color: '#404040'}}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}




const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
})