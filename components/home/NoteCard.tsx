import useStates from '@/store/useStates';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import weekday from 'dayjs/plugin/weekday';
import { Dimensions, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

dayjs.extend(weekday);
dayjs.locale('en-gb');

const { width: screenWidth } = Dimensions.get('window');

export default function NoteCard({ children, backgroundColor = "#FFEFEF" }: { children: React.ReactNode; backgroundColor?: string }) {
  const { selectedDate } = useStates();
  
  const activeDate = selectedDate || dayjs();
  
  const currentDayOfWeek = activeDate.weekday() + 1;
  const cardWidth = screenWidth - 32;
  const segmentWidth = cardWidth / 7;
  const curveDepth = 24;
  const curveWidth = 72;
  const cornerRadius = 18;
  
  const curveCenter = (currentDayOfWeek - 0.5) * segmentWidth;

  const createCurvePath = () => {
    const curveStart = curveCenter - curveWidth / 2;
    const curveEnd = curveCenter + curveWidth / 2;
    
    return `
      M 0 0
      L ${curveStart - cornerRadius} 0
      Q ${curveStart} 0 ${curveStart + cornerRadius * 0.5} ${cornerRadius * 0.3}
      Q ${curveCenter} ${curveDepth} ${curveEnd - cornerRadius * 0.5} ${cornerRadius * 0.3}
      Q ${curveEnd} 0 ${curveEnd + cornerRadius} 0
      L ${cardWidth} 0
      L ${cardWidth} 300
      L 0 300
      Z
    `;
  };

  return (
    <View style={styles.noteCardContainer}>
      <Svg 
        height={300} 
        width={cardWidth}
        style={styles.svgBackground}
      >
        <Path
          d={createCurvePath()}
          fill={backgroundColor}
        />
      </Svg>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  noteCardContainer: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 18,
  },
  svgBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
