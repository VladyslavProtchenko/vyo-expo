import { useNutritionStories } from '@/hooks/useNutritionStories';
import { PHASES } from '@/constants/phases';
import { CurrentPhaseInfo } from '@/store/phase';
import useProductsStore from '@/store/useProducts';
import useStoriesStore from '@/store/useStoriesStore';
import PhaseIcon from '@/components/ui/PhaseIcon';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  showInfoButton?: boolean;
};

export default function FocusCard({ showInfoButton = true }: Props) {
  const { phaseName } = CurrentPhaseInfo();
  const nutrients = useProductsStore(
    (state) => state.productsInfo[phaseName as keyof typeof state.productsInfo].nutrients
  );
  const { open } = useStoriesStore();
  const { stories } = useNutritionStories();

  return (
    <View style={[styles.card, { backgroundColor: PHASES[phaseName].colorLight }]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.label}>Focus for</Text>
          <View style={styles.phaseRow}>
            <PhaseIcon color={PHASES[phaseName].color} />
            <Text style={styles.phaseName}>{phaseName} phase</Text>
          </View>
        </View>
        {showInfoButton && (
          <TouchableOpacity
            onPress={() => open(stories)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={styles.questionBtn}
          >
            <Text style={styles.questionText}>?</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.chips}>
        {nutrients.map((item) => (
          <View key={item} style={styles.chip}>
            <Text style={styles.chipText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    alignItems: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins',
  },
  phaseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  phaseName: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
  questionBtn: {
    width: 30,
    height: 30,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#404040',
  },
  questionText: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: 'white',
    marginRight: 4,
    marginBottom: 4,
  },
  chipText: {
    fontSize: 12,
    fontFamily: 'Poppins',
    color: '#404040',
  },
});
