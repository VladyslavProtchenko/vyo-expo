import YoutubeCard from '@/components/YoutubeCard';
import { ScrollView, Text, View } from 'react-native';

export default function RecommendedVideos() {
  return (
    <>
      <Text style={{ fontFamily: 'ArchivoBlack-Regular', fontSize: 24, marginBottom: 12, marginTop: 24 }}>
      Recommended body care for today
      </Text>

      <View style={{ height: 130}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {Array.from({ length: 13 }).map((_, index) => (
            <YoutubeCard
              key={index}
              playButtonPosition="center"
              playButtonSize={28}
              style={{
                width: 130,
                height: 130,
                marginRight: index < 12 ? 12 : 0,
              }}
            />
          ))}
        </ScrollView>
      </View>
    </>
  );
}
