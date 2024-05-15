/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native'; 

import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/Auth-context';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: "burlywood",
  };

  return (
    <AuthProvider>
      <NavigationContainer>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={backgroundStyle}>
            <Text style = {styles.sectionTitle}>
                TUNEGETHER 
            </Text>
          </ScrollView>
        </SafeAreaView>
        <BottomTabNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default App;
