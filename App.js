import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavBar from './src/navigation/BottomNavBar';

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView>
        <View styl={styles.container}>
          <StatusBar style="auto" />
        </View>
      </SafeAreaView>
      <BottomNavBar />
    </NavigationContainer>
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
