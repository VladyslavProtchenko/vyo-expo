import React, { useState, useRef } from 'react'
import Video from "react-native-video";
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Play, Pause, Heart, SkipForward } from 'lucide-react-native';

export default function VideoPlayer({ videoUrl, title }: { videoUrl: string, title: string }) {
  const videoRef = useRef<any>(null);
  const [paused, setPaused] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  const togglePlayPause = () => {
    if (isEnded) {
      videoRef.current?.seek(0);
      setIsEnded(false);
      setPaused(false);
    } else {
      setPaused(!paused);
    }
  };

  const handleEnd = () => {
    setIsEnded(true);
    setPaused(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title || 'Relax Yoga Flow'}</Text>
      <Text style={styles.time}>25 min</Text>
        <View style={styles.videoContainer}>
          <Video
            ref={videoRef}
            source={{
              uri: videoUrl,
            }}
            style={styles.video}
            controls={true}
            paused={paused}
            resizeMode="contain"
            onEnd={handleEnd}
          /> 
        </View>
       <View style={styles.bottons}>
       <TouchableOpacity 
          onPress={togglePlayPause}
          activeOpacity={0.7}
        >
          <SkipForward fill="transparent" strokeWidth={2} /> 
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={togglePlayPause}
          activeOpacity={0.7}
          style={styles.playButton}
        >
          {paused || isEnded ? (
            <Play size={24} color="white" fill="transparent" strokeWidth={2} />
          ) : (
            <Pause size={24} color="white" fill="transparent" strokeWidth={1} />
          )}
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={togglePlayPause}
          activeOpacity={0.7}
        >
          <Heart color="#050505" fill="transparent" strokeWidth={2} />
        </TouchableOpacity>
       </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  bottons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 220,
    alignSelf: 'center',
    marginTop: 10,
  },
  videoContainer: {
    flex: 1,
    minHeight: 0,
    borderRadius: 16,
    overflow: 'hidden',
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'ArchivoBlack',
    marginBottom: 4,
  },
  time: {
    fontSize: 16,
    fontFamily: 'Poppins',
    marginBottom: 20,
  },

});