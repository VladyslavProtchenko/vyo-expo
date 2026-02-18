import CustomCheckbox from '@/components/ui/CustomCheckbox';
import YoutubeCard from '@/components/YoutubeCard';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function StressCard({
  checked,
  onPress,
}: {
  checked: boolean;
  onPress: () => void;
}) {
  const router = useRouter();
  
  return (
    <View style={{ flexDirection: 'row' }}>
      <CustomCheckbox 
        style={{ marginTop: 14, marginRight: 4 }}
        checked={checked}
        onPress={onPress}
      />
      <TouchableOpacity 
        onPress={() => router.push('/stress-management' as any)}
        style={{ padding: 16, borderRadius: 24, flexDirection: 'row', backgroundColor: '#F7F7F7', flex: 1 }}
      >
        <View style={{ flex: 1, marginRight: 12 }}>
          <Text style={{ fontSize: 16, fontFamily: "ArchivoBlack-Regular", marginBottom: 8 }}>Stress Management</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {['Breathing practice'].map((item) => (
              <View key={item} style={{ paddingHorizontal: 8, paddingVertical: 4, borderRadius: 16, backgroundColor: 'white', marginRight: 4, marginBottom: 4 }}>
                <Text style={{ fontSize: 12, fontFamily: "Poppins", color: '#404040' }}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
        <YoutubeCard
          playButtonPosition="center"
          playButtonSize={28}
          style={{
            width: 80,
            height: 80,
            borderRadius: 12,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

