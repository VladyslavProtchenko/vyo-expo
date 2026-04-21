import FocusCard from '@/components/ui/FocusCard';
import { StyleSheet, View } from 'react-native';

export default function FocusOnCard() {
  return (
    <View style={styles.wrapper}>
      <FocusCard showInfoButton />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    marginBottom: 16,
  },
});
