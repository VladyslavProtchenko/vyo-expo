import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, LayoutChangeEvent, Animated } from 'react-native';
import RNSlider from '@react-native-community/slider';
import LinearGradient from 'react-native-linear-gradient';
import { typography } from '../../../styles/globalStyles';

interface SliderProps {
  value: number;
  onValueChange: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  minLabel?: string;
  maxLabel?: string;
  showValue?: boolean;
  valuePrefix?: string;
  valueSuffix?: string;
}

export default function Slider({
  value,
  onValueChange,
  minimumValue = 0,
  maximumValue = 100,
  step = 1,
  minLabel = 'Light',
  maxLabel = 'Strong',
  showValue = true,
  valuePrefix = '',
  valueSuffix = '',
}: SliderProps) {
  const [sliderWidth, setSliderWidth] = useState(0);
  const animatedPosition = useRef(new Animated.Value(0)).current;
  const animatedScale = useRef(new Animated.Value(1)).current;
  
  // Вычисляем позицию ползунка в процентах
  const percentage = ((value - minimumValue) / (maximumValue - minimumValue)) * 100;
  
  // Вычисляем позицию для индикатора значения (учитываем размер thumb)
  const thumbSize = 50;
  const thumbPosition = (sliderWidth - thumbSize) * (percentage / 100);
  
  // Анимация позиции
  useEffect(() => {
    Animated.spring(animatedPosition, {
      toValue: thumbPosition,
      useNativeDriver: true,
      tension: 80,
      friction: 10,
    }).start();
  }, [thumbPosition]);
  
  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setSliderWidth(width);
  };
  
  const handleValueChangeStart = () => {
    // Увеличиваем размер при начале взаимодействия
    Animated.spring(animatedScale, {
      toValue: 1.2,
      useNativeDriver: true,
      tension: 100,
      friction: 7,
    }).start();
  };
  
  const handleValueChangeEnd = () => {
    // Возвращаем размер обратно
    Animated.spring(animatedScale, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 7,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.sliderWrapper} onLayout={handleLayout}>
        {/* Градиентный фон для слайдера */}
        <View style={styles.gradientContainer}>
          <LinearGradient
            colors={['#A8E063', '#FFEB3B', '#FF9800', '#F44336']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          />
        </View>
        
        {/* Слайдер поверх градиента */}
        <RNSlider
          style={styles.slider}
          value={value}
          onValueChange={onValueChange}
          onSlidingStart={handleValueChangeStart}
          onSlidingComplete={handleValueChangeEnd}
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          step={step}
          minimumTrackTintColor="transparent"
          maximumTrackTintColor="transparent"
          thumbTintColor="transparent"
        />
        
        {/* Кастомный ползунок с значением и анимацией */}
        {showValue && sliderWidth > 0 && (
          <Animated.View 
            style={[
              styles.customThumb,
              {
                transform: [
                  { translateX: animatedPosition },
                  { scale: animatedScale }
                ]
              }
            ]}
          >
            <View style={styles.thumbCircle}>
              <Text style={styles.thumbValue}>
                {valuePrefix}{Math.round(value)}{valueSuffix}
              </Text>
            </View>
          </Animated.View>
        )}
      </View>
      
      {/* Подписи */}
      <View style={styles.labelsContainer}>
        <Text style={[typography.p, styles.label]}>{minLabel}</Text>
        <Text style={[typography.p, styles.label]}>{maxLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 16,
  },
  sliderWrapper: {
    position: 'relative',
    height: 50,
    justifyContent: 'center',
  },
  gradientContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  customThumb: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  thumbCircle: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: '#FEF08A',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 3,
    borderColor: '#F5F5F5',
  },
  thumbValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    opacity: 0.6,
  },
});

