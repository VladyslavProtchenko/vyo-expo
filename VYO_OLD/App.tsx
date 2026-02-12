import * as React from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { RootStackParamList } from './app/_types/types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

GoogleSignin.configure({
  webClientId: '1047891881333-YOUR_ACTUAL_WEB_CLIENT_ID.apps.googleusercontent.com',
  iosClientId: '1047891881333-YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
  offlineAccess: true,
});
import LoginScreen from './app/Login/index';
import EmailLoginScreen from './app/Login/EmailLogin';
import EmailRegistrationScreen from './app/Registration/index';
import PrivacyScreen from './app/Privacy/index';
import EmailResetPasswordScreen from './app/Login/EmailResetPassword';
import NewPasswordScreen from './app/Login/NewPassword';
import CompleteProfile from './app/CompleteProfile/CompleteProfile';
import SyncData from './app/SyncData/SyncData';
import CarePlanPreview from './app/CarePlan/CarePlanPreview';
import HomeTabs from './app/tabs/HomeTabs';
import CalendarPage from './app/Calendar/CalendarPage';
import VideoScreen from './app/VideoScreen/Page';
import ArticlePage from './app/Article/page';
import SymptomsPage from './app/Symptoms/page';
import SymptomsSuccess from './app/Symptoms/SymptomsSuccess';
import BodyCare from './app/BoduCare/index';
import CategoryPage from './app/BoduCare/CategoryPage';
import StressManagement from './app/StressManagement/index';
import Products from './app/Products/index';
import ProductsSettings from './app/Products/ProductsSettings';
import ProductsAll from './app/Products/ProductsAll';
import ProductsDeleted from './app/Products/ProductsDeleted';

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 1, staleTime: 5 * 60 * 1000 } } });

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Symptoms" component={SymptomsPage} options={{headerShown: false}} />
      <Stack.Screen name="SymptomsSuccess" component={SymptomsSuccess} options={{headerShown: false}} />
      <Stack.Screen name="Calendar" component={CalendarPage} options={{headerShown: false}} />
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
      <Stack.Screen name="EmailLogin" component={EmailLoginScreen} options={{headerShown: false}} />
      <Stack.Screen name="EmailRegistration" component={EmailRegistrationScreen} options={{headerShown: false}} />
      <Stack.Screen name="EmailResetPassword" component={EmailResetPasswordScreen} options={{headerShown: false}} />
      
      <Stack.Screen name="Home" component={HomeTabs} options={{headerShown: false}} />
      <Stack.Screen name="CarePlanPreview" component={CarePlanPreview} options={{headerShown: false}} />
      <Stack.Screen name="CompleteProfile" component={CompleteProfile} options={{headerShown: false}} />
      <Stack.Screen name="SyncData" component={SyncData} options={{headerShown: false}} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} options={{headerShown: false}} />
      <Stack.Screen name="NewPassword" component={NewPasswordScreen} options={{headerShown: false}} />
      <Stack.Screen name="VideoScreen" component={VideoScreen} options={{headerShown: false}} />
      <Stack.Screen name="ArticleScreen" component={ArticlePage} options={{headerShown: false}} />
      <Stack.Screen name="BodyCare" component={BodyCare} options={{headerShown: false}} />
      <Stack.Screen name="CategoryPage" component={CategoryPage} options={{headerShown: false}} />
      <Stack.Screen name="StressManagement" component={StressManagement} options={{headerShown: false}} />
      <Stack.Screen name="Products" component={Products} options={{headerShown: false}} />
      <Stack.Screen name="ProductsSettings" component={ProductsSettings} options={{headerShown: false}} />
      <Stack.Screen name="ProductsAll" component={ProductsAll} options={{headerShown: false}} />
      <Stack.Screen name="ProductsDeleted" component={ProductsDeleted} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <View style={styles.container}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <RootStack />
        </View>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;