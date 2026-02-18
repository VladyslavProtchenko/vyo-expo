import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function NotificationSettings() {
  const router = useRouter();
  const [notifications, setNotifications] = useState({
    'Period in a couple days': true,
    'Ovulation': true,
    'Log symptoms': true,
    'Special offers': true,
  });

  const notificationItems = [
    'Period in a couple days',
    'Ovulation',
    'Log symptoms',
    'Special offers',
  ];

  const handleToggle = (key: string) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={styles.header} onPress={() => router.back()}
          activeOpacity={0.7}>
          <FontAwesome6 name="arrow-left-long" size={24} color="black" />
        <Text style={styles.title}>Notifications</Text>
      </TouchableOpacity>

      <View style={styles.menuContainer}>
        {notificationItems.map((item) => (
          <View key={item} style={styles.menuCard}>
            <Text style={styles.menuItemText}>{item}</Text>
            <View style={styles.switchContainer}>
              <Switch
                value={notifications[item as keyof typeof notifications]}
                onValueChange={() => handleToggle(item)}
                trackColor={{ false: '#E5E5E5', true: '#34C759' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        ))}
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
    borderRadius: 16,
    shadowColor: '#000',
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 50,
    paddingHorizontal: 16,
  },
  switchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#000',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
