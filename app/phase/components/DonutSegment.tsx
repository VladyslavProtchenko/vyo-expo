import React, { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Path } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

type Props = {
  cx: number;
  cy: number;
  radius: number;
  strokeWidth: number;
  color: string;
  // start and end as fractions 0-1, excluding gap
  start: number;
  end: number;
};

export default function DonutSegment({
  cx,
  cy,
  radius,
  strokeWidth,
  color,
  start,
  end,
}: Props) {
  const circumference = 2 * Math.PI * radius;

  // Arc path: full circle, but we control which part is drawn via dasharray/dashoffset
  const d = `
    M ${cx} ${cy - radius}
    A ${radius} ${radius} 0 1 1 ${cx - 0.0001} ${cy - radius}
  `;

  // We rotate the segment to correct start position via transform
  // start and end are fractions of full circle (0 to 1)
  const segmentLength = (end - start) * circumference;

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, {
      duration: 1000,
      easing: Easing.out(Easing.cubic),
    });
  }, []);

  const animatedProps = useAnimatedProps(() => {
    const currentLength = segmentLength * progress.value;
    return {
      strokeDasharray: `${currentLength} ${circumference}`,
      strokeDashoffset: -start * circumference,
    };
  });

  return (
    <AnimatedPath
      d={d}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      fill="none"
      animatedProps={animatedProps}
    />
  );
}
