import { FontAwesome6 } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from "react-native";
import SkipQuiz from "./SkipQuiz";

interface ProgressProps {
  percentage: number; // 0-100
  isSkip: boolean;
  goBack: () => void;
  onSkip: () => void;
}

export default function Progress({ 
  percentage, 
  isSkip,
  goBack,
  onSkip,
}: ProgressProps) {
  const clampedPercentage = Math.max(0, Math.min(100, percentage));
  
  return (
    <View style={styles.container}>
      <Pressable onPress={goBack}>
        <FontAwesome6 name="arrow-left-long" size={24} color="black" />
      </Pressable>   
      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View 
            style={[
              styles.progressFill,
              { width: `${clampedPercentage}%` }
            ]}
          />
        </View>
      </View>
      {isSkip ? <SkipQuiz onSkip={onSkip} /> : <View style={{width: 24}}></View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 16,
    minHeight: 44,
  },
  progressContainer: {
    flex: 1,
  },
  progressTrack: {
    width: '100%',
    height: 8,
    backgroundColor: '#22AB8B26',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#22AB8B',
    borderRadius: 4,
  },
});
