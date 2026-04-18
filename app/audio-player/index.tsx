import { forestSessions } from '@/constants/forestSessions';
import { text } from '@/constants/styles';
import Slider from '@react-native-community/slider';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { X, Pause } from 'lucide-react-native';
import PlayIcon from '@/assets/images/icons/PlayIcon';
import { useEffect, useRef, useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

function formatTime(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${sec.toString().padStart(2, '0')}`;
}

export default function AudioPlayer() {
  const router = useRouter();
  const { sessionId } = useLocalSearchParams<{ sessionId: string }>();

  const session = forestSessions.find((s) => s.id === Number(sessionId));

  const soundRef = useRef<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekValue, setSeekValue] = useState(0);

  const controlsOpacity = useSharedValue(0);
  const controlsStyle = useAnimatedStyle(() => ({
    opacity: controlsOpacity.value,
    pointerEvents: controlsOpacity.value === 0 ? 'none' : 'auto',
  }));

  const centerOpacity = useSharedValue(1);
  const centerStyle = useAnimatedStyle(() => ({
    opacity: centerOpacity.value,
    pointerEvents: centerOpacity.value === 0 ? 'none' : 'auto',
  }));

  useEffect(() => {
    if (!session) return;

    Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

    const load = async () => {
      const { sound } = await Audio.Sound.createAsync(
        { uri: session.audioUrl },
        { shouldPlay: false },
        onPlaybackStatusUpdate,
      );
      soundRef.current = sound;
    };

    load();

    return () => {
      soundRef.current?.unloadAsync();
    };
  }, [session?.id]);

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) return;
    if (!isSeeking) setPosition(status.positionMillis);
    if (status.durationMillis) setDuration(status.durationMillis);
    setIsPlaying(status.isPlaying);
    controlsOpacity.value = withTiming(status.isPlaying ? 1 : 0, { duration: 400 });
    centerOpacity.value = withTiming(status.isPlaying ? 0 : 1, { duration: 400 });
  };

  const togglePlay = async () => {
    if (!soundRef.current) return;
    if (isPlaying) {
      await soundRef.current.pauseAsync();
    } else {
      await soundRef.current.playAsync();
    }
  };

  const onSlidingStart = () => {
    setIsSeeking(true);
    setSeekValue(position);
  };

  const onSlidingComplete = async (value: number) => {
    setIsSeeking(false);
    setPosition(value);
    await soundRef.current?.setPositionAsync(value);
  };

  if (!session) return null;

  const sliderValue = isSeeking ? seekValue : position;

  return (
    <ImageBackground source={session.image} style={styles.bg} resizeMode="cover">
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        {/* Close */}
        <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
          <X size={24} color="white" />
        </TouchableOpacity>

        {/* Center */}
        <View style={styles.center}>
          <Animated.View style={[styles.textGroup, centerStyle]}>
            <Text style={[text.title24, styles.title]}>{session.title}</Text>
            <Text style={styles.subtitle}>{session.duration} min</Text>
          </Animated.View>

          <TouchableOpacity
            style={[styles.playBtn, isPlaying && styles.playBtnPlaying]}
            onPress={togglePlay}
            activeOpacity={0.8}
          >
            {isPlaying
              ? <Pause size={18} color="white" fill="white" />
              : <PlayIcon size={18} color="#292929" />
            }
          </TouchableOpacity>
        </View>

        {/* Bottom controls */}
        <Animated.View style={[styles.controls, controlsStyle]}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration || 1}
            value={sliderValue}
            minimumTrackTintColor="#FEF08A"
            maximumTrackTintColor="rgba(255,255,255,0.5)"
            thumbTintColor="#FEF08A"
            onSlidingStart={onSlidingStart}
            onValueChange={setSeekValue}
            onSlidingComplete={onSlidingComplete}
          />
          <View style={styles.times}>
            <Text style={styles.timeText}>{formatTime(sliderValue)}</Text>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>
        </Animated.View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  safe: {
    flex: 1,
  },
  closeBtn: {
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: 'white',
    marginBottom: 12,
  },
  textGroup: {
    alignItems: 'center',
  },
  playBtn: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBtnPlaying: {
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  controls: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  times: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    fontFamily: 'Poppins',
    fontSize: 13,
    color: 'white',
  },
});
