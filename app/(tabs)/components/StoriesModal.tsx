import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const SLIDE_DURATION = 5000;

export type Story = {
  id: number;
  render: () => React.ReactNode;
  button?: {
    label: string;
    onPress: () => void;
  };
};

function ProgressBar({ active, passed }: { active: boolean; passed: boolean }) {
  const progress = useSharedValue(passed ? 1 : 0);

  useEffect(() => {
    if (active) {
      progress.value = 0;
      progress.value = withTiming(1, { duration: SLIDE_DURATION });
    } else {
      progress.value = passed ? 1 : 0;
    }
  }, [active, passed]);

  const animStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <View style={styles.progressTrack}>
      <Animated.View style={[styles.progressFill, animStyle]} />
    </View>
  );
}

export default function StoriesModal({
  stories,
  visible,
  onClose,
}: {
  stories: Story[];
  visible: boolean;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const next = useCallback(() => {
    if (index < stories.length - 1) setIndex((i) => i + 1);
    else onClose();
  }, [index, stories.length, onClose]);

  const prev = () => {
    if (index > 0) setIndex((i) => i - 1);
  };

  useEffect(() => {
    if (!visible) return;
    timerRef.current = setTimeout(next, SLIDE_DURATION);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [index, visible, next]);

  useEffect(() => {
    if (visible) setIndex(0);
  }, [visible]);

  const current = stories[index];

  return (
    <Modal visible={visible} animationType="fade" statusBarTranslucent>
      <View style={styles.container}>

        {/* Progress bars */}
        <View style={styles.progressContainer}>
          {stories.map((s, i) => (
            <ProgressBar key={s.id} active={i === index} passed={i < index} />
          ))}
        </View>

        {/* Close */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>

        {/* Content */}
        <View style={styles.content}>
          {current.render()}
        </View>

        {/* Optional button */}
        {current.button && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={current.button.onPress}>
              <Text style={styles.buttonText}>{current.button.label}</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Tap areas — behind button */}
        <View style={styles.tapAreas} pointerEvents="box-none">
          <Pressable style={styles.tapArea} onPress={prev} />
          <Pressable style={styles.tapArea} onPress={next} />
        </View>

      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  progressContainer: {
    flexDirection: 'row',
    gap: 4,
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 12,
    zIndex: 10,
  },
  progressTrack: {
    flex: 1,
    height: 3,
    backgroundColor: '#3F775C',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  closeButton: {
    position: 'absolute',
    top: 75,
    right: 16,
    zIndex: 20,
    padding: 8,
  },
  closeText: {
    fontSize: 24,
    color: '#000',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 48,
    zIndex: 10,
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 32,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
  },
  tapAreas: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
  },
  tapArea: {
    flex: 1,
  },
});
