import React, { useRef, useState, useEffect } from 'react';
import {
  FlatList,
  Text,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

const ITEM_HEIGHT = 50;

interface WheelPickerProps {
  items: number[];
  value: number;
  onChange: (value: number) => void;
  height?: number;
  label?: string;
}

export default function WheelPicker({
  items,
  value,
  onChange,
  height = ITEM_HEIGHT * 5,
  label = '',
}: WheelPickerProps) {
  const indexFromValue = items.findIndex((item) => item === value);
  const [selectedIndex, setSelectedIndex] = useState(indexFromValue >= 0 ? indexFromValue : 0);
  const flatListRef = useRef<FlatList>(null);

  // Ставим флаг, чтобы скроллить только один раз при маунте
  const didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current) {
      // Скроллим к стартовому индексу после маунта
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: selectedIndex,
          animated: false,
          viewPosition: 0.5,
        });
      }, 0);
      didMount.current = true;
    }
  }, [selectedIndex]);

  // Clamp function
  const clamp = (num: number, min: number, max: number) => Math.max(min, Math.min(num, max));

  // When scroll ends, update selection
  const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    let offsetY = event.nativeEvent.contentOffset.y;
    let index = Math.round(offsetY / ITEM_HEIGHT);
    index = clamp(index, 0, items.length - 1);
    setSelectedIndex(index);

    // Only call onChange if value is different
    if (items[index] !== value) {
      onChange(items[index]);
    }
  };

  return (
    <View style={{ height, justifyContent: 'center', alignItems: 'center' }}>
      {/* Selection indicator */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: (height - ITEM_HEIGHT) / 2,
          height: ITEM_HEIGHT,
          width: '100%',
          backgroundColor: '#f6f6f6',
        }}
      />

      <FlatList
        ref={flatListRef}
        data={items}
        keyExtractor={(item) => item.toString()}
        initialScrollIndex={selectedIndex}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        renderItem={({ item, index }) => {
          const isSelected = index === selectedIndex;
          return (
            <View
              style={{
                height: ITEM_HEIGHT,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: isSelected ? '#000' : '#999',
                  fontWeight: isSelected ? 'bold' : 'normal',
                }}
              >
                {item} {label}
              </Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onMomentumScrollEnd={onScrollEnd}
        contentContainerStyle={{
          paddingVertical: (height - ITEM_HEIGHT) / 2,
        }}
      />
    </View>
  );
}
