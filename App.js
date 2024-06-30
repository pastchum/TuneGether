import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/authContext/Auth-Context';
import AppNavigator from './src/navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function App() {
  
  return (
    <AuthProvider>
      <GestureHandlerRootView>
        <NavigationContainer>
          <SafeAreaView>
            <View style={styles.container}>
              <StatusBar style="auto" />
            </View>
          </SafeAreaView>
          <AppNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
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
