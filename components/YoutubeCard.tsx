import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Play } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { Dimensions, Image, Modal, Pressable, StatusBar, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import YoutubePlayer, { getYoutubeMeta } from "react-native-youtube-iframe";

const { width, height } = Dimensions.get("window");

interface YoutubeCardProps {
  playButtonPosition?: "center" | "bottom-right";
  playButtonSize?: number;
  style?: StyleProp<ViewStyle>;
}

export default function YoutubeCard({ 
  playButtonPosition = "center",
  playButtonSize = 28,
  style,
}: YoutubeCardProps) {
  const [visible, setVisible] = useState(false);
  const [videoTitle, setVideoTitle] = useState<string>("");
  const [videoDuration, setVideoDuration] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const videoId = "cPOK1__NAzE";
  const playerRef = useRef<any>(null);

  // Calculate video dimensions to center it on screen
  const videoWidth = width;
  const videoHeight = (width * 9) / 16; // 16:9 aspect ratio

  // Format duration from seconds to "X min" or "X min Y sec"
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (secs === 0) {
      return `${mins} min`;
    }
    return `${mins} min ${secs} sec`;
  };

  // Fetch video metadata when component mounts
  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const meta = await getYoutubeMeta(videoId);
        setVideoTitle(meta.title);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching video metadata:", error);
        setVideoTitle("Video");
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [videoId]);

  // Get video duration when player is ready
  const handlePlayerReady = async () => {
    try {
      if (playerRef.current) {
        const duration = await playerRef.current.getDuration();
        setVideoDuration(formatDuration(duration));
      }
    } catch (error) {
      console.error("Error getting video duration:", error);
    }
  };

  return (
    <>
      <Pressable
        onPress={() => setVisible(true)}
        style={[
          {
            width: "100%",
            height: 250,
            borderRadius: 20,
            overflow: "hidden",
            position: "relative",
          },
          style,
        ]}
      >
        <Image
          source={{
            uri: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
          }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
        <View
          style={[
            styles.playButtonContainer,
            playButtonPosition === "center"
              ? [styles.playButtonCenter, { transform: [{ translateX: -playButtonSize / 2 }, { translateY: -playButtonSize / 2 }] }]
              : styles.playButtonBottomRight,
          ]}
        >
          <View style={[styles.playButton, { width: playButtonSize, height: playButtonSize, borderRadius: playButtonSize / 2 }]}>
            <Play size={Math.round(playButtonSize * 0.57)} color="#292929" fill="#292929" strokeWidth={2} />
          </View>
        </View>
      </Pressable>

      <Modal
        visible={visible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setVisible(false)}
      >
        <BlurView intensity={20} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <StatusBar hidden />
          
          <View
            style={{
              position: "absolute",
              top: 80,
              left: 20,
              right: 70,
              zIndex: 10,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontFamily: "ArchivoBlack-Regular",
                fontWeight: "400",
                color: "black",
                marginBottom: 4,
              }}
            >
              {loading ? "Loading..." : videoTitle || "Video"}
            </Text>
            {videoDuration ? (
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  color: "black",
                }}
              >
                {videoDuration}
              </Text>
            ) : null}
          </View>

          <TouchableOpacity
            style={{
              position: "absolute",
              top: 50,
              right: 20,
              zIndex: 10,
              padding: 10,
            }}
            onPress={() => setVisible(false)}
          >
            <Ionicons name="close" size={44} color="black" />
          </TouchableOpacity>

          <YoutubePlayer
            ref={playerRef}
            height={videoHeight}
            width={videoWidth}
            play={true}
            videoId={videoId}
            onReady={handlePlayerReady}
            initialPlayerParams={{
              autoplay: true,
              controls: true,
              modestbranding: true,
              rel: false,
            }}
          />
        </BlurView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  playButtonContainer: {
    position: "absolute",
    zIndex: 1,
  },
  playButtonCenter: {
    top: "50%",
    left: "50%",
  },
  playButtonBottomRight: {
    bottom: 16,
    right: 16,
  },
  playButton: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
