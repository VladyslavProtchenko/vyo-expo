import React from "react";
import { StyleSheet, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

interface YouTubeVideoProps {
  videoId?: string;
}

export default function YouTubeVideo({ videoId = "JuMqIakY8mI" }: YouTubeVideoProps) {

  return (
    <View style={styles.container}>
      <YoutubePlayer
        height={220}
        width={200}
        play={true}
        videoId={videoId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20,
  },
});