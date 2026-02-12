import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../_types/types';
import useProfileStore from '../_store/useProfileStore';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { typography } from '../../styles/globalStyles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Calendar'>;

export default function HomeHeader() {
  const { name } = useProfileStore();
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerInfo}>
        <Image source={require('../../assets/images/avatar.png')} style={styles.headerIcon} />
        <Text style={[typography.p]}>Today's Your day, Sonya</Text>
      </View>
      <TouchableOpacity 
        style={styles.calendarIcon} 
        onPress={() => navigation.navigate('Calendar')}
        activeOpacity={0.7}
      >
        <MaterialIcons name="calendar-today" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    paddingVertical: 16,
    justifyContent: 'space-between',
  },
  headerInfo:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  calendarIcon: {
    width: 44,
    height: 44,
    backgroundColor: 'white',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    width: 44,
    height: 44,
  },
});