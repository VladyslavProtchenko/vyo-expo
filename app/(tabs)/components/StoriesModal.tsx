import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { cancelAnimation, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const SLIDE_DURATION = 5000;

export type Story = {
  id: number;
  render: () => React.ReactNode;
  button?: {
    label: string;
    onPress: () => void;
  };
  // Renders after tapAreas so it captures touches (use for interactive bottom content)
  bottomContent?: React.ReactNode;
};

function ProgressBar({ active, passed, paused }: { active: boolean; passed: boolean; paused: boolean }) {
  const progress = useSharedValue(passed ? 1 : 0);
  const remainingRef = useRef(SLIDE_DURATION);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (active) {
      progress.value = 0;
      remainingRef.current = SLIDE_DURATION;
      startTimeRef.current = Date.now();
      progress.value = withTiming(1, { duration: SLIDE_DURATION });
    } else {
      cancelAnimation(progress);
      progress.value = passed ? 1 : 0;
      remainingRef.current = SLIDE_DURATION;
    }
  }, [active, passed]);

  useEffect(() => {
    if (!active) return;
    if (paused) {
      cancelAnimation(progress);
      if (startTimeRef.current !== null) {
        const elapsed = Date.now() - startTimeRef.current;
        remainingRef.current = Math.max(0, remainingRef.current - elapsed);
        startTimeRef.current = null;
      }
    } else {
      startTimeRef.current = Date.now();
      progress.value = withTiming(1, { duration: remainingRef.current });
    }
  }, [paused, active]);

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
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const remainingRef = useRef(SLIDE_DURATION);
  const startTimeRef = useRef<number | null>(null);
  const pausedRef = useRef(false);

  const next = useCallback(() => {
    if (index < stories.length - 1) setIndex((i) => i + 1);
    else onClose();
  }, [index, stories.length, onClose]);

  const prev = () => {
    if (index > 0) setIndex((i) => i - 1);
  };

  const isLongPressRef = useRef(false);
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pauseSlide = () => {
    pausedRef.current = true;
    setPaused(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (startTimeRef.current !== null) {
      const elapsed = Date.now() - startTimeRef.current;
      remainingRef.current = Math.max(0, remainingRef.current - elapsed);
      startTimeRef.current = null;
    }
  };

  const resumeSlide = () => {
    pausedRef.current = false;
    setPaused(false);
    startTimeRef.current = Date.now();
    timerRef.current = setTimeout(next, remainingRef.current);
  };

  const handlePressIn = () => {
    isLongPressRef.current = false;
    longPressTimerRef.current = setTimeout(() => {
      isLongPressRef.current = true;
      pauseSlide();
    }, 200);
  };

  const handleLeftPressOut = () => {
    if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
    if (isLongPressRef.current) {
      resumeSlide();
    } else {
      prev();
    }
  };

  const handleRightPressOut = () => {
    if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
    if (isLongPressRef.current) {
      resumeSlide();
    } else {
      next();
    }
  };

  useEffect(() => {
    if (!visible) return;
    pausedRef.current = false;
    remainingRef.current = SLIDE_DURATION;
    startTimeRef.current = Date.now();
    timerRef.current = setTimeout(next, SLIDE_DURATION);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [index, visible, next]);

  useEffect(() => {
    if (visible) { setIndex(0); setPaused(false); }
  }, [visible]);

  const current = stories[index];

  if (!current) return null;

  return (
    <Modal visible={visible} animationType="fade" statusBarTranslucent>
      <View style={styles.container}>

        {/* Content — fills full screen */}
        <View style={styles.content}>
          {current.render()}
        </View>

        {/* Tap areas */}
        <View style={styles.tapAreas} pointerEvents="box-none">
          <Pressable
            style={styles.tapArea}
            onPressIn={handlePressIn}
            onPressOut={handleLeftPressOut}
          />
          <Pressable
            style={styles.tapArea}
            onPressIn={handlePressIn}
            onPressOut={handleRightPressOut}
          />
        </View>

        {/* Progress bars — overlaid on top */}
        <View style={styles.progressContainer} pointerEvents="none">
          {stories.map((s, i) => (
            <ProgressBar key={s.id} active={i === index} passed={i < index} paused={paused} />
          ))}
        </View>

        {/* Close */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>

        {/* Optional button */}
        {current.button && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={current.button.onPress}>
              <Text style={styles.buttonText}>{current.button.label}</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Bottom interactive content — rendered after tapAreas so it captures touches */}
        {current.bottomContent && (
          <View style={styles.bottomContent}>
            {current.bottomContent}
          </View>
        )}

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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
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
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 48,
    zIndex: 10,
  },
  bottomContent: {
    position: 'absolute',
    bottom: 40,
    left: 16,
    right: 16,
    zIndex: 15,
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
