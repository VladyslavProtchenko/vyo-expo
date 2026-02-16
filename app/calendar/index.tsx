import CalendarComponent from '@/app/calendar/components/CalendarComponent';
import ButtonRounded from '@/components/ui/ButtonRounded';
import useUserStore from '@/store/useUserStore';
import { getDayTitle } from '@/utils/getDayTitle';
import { useRouter } from 'expo-router';
import { MoveLeft } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CalendarPage() {
  const router = useRouter();
  const { cycleDuration, menstruationDuration } = useUserStore();

  const handleLogPeriodData = () => {
    router.push('/symptoms' as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MoveLeft size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Calendar</Text>
      </View>
      <CalendarComponent />
      <View style={styles.stats}>
        <Text style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: '600' }}>Your typical cycle</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'column', gap: 2 }}>
            <Text style={{ fontFamily: 'Poppins', fontSize: 16 }}>
              {menstruationDuration} {getDayTitle(menstruationDuration).toLowerCase()}
            </Text>
            <Text style={{ fontFamily: 'Poppins', fontSize: 12, fontWeight: '400' }}>Period length</Text>
          </View>
          <View style={{ flexDirection: 'column', gap: 2 }}>
            <Text style={{ fontFamily: 'Poppins', fontSize: 16 }}>
              {cycleDuration} {getDayTitle(cycleDuration).toLowerCase()}
            </Text>
            <Text style={{ fontFamily: 'Poppins', fontSize: 12, fontWeight: '400' }}>Cycle length</Text>
          </View>
          <View style={{ flexDirection: 'column', gap: 2 }}>
            <Text style={{ fontFamily: 'Poppins', fontSize: 16 }}>3</Text>
            <Text style={{ fontFamily: 'Poppins', fontSize: 12, fontWeight: '400' }}>Cycle variation</Text>
          </View>
        </View>
      </View>

      <ButtonRounded className={styles.button} title="Log period data" onPress={handleLogPeriodData} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 60,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
    fontFamily: 'Poppins',
  },
  stats: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#F3F3F3',
    gap: 8,
  },
  button: {
    marginTop: 'auto',
  },
});
