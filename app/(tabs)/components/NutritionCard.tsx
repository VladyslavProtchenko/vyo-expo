import CustomCheckbox from '@/components/ui/CustomCheckbox';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function NutritionCard({
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
        onPress={() => router.push('/products' as any)}
        style={{ padding: 16, borderRadius: 24, flexDirection: 'row', backgroundColor: '#F7F7F7', flex: 1 }}
      >
        <View style={{ flex: 1, marginRight: 6 }}>
          <Text style={{ fontSize: 16, fontFamily: "ArchivoBlack-Regular", fontWeight: "400", marginBottom: 8 }}>Nutrition & Supplements</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {['Iron', 'Omega-3', 'Potassium', 'B vitamins', 'Magnesium'].map((item) => (
              <View key={item} style={{ paddingHorizontal: 8, paddingVertical: 4, borderRadius: 16, backgroundColor: 'white', marginRight: 4, marginBottom: 4 }}>
                <Text style={{ fontSize: 12, fontFamily: "Poppins", color: '#404040' }}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
        <Image 
          source={require('@/assets/images/health.png')} 
          style={{ height: 80, width: 80, borderRadius: 12 }} 
        />
      </TouchableOpacity>
    </View>
  );
}
