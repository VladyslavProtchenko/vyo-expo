import { useUpdateUnitSystem } from '@/hooks/useUpdateUnitSystem';
import useUserStore from '@/store/useUserStore';
import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AppSettings() {
  const router = useRouter();
  const { unitSystem } = useUserStore();
  const { updateUnitSystem } = useUpdateUnitSystem();

  const handleUnitChange = (unit: 'metric' | 'imperial') => {
    updateUnitSystem(unit);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={styles.header} onPress={() => router.back()}
          activeOpacity={0.7}>
          <FontAwesome6 name="arrow-left-long" size={24} color="black" />
        <Text style={styles.title}>App settings</Text>
      </TouchableOpacity>

      <View style={styles.menuContainer}>
        {/* Measurement units card */}
        <View style={styles.menuCard}>
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>Measurement units</Text>
            <View style={styles.segmentedControl}>
              <Pressable
                style={[styles.segment, unitSystem === 'metric' && styles.segmentActive]}
                onPress={() => handleUnitChange('metric')}
              >
                <Text style={[styles.segmentText, unitSystem === 'metric' && styles.segmentTextActive]}>
                  kg/cm
                </Text>
              </Pressable>
              <Pressable
                style={[styles.segment, unitSystem === 'imperial' && styles.segmentActive]}
                onPress={() => handleUnitChange('imperial')}
              >
                <Text style={[styles.segmentText, unitSystem === 'imperial' && styles.segmentTextActive]}>
                  lb/ft
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Apple Health card */}
        <View style={styles.menuCard}>
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>Apple Health</Text>
            <Text style={styles.comingSoonText}>Coming soon</Text>
            {/* <TouchableOpacity
              style={styles.connectButton}
              onPress={handleAppleHealthConnect}
              activeOpacity={0.7}
            >
              <Text style={styles.connectButtonText}>Connect</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
  },
  header: {
    gap: 16,
    marginTop: 100,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins',
    fontWeight: '600',
    lineHeight: 28.8, // 120% of 24px
    color: '#000',
  },
  menuContainer: {
    marginBottom: 16,
    gap: 8,
  },
  menuCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 8,
    shadowColor: '#000',
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 50,
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#000',
  },
  segmentedControl: {
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    padding: 2,
  },
  segment: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: 'transparent',
  },
  segmentActive: {
    backgroundColor: '#FFFFFF',
  },
  segmentText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  segmentTextActive: {
    color: '#000000',
    fontWeight: '600',
  },
  connectButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  connectButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#007AFF',
  },
  comingSoonText: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#6B7280',
  },
});
