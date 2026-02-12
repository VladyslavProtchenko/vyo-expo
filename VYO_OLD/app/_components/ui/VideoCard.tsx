import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle, Platform } from 'react-native'
import Video from 'react-native-video'
import { Play } from 'lucide-react-native'
import LinearGradient from 'react-native-linear-gradient'

interface VideoCardProps {
  videoUrl?: string  // URL для сетевого видео
  videoSource?: any   // require() для локального видео
  title: string
  style?: StyleProp<ViewStyle>
}

export default function VideoCard({ videoUrl, videoSource, title, style }: VideoCardProps) {
  const [paused, setPaused] = useState(true)
  const [duration, setDuration] = useState<number>(0)
  const [muted, setMuted] = useState(true)
  const videoRef = useRef<any>(null)

  const handlePress = () => {
    videoRef.current?.presentFullscreenPlayer()
  }

  const formatTime = (seconds: number): string => {
    if (!seconds || isNaN(seconds)) return '0 s'
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)
    
    const parts: string[] = []
    if (hours > 0) {
      parts.push(`${hours} h`)
    }
    if (mins > 0) {
      parts.push(`${mins} min`)
    }
    if (secs > 0 || parts.length === 0) {
      parts.push(`${secs} s`)
    }
    
    return parts.join(' ')
  }

  // Определяем source для видео
  // Для локальных видео через require() нужно использовать напрямую объект
  // Для WebM на iOS может не работать, лучше использовать MP4
  let videoSourceProp: any = null;
  
  if (videoSource) {
    // Локальное видео через require()
    videoSourceProp = videoSource;
  } else if (videoUrl) {
    // Сетевое видео через URL
    videoSourceProp = { uri: videoUrl };
  }

  const videoTime = formatTime(duration)
  
  // Если нет источника, показываем placeholder
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
    )
  }
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <Video
        ref={videoRef}
        source={videoSourceProp}
        style={styles.video}
        paused={paused}
        resizeMode="cover"
        muted={muted}
        controls={false}
        playInBackground={false}
        playWhenInactive={false}
        fullscreen={false}
        posterResizeMode="cover"
        ignoreSilentSwitch="ignore"
        mixWithOthers="mix"
        onLoad={(data) => {
          setDuration(data.duration)
        }}
        onError={(error) => {
          console.error('❌ Video error:', error)
          console.error('Video source:', videoSourceProp)
        }}
        onFullscreenPlayerWillPresent={() => {
          setPaused(false)
          setMuted(false)
        }}
        onFullscreenPlayerWillDismiss={() => {
          setPaused(true)
          setMuted(true)
          videoRef.current?.seek(0)
        }}
      />
      <View style={styles.overlay}>
        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.7)']}
          locations={[0, 0.5, 1]}
          style={styles.gradient}
        />
        <View style={styles.overlayContent}>
          <View style={{}}>
            <Text 
              style={{fontFamily: 'Poppins', fontSize: 16, fontWeight: '600', color: 'white'}}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {title}
            </Text>
            <Text style={{fontFamily: 'Poppins', fontSize: 12, fontWeight: '400', color: 'white'}}>{videoTime}</Text>
          </View>
          <View style={styles.playButton}>
            <Play size={16} color="#292929" fill="#292929" strokeWidth={2} />
          </View>
        </View>
      </View>

    </TouchableOpacity>
  )
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

})