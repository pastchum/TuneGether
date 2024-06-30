import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Appearance } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/authContext/Auth-Context';
import AppNavigator from './src/navigation/AppNavigator';
import React from 'react';
import { ThemeProvider, useTheme } from '@react-navigation/native';

export default function App() {

  
  return (
    <AuthProvider>
      <NavigationContainer>
        <SafeAreaView>
          <View styl={styles.container}>
            <StatusBar style="auto" />
          </View>
        </SafeAreaView>
        <AppNavigator />
      </NavigationContainer>  
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
