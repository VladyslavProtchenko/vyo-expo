import ChartsBackground from '@/components/ChartsBackground';
import PhaseCircleIndicator from '@/app/phase/components/PhaseCircleIndicator';
import PhaseInfo from '@/app/phase/components/PhaseInfo';
import { useRouter } from 'expo-router';
import { MoveLeft } from 'lucide-react-native';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PhaseScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.header}>
        <MoveLeft size={30} color="black" />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.chartContainer}>
          <PhaseCircleIndicator />
        </View>
        <PhaseInfo />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 16,
    paddingHorizontal: 16,
  },
});
