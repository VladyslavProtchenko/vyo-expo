import React from 'react';
import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import { CurrentPhaseInfo } from '@/store/phase';

const PHASES = ['Period', 'Follicular', 'Ovulation', 'Luteal'];

const PHASE_LEFT: Record<string, string> = {
  menstrual: '12%',
  follicular: '35%',
  ovulation: '58%',
  luteal: '82%',
};

export default function ChartsBackground() {
  const { phaseName } = CurrentPhaseInfo();
  const leftPercent = PHASE_LEFT[phaseName] ?? PHASE_LEFT.menstrual;

  return (
    <View style={styles.container} pointerEvents="none">
      <View style={[styles.indicatorWrap, { left: leftPercent } as ViewStyle]}>
        <View style={styles.indicatorBlock}>
          <Text style={styles.indicatorText}>You are here</Text>
        </View>
        <Svg style={styles.indicatorStick} width={2} height={54}>
          <Line
            x1={1}
            y1={0}
            x2={1}
            y2={54}
            stroke="rgba(0, 0, 0, 0.25)"
            strokeWidth={1.5}
            strokeDasharray="4 4"
          />
        </Svg>
      </View>
      <View style={styles.chartWrap}>
        <Image
          source={require('@/assets/images/phases/chart.webp')}
          style={styles.chart}
          resizeMode="cover"
        />
      </View>
      <View style={styles.phasesRow}>
        {PHASES.map((name) => (
          <Text key={name} style={styles.phaseLabel}>
            {name}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
  indicatorWrap: {
    position: 'absolute',
    top: 0,
    marginLeft: -45,
    zIndex: 1,
    alignItems: 'center',
  },
  indicatorBlock: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FCFF67',
    borderRadius: 24,
    borderWidth: 0.5,
    borderColor: '#000',
  },
  indicatorText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2D2D2D',
    fontFamily: 'Poppins',
  },
  indicatorStick: {
    width: 2,
    height: 54,
  },
  chartWrap: {
    width: '100%',
    height: 100,
    overflow: 'hidden',
  },
  chart: {
    width: '100%',
    height: '100%',
  },
  phasesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 8,
  },
  phaseLabel: {
    textAlign: 'center',
    fontSize: 12,
    color: '#4D4D4D',
  },
});
