import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../../splash/SplashScreen';
import HomeScreen from '../../screens/home/HomeScreen';

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
    return (
      <HomeStack.Navigator 
        initialRouteName="Splash"
        screenOptions={{
          headerStyle: {
            backgroundColor: 'burlywood',
          },
        }}
      >
        <HomeStack.Screen
        name = "Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
        />
        <HomeStack.Screen name="Home" component={HomeScreen} />
      </HomeStack.Navigator>
    );
  }

export default HomeStackScreen;