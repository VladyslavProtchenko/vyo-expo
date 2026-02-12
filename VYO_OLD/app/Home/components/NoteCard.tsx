import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import 'dayjs/locale/en-gb';
import useStates from "../../_store/useStates";

dayjs.extend(weekday);
dayjs.locale('en-gb');

const { width: screenWidth } = Dimensions.get('window');

export default function NoteCard({children, backgroundColor = "#FFEFEF"}: {children: React.ReactNode, backgroundColor?: string}) {
  const { selectedDate } = useStates();
  
  const activeDate = selectedDate || dayjs();
  
  // weekday() для британской локали: 0 = Понедельник, 6 = Воскресенье
  const currentDayOfWeek = activeDate.weekday() + 1; // 1-7, где 1 = Понедельник
  const cardWidth = screenWidth - 32; // Учитываем padding страницы
  const segmentWidth = cardWidth / 7; // Ширина одного сегмента (1/7 часть)
  const curveDepth = 24; // Глубина вмятины
  const curveWidth = 72; // Ширина вмятины
  const cornerRadius = 18; // Радиус скругления внешних краев
  
  const curveCenter = (currentDayOfWeek - 0.5) * segmentWidth;

  // Создаем SVG path для вмятины со скругленными внешними краями
  const createCurvePath = () => {
    const curveStart = curveCenter - curveWidth / 2;
    const curveEnd = curveCenter + curveWidth / 2;
    
    // Создаем плавную кривую вниз с кубической кривой Безье для более плавной формы
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
      {/* SVG для создания вмятины */}
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
