import References from '@/app/products/components/References';
import ButtonGradient from '@/components/ui/ButtonGradient';
import { colors } from '@/constants/typography';
import { CurrentPhaseInfo } from '@/store/phase';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { phaseData, PhaseName } from '../phaseData';
import SkipPoster from './SkipPoster';

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default function PhaseInfo() {
  const router = useRouter();
  const { phaseName } = CurrentPhaseInfo();
  const data = phaseData[phaseName as PhaseName];

  const phaseColors = {
    menstrual: colors.menstrual,
    follicular: colors.follicular,
    ovulation: colors.ovulation,
    luteal: colors.luteal,
  };

  const backgroundColor = hexToRgba(phaseColors[phaseName as keyof typeof phaseColors], 0.1);

  return (
    <View style={styles.container}>
      <Text style={styles.phaseTitle}>{data.fullName}</Text>

      <View style={[styles.challengesBox, { backgroundColor }]}>
        <Text style={styles.sectionTitle}>Potential challenges</Text>
        <View style={styles.challengesContainer}>
          {data.challenges.map((challenge, index) => (
            <View key={index} style={styles.challengeTag}>
              <Text style={styles.challengeEmoji}>{challenge.emoji}</Text>
              <Text style={styles.challengeLabel}>{challenge.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.hormonesBox, { marginBottom: 16 }]}>
        <Text style={styles.sectionTitle}>Hormones and body</Text>
        <Text style={styles.description}>{data.description}</Text>
      </View>
      <View style={[styles.hormonesBox, { marginBottom: 16 }]}>
        <Text style={styles.description}>Listening to your body isn't a weakness — it's a precise response to the physiology of this phase.</Text>
      </View>

      <SkipPoster />
      <References />


      <View style={styles.buttonContainer}>
        <ButtonGradient title="Got It!" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 32,
  },
  phaseTitle: {
    fontFamily: 'ArchivoBlack-Regular',
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 24,
  },
  challengesBox: {
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
  },
  hormonesBox: {
    backgroundColor: '#F5F5F5',
    borderRadius: 24,
    padding: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    fontWeight: '600',
    color: '#404040',
    marginBottom: 12,
  },
  challengesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  challengeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
  },
  challengeEmoji: {
    fontSize: 16,
  },
  challengeLabel: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#404040',
  },
  description: {
    fontFamily: 'Poppins',
    fontSize: 14,
    lineHeight: 20,
    color: '#404040',
  },
  buttonContainer: {
    marginTop: 24,
    marginBottom: 16,
  },
});
