import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ProfileDetailsScreen from '../swipe/ProfileDetailsScreen';

const HomeStack = createNativeStackNavigator();

function HomeScreenStack({ darkMode }) {
    return (
      <HomeStack.Navigator 
        screenOptions={{
          headerStyle: {
            backgroundColor:'burlywood',
          }
        }}
      >
        <HomeStack.Screen name="Home">
          {props => <HomeScreen {...props} darkMode={darkMode} />}
        </HomeStack.Screen>
        <HomeStack.Screen name="ProfileDetails">
          {props => <ProfileDetailsScreen {...props} darkMode={darkMode} />}
        </HomeStack.Screen> 
      </HomeStack.Navigator>
    );
  }

export default HomeScreenStack;