import { typography } from '@/constants/typography';
import useUserStore from '@/store/useUserStore';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeHeader() {
  const { name } = useUserStore();
  const router = useRouter();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity 
        style={styles.headerInfo}
        onPress={() => router.push('/profile' as any)}
        activeOpacity={0.7}
      >
        <Image source={require('@/assets/images/avatar.png')} style={styles.headerIcon} />
        <Text style={[typography.p]}>Today's Your day, {name || 'Sonya'}</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.calendarIcon} 
        onPress={() => router.push('/calendar' as any)}
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
  headerInfo: {
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
