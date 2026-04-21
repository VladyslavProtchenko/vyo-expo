import Svg, { Path } from 'react-native-svg';

type Props = { color: string; size?: number };

export default function PhaseIcon({ color, size = 16 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M0 8C0 3.58172 3.58172 0 8 0H16V8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8Z"
        fill={color}
      />
    </Svg>
  );
}
