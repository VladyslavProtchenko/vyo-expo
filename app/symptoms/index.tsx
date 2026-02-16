import PainCard from '@/app/symptoms/components/PainCard';
import SurgeryCaseCard from '@/app/symptoms/components/SurgeryCaseCard';
import ButtonGradient from '@/components/ui/ButtonGradient';
import CustomSwitch from '@/components/ui/CustomSwitch';
import { typography } from '@/constants/typography';
import { useRouter } from 'expo-router';
import { MoveLeft } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const feelingItems = ['😌 Calm', '🧐 Focused', '😞 Down', '😣 Tense', '☺️ Joyful', '🥺 Vulnerable', 'Hard to say'];

const dischargeItems = ['Clear/Watery', 'White/Milky', 'Thick white', 'Yellow or green', 'Thin, grayish', 'Gray with fishy odor'];

const energyItems = ['Enough for daily tasks', 'Inspired to act', 'Slightly exhausted', 'Very exhausted', 'Hard to say'];

export default function SymptomsPage() {
  const router = useRouter();
  const [isPeriod, setIsPeriod] = useState(true);
  const [feeling, setFeeling] = useState<string>('');
  const [discharge, setDischarge] = useState<string>('');
  const [energy, setEnergy] = useState<string>('');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => router.back()} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <MoveLeft size={30} color="black" />
          <Text style={typography.title}>Log period data</Text>
        </Pressable>
        <View style={{ gap: 16, marginBottom: 100 }}>
          <View style={styles.card}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: '600' }}>Period</Text>
              <CustomSwitch value={isPeriod} onValueChange={setIsPeriod} />
            </View>
          </View>
          <PainCard />

          <View style={styles.card}>
            <Text style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: '600' }}>I am feeling today:</Text>
            <View style={styles.tagsContainer}>
              {feelingItems.map((item) => {
                const isActive = feeling === item;
                return (
                  <Pressable key={item} onPress={() => setFeeling(item)}>
                    <Text style={[typography.p, styles.tag, isActive ? styles.tagActive : styles.tagInactive]}>{item}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.card}>
            <Text style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: '600' }}>Vaginal discharge:</Text>
            <View style={styles.tagsContainer}>
              {dischargeItems.map((item) => {
                const isActive = discharge === item;
                return (
                  <Pressable key={item} onPress={() => setDischarge(item)}>
                    <Text style={[typography.p, styles.tag, isActive ? styles.tagActive : styles.tagInactive]}>{item}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.card}>
            <Text style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: '600' }}>I have energy today:</Text>
            <View style={styles.tagsContainer}>
              {energyItems.map((item) => {
                const isActive = energy === item;
                return (
                  <Pressable key={item} onPress={() => setEnergy(item)}>
                    <Text style={[typography.p, styles.tag, isActive ? styles.tagActive : styles.tagInactive]}>{item}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
          <SurgeryCaseCard />
          <ButtonGradient className={{ marginTop: 16 }} title="Save" onPress={() => router.push('/symptoms-success' as any)} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  card: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'white',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingVertical: 12,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 24,
    borderColor: '#E7E8ED',
  },
  tagActive: {
    backgroundColor: '#FEF08A',
  },
  tagInactive: {
    backgroundColor: 'transparent',
  },
});
