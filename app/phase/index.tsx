import PhaseCircleIndicator from '@/app/phase/components/PhaseCircleIndicator';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PhaseScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <PhaseCircleIndicator />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
});
