import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../splash/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileDetailsScreen from '../swipe/ProfileDetailsScreen';

const HomeStack = createNativeStackNavigator();

function HomeScreenStack() {
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
        <HomeStack.Screen name="ProfileDetails" component={ProfileDetailsScreen} />
      </HomeStack.Navigator>
    );
  }

export default HomeScreenStack;