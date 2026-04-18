import { ForestSession } from '@/constants/forestSessions';
import PlayIcon from '@/assets/images/icons/PlayIcon';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  session: ForestSession;
};

export default function ForestCard({ session }: Props) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => router.push({ pathname: '/audio-player', params: { sessionId: session.id } } as any)}
    >
      <Image source={session.image} style={styles.image} resizeMode="cover" />
      <View style={styles.overlay} />

      {/* Title + duration — top left */}
      <View style={styles.info}>
        <Text style={styles.title}>{session.title}</Text>
        <Text style={styles.duration}>{session.duration} min</Text>
      </View>

      {/* Play button — bottom left */}
      <View style={styles.playBtn}>
        <PlayIcon size={14} color="#292929" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 150,
    borderRadius: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  info: {
    position: 'absolute',
    top: 12,
    left: 12,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 13,
    color: 'white',
    lineHeight: 18,
  },
  duration: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: 'white',
  },
  playBtn: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
