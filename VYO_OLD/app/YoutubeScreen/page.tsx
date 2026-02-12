import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Props } from '../_types/props';
import { Play, Pause, Heart, SkipForward } from 'lucide-react-native';
import React, { useState, useCallback } from 'react'
import { WebView } from 'react-native-webview';

export default function YoutubeScreen({ route }: Props<'YoutubeScreen'>) {
  const { videoUrl, title } = route.params || {};

  const [playing, setPlaying] = useState(false);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);



    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{title || 'Relax Yoga Flow'}</Text>
        <Text style={styles.time}>25 min</Text>

        <View style={styles.embedBox}>
          <WebView
            source={{ uri: 'https://www.youtube.com/embed/Rh1QwKJzBh4' }}
            allowsInlineMediaPlayback
            mediaPlaybackRequiresUserAction={false}
            javaScriptEnabled
            domStorageEnabled
          />
        </View>

       
        <View style={styles.bottons}>
          <TouchableOpacity 
            activeOpacity={0.7}
          >
            <SkipForward fill="transparent" strokeWidth={2} /> 
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={togglePlaying}
            activeOpacity={0.7}
            style={styles.playButton}
          >
            {!playing ? (
              <Play size={24} color="white" fill="transparent" strokeWidth={2} />
            ) : (
              <Pause size={24} color="white" fill="transparent" strokeWidth={1} />
            )}
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={togglePlaying}
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
  embedBox: {
    width: '100%',
    height: 180,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  videoContainer: {
    width: '100%',
    height: 300,
  },
  webviewBox: {
    width: '100%',
    height: 180,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});