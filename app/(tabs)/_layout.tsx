import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

function CustomTabBar({ state, descriptors, navigation }: any) {
  const router = useRouter();

  return (
    <View style={styles.tabBarContainer}>
      <Svg
        width="100%"
        height="120"
        style={styles.svgContainer}
        viewBox="0 0 400 120"
        preserveAspectRatio="none"
      >
        <Path
          d="M 0,10 L 143,10 Q 153,10 160,22 C 170,34 180,50 200,50 C 220,50 230,34 240,22 Q 247,10 257,10 L 400,10 L 400,120 L 0,120 Z"
          fill="white"
        />
      </Svg>
      
      <View style={styles.tabBar}>
        {/* Home */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('home')}
          style={styles.tabButton}
        >
          <Ionicons
            name="home-outline"
            size={24}
            color={state.index === 0 ? '#000000' : '#999999'}
          />
          <Text style={[
            styles.tabLabel,
            { color: state.index === 0 ? '#000000' : '#999999' }
          ]}>
            Home
          </Text>
        </TouchableOpacity>

        {/* Empty space for center button */}
        <View style={styles.centerSpace} />

        {/* Care Plan */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('care-plan')}
          style={styles.tabButton}
        >
          <Ionicons
            name="heart-outline"
            size={24}
            color={state.index === 1 ? '#000000' : '#999999'}
          />
          <Text style={[
            styles.tabLabel,
            { color: state.index === 1 ? '#000000' : '#999999' }
          ]}>
            Care Plan
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.centerButtonContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push('/symptoms' as any)}
          style={styles.centerButtonWrapper}
        >
          <LinearGradient
            colors={['#FDFFA2', '#B4ECD0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.centerButton}
          >
            <MaterialIcons name="add" size={24} color="#000000" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="care-plan"
        options={{
          title: 'Care Plan',
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: 'transparent',
  },
  svgContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  tabBar: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 20 : 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    height: 100,
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  tabLabel: {
    fontSize: 12,
    fontFamily: 'Poppins',
    marginTop: 4,
  },
  centerSpace: {
    flex: 1,
  },
  centerButtonContainer: {
    position: 'absolute',
    left: '50%',
    bottom: Platform.OS === 'ios' ? 78 : 80,
    marginLeft: -30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerButtonWrapper: {
    position: 'relative',
  },
  centerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
});
