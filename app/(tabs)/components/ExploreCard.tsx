import ButtonRounded from "@/components/ui/ButtonRounded";
import { PHASES } from "@/constants/phases";
import { typography } from "@/constants/typography";
import { CurrentPhaseInfo } from "@/store/phase";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import NoteCard from "./NoteCard";

const phaseConfig = {
  menstrual: {
    name: 'Menstrual phase',
    icon: PHASES.menstrual.icon,
    backgroundColor: PHASES.menstrual.colorLight,
    description: 'Energy may dip and mood can shift — gentle rest and care will help your body recover.'
  },
  follicular: {
    name: 'Follicular phase',
    icon: PHASES.follicular.icon,
    backgroundColor: PHASES.follicular.colorLight,
    description: 'Energy is rising and creativity flows — perfect time for new projects and social activities.'
  },
  ovulation: {
    name: 'Ovulation phase',
    icon: PHASES.ovulation.icon,
    backgroundColor: PHASES.ovulation.colorLight,
    description: 'Peak energy and confidence — ideal time for important decisions and challenging tasks.'
  },
  luteal: {
    name: 'Luteal phase',
    icon: PHASES.luteal.icon,
    backgroundColor: PHASES.luteal.colorLight,
    description: 'Focus on self-care and reflection — time to slow down and prepare for the next cycle.'
  }
};

export default function ExploreCard() {
  const router = useRouter();
  const { phaseName } = CurrentPhaseInfo();
  const phase = phaseConfig[phaseName] || phaseConfig.menstrual;

  return (
    <NoteCard backgroundColor={phase.backgroundColor}>
      <View style={styles.noteCard}>
        <View style={styles.noteHeader}>
          <View>
            <Text style={[typography.p, styles.inTitle]}>You're in</Text>  
            <View style={styles.titleBox}>
              <Image source={phase.icon} style={styles.titleBoxIcon} />
              <Text style={[typography.p, styles.noteCardTitle]}>{phase.name}</Text>  
            </View>
          </View>
          <ButtonRounded 
            title='Explore' 
            type='white' 
            className={styles.exploreButton}
            onPress={() => router.push('/phase' as any)} 
          />
        </View>
        <Text style={[typography.p, styles.description]}>{phase.description}</Text>
      </View>
    </NoteCard>
  );
}   

const styles = StyleSheet.create({
  noteCard: {
    padding: 16,
    paddingTop: 16,
  },  
  inTitle: {
    fontSize: 14
  },
  titleBox: {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleBoxIcon: {
    width: 16,
    height: 16,
  },
  noteCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
    marginTop: 12,
  },
  exploreButton: {
    width: 100,
    height: 36,
    minHeight: 36,
    paddingVertical: 0,
    backgroundColor: 'transparent',
  },
});
