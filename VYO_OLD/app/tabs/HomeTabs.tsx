import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../_types/types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import CarePlan from '../CarePlan/CarePlan';
import HomePage from '../Home/HomePage';

import { useDiagnosis } from '../_hooks/useDiagnosis';

const Tab = createBottomTabNavigator<TabParamList>();

function CustomTabBar({ state, navigation }: any) {
  return (
    <View style={styles.tabBarContainer}>
      <Svg
        width="100%"
        height="120"
        style={styles.svgContainer}
        viewBox="0 0 400 120"
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
          onPress={() => navigation.navigate('Home')}
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

        {/* Пустое пространство для центральной кнопки */}
        <View style={styles.centerSpace} />

        {/* Care Plan */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('CarePlan')}
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
          onPress={() => {
            const parent = navigation.getParent();
            if (parent) {
              parent.navigate('Symptoms');
            } else {
              navigation.navigate('Symptoms');
            }
          }}
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

export default function HomeTabs() {
  const { diagnosis, primary, secondary, menstrualPain } = useDiagnosis();
  console.log(diagnosis, primary, secondary, menstrualPain);
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
      >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="CarePlan" component={CarePlan} />
    </Tab.Navigator>
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
    paddingHorizontal: 8,
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
