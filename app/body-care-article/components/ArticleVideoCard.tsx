import { Play } from 'lucide-react-native';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

interface ArticleVideoCardProps {
  videoId: string;
}

export default function ArticleVideoCard({ videoId }: ArticleVideoCardProps) {
  const [playing, setPlaying] = useState(false);

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <View style={styles.card}>
      {playing ? (
        <YoutubePlayer
          height={220}
          play
          videoId={videoId}
          onChangeState={(state: string) => {
            if (state === 'ended') setPlaying(false);
          }}
        />
      ) : (
        <Pressable style={StyleSheet.absoluteFill} onPress={() => setPlaying(true)}>
          <Image source={{ uri: thumbnailUrl }} style={styles.thumbnail} resizeMode="cover" />
          <View style={styles.playBtn}>
            <Play size={28} color="white" fill="white" strokeWidth={0} />
          </View>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  playBtn: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -32 }, { translateY: -32 }],
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#000000CC',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
