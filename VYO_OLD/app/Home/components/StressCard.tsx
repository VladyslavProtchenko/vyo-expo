import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import CustomCheckbox from '../../_components/ui/CustomCheckbox'
import { BUCKET_URL } from '../../../Constants'
import { Play } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native';
export default function StressCard({
  checked,
  onPress,
}: {
  checked: boolean,
  onPress: () => void,
}) {
  const navigation = useNavigation(); 
  return (
    <View style={{ flexDirection: 'row' }}>
      <CustomCheckbox 
        style={{marginTop: 14, marginRight: 4}}
        checked={checked}
        onPress={onPress}
      />
      <TouchableOpacity 
        onPress={() => navigation.navigate('StressManagement' as never) }
        style={{ padding: 16, borderRadius: 24, flexDirection: 'row', backgroundColor: '#F7F7F7', flex: 1}}
      >
        <View style={{ flex: 1, marginRight: 12 }}>
          <Text style={{fontSize: 16, fontFamily: "ArchivoBlack-Regular", marginBottom: 8}}>Stress Management</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap'}}>
            {['Breathing practice'].map((item) =>(
              <View key={item} style={{paddingHorizontal: 8, paddingVertical: 4, borderRadius: 16, backgroundColor: 'white', marginRight: 4, marginBottom: 4}}>
                  <Text style={{fontSize: 12, fontFamily: "Poppins", color: '#404040'}}>{item}</Text>
                </View>
            ))}
          </View>
        </View>
        <View style={{ width: 80, height: 80, borderRadius:12, overflow: 'hidden'}}>
          <Image 
            source={require('../../../assets/images/mission-3.webp')} 
            style={{ height: 80, width: 80}} 
          />
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.3)'}}>
            <View style={styles.playButton}>
              <Play size={16} color="#292929" fill="#292929" strokeWidth={2} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  playButton: {
    width: 28,
    height: 28,
    borderRadius: 28,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
})