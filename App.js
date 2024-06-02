import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavBar from './src/navigation/BottomNavBar';
import { AuthProvider } from './src/authContext/Auth-Context';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <AuthProvider>
      <NavigationContainer>
        <SafeAreaView>
          <View styl={styles.container}>
            <StatusBar style="auto" />
          </View>
        </SafeAreaView>
        <BottomNavBar />
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
