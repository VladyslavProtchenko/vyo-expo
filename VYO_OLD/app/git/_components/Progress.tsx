import { View, Pressable, StyleSheet } from "react-native";
import { MoveLeft } from "lucide-react-native";
import SkipQuiz from "./SkipQuiz";

interface ProgressProps {
  percentage: number; // 0-100
  isSkip: boolean;
  goBack: () => void;
  navigation: any;
}

export default function Progress({ 
  percentage, 
  isSkip,
  goBack,
  navigation,
}: ProgressProps) {
  const clampedPercentage = Math.max(0, Math.min(100, percentage));
  
  return (
    <View style={styles.container}>
      <Pressable onPress={goBack}>
        <MoveLeft size={30} color="black" />
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
      {isSkip ? <SkipQuiz navigation={navigation} /> : <View style={{width: 24}}></View>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20, // px-5 equivalent
    gap: 16, // gap-4 equivalent
    minHeight: 44,
  },
  progressContainer: {
    flex: 1,
  },
  progressTrack: {
    width: '100%',
    height: 8,
    backgroundColor: '#22AB8B26',
    borderRadius: 4, // rounded-full equivalent
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#22AB8B',
    borderRadius: 4, // rounded-full equivalent
  },
});