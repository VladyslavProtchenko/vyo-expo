import { LinearGradient } from 'expo-linear-gradient';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Play } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

interface VideoCardProps {
  videoUrl?: string;
  videoSource?: any;
  title: string;
  style?: StyleProp<ViewStyle>;
}

export default function VideoCard({ videoUrl, videoSource, title, style }: VideoCardProps) {
  const [duration, setDuration] = useState<number>(0);
  const videoRef = useRef<any>(null);

  let videoSourceProp: string | number | null = null;
  
  if (videoSource) {
    videoSourceProp = videoSource;
  } else if (videoUrl) {
    videoSourceProp = videoUrl;
  }

  const player = useVideoPlayer(videoSourceProp || '', (player) => {
    player.pause();
    player.muted = true;
    
    // Get duration when loaded
    if (player.duration) {
      setDuration(player.duration * 1000); // Convert to milliseconds
    }
  });

  const handlePress = () => {
    if (player) {
      player.muted = false;
    }
    if (videoRef.current) {
      videoRef.current.enterFullscreen();
    }
  };

  const formatTime = (milliseconds: number): string => {
    if (!milliseconds || isNaN(milliseconds)) return '0 s';
    const seconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    const parts: string[] = [];
    if (hours > 0) {
      parts.push(`${hours} h`);
    }
    if (mins > 0) {
      parts.push(`${mins} min`);
    }
    if (secs > 0 || parts.length === 0) {
      parts.push(`${secs} s`);
    }
    
    return parts.join(' ');
  };

  const videoTime = formatTime(duration);
  
  if (!videoSourceProp) {
    return (
      <TouchableOpacity
        style={[styles.container, style]}
        activeOpacity={0.9}
      >
        <View style={[styles.video, { backgroundColor: '#E5E5E5', justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ color: '#999', fontFamily: 'Poppins' }}>No video</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <VideoView
        ref={videoRef}
        player={player}
        style={styles.video}
        contentFit="cover"
        nativeControls={true}
        // allowsFullscreen={true}
        allowsPictureInPicture={false}
      />
      <View style={styles.overlay}>
        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.7)']}
          locations={[0, 0.5, 1]}
          style={styles.gradient}
        />
        <View style={styles.overlayContent}>
          <View>
            <Text 
              style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: '600', color: 'white' }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {title}
            </Text>
            <Text style={{ fontFamily: 'Poppins', fontSize: 12, fontWeight: '400', color: 'white' }}>{videoTime}</Text>
          </View>
          <View style={styles.playButton}>
            <Play size={16} color="#292929" fill="#292929" strokeWidth={2} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  overlayContent: {
    position: 'absolute',
    padding: 16,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  playButton: {
    width: 28,
    height: 28,
    borderRadius: 28,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 'auto',
  },
});
