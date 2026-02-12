import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Props } from '../_types/props';
import React, { useState, useRef } from 'react'
import Video from "react-native-video";
import { Play, Pause, Heart, SkipForward } from 'lucide-react-native';


export default function VideoScreen({ route }: Props<'VideoScreen'>) {
  const { videoUrl, title } = route.params || {};
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

  const defaultVideoUrl = videoUrl || "https://www.w3schools.com/html/mov_bbb.mp4";


    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{title || 'Relax Yoga Flow'}</Text>
        <Text style={styles.time}>25 min</Text>
        <View style={styles.videoContainer}>
          <Video
            ref={videoRef}
            source={{
              uri: defaultVideoUrl,
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
      </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Archivo Black',
    marginBottom: 4,
  },
  time: {
    fontSize: 16,
    fontFamily: 'Poppins',
    marginBottom: 20,
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


});