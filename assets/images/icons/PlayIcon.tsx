import Svg, { Path, Defs, ClipPath, Rect, G } from 'react-native-svg';

type Props = {
  size?: number;
  color?: string;
};

export default function PlayIcon({ size = 18, color = '#292929' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <G clipPath="url(#clip)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.5 11.5988C18.4998 10.4441 18.4998 7.55825 16.5 6.40351L7.5 1.20722C5.50004 0.0525437 3.0001 1.49556 3 3.80488V14.1975C3.0001 16.5068 5.50004 17.9498 7.5 16.7951L16.5 11.5988Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip">
          <Rect width={18} height={18} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
