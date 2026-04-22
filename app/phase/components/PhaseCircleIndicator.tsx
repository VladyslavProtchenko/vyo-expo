import { colors } from '@/constants/typography';
import { CurrentPhaseInfo, PHASES } from '@/store/phase';
import useUserStore from '@/store/useUserStore';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import Svg, { Circle } from 'react-native-svg';
import DonutSegment from './DonutSegment';

const PHASE_COLORS = {
  menstrual: colors.menstrual,
  follicular: colors.follicular,
  ovulation: colors.ovulation,
  luteal: colors.luteal,
};

const SIZE = 160;
const STROKE_WIDTH = 16;
const GAP = 0.04; // same as in the example — gap as fraction of full circle (0-1)

export default function PhaseCircleIndicator() {
  const { phaseName, dayOfPhase, phases } = CurrentPhaseInfo();
  const { cycleDuration } = useUserStore();
  const finalCycleDuration = cycleDuration || 28;

  const radius = (SIZE - STROKE_WIDTH) / 2;
  const center = SIZE / 2;

  // Calculate decimals (0-1 fractions) for each phase, same logic as DonutChart example
  const totalGap = GAP * phases.length;
  const available = 1 - totalGap;

  let accumulated = 0;
  const segments = phases.map((phase) => {
    const phaseLength = phase.end - phase.start + 1;
    const decimal = phaseLength / finalCycleDuration;
    const segmentFraction = decimal * available;

    const start = accumulated + GAP / 2;
    const end = start + segmentFraction;

    accumulated = end + GAP / 2;

    return {
      ...phase,
      start,
      end,
      phaseLength,
    };
  });

  const polarToCartesian = (fraction: number) => {
    // fraction 0-1, start from top (-90deg)
    const angle = fraction * 2 * Math.PI - Math.PI / 2;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  const getDotPosition = () => {
    const segment = segments.find((s) => s.name === phaseName);
    if (!segment) return null;

    const progress =
      segment.phaseLength > 1 ? (dayOfPhase - 1) / (segment.phaseLength - 1) : 0;

    const fraction = segment.start + (segment.end - segment.start) * progress;
    return polarToCartesian(fraction);
  };

  const dot = getDotPosition();

  return (
    <View style={styles.container}>
      <Svg width={SIZE} height={SIZE} style={styles.svg}>
        {segments.map((segment) => (
          <DonutSegment
            key={segment.name}
            cx={center}
            cy={center}
            radius={radius}
            strokeWidth={STROKE_WIDTH}
            color={PHASE_COLORS[segment.name as keyof typeof PHASE_COLORS]}
            start={segment.start}
            end={segment.end}
          />
        ))}

        {dot && (
          <Circle
            cx={dot.x}
            cy={dot.y}
            r={6}
            fill="white"
          />
        )}
      </Svg>

      <View style={styles.centerContent}>

        <Text style={styles.phaseLabel}>
          {PHASES[phaseName].label}
        </Text>

        <View style={styles.dayContainer}>
          <Image
            source={{ uri: PHASES[phaseName].icon }}
            style={styles.phaseIconSmall}
          />
          <Text style={styles.dayText}>
            Day {dayOfPhase}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    position: 'absolute',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  phaseIcon: {
    width: 24,
    height: 24,
    marginBottom: 8,
  },
  phaseLabel: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 19.6,
    letterSpacing: -0.17,
    color: '#404040',
    marginBottom: 8,
  },
  dayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  phaseIconSmall: {
    width: 16,
    height: 16,
  },
  dayText: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19.2,
    letterSpacing: -0.17,
    color: '#404040',
  },
});
