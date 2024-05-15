import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import ProfileDetailsScreen from '../screens/home/ProfileDetailsScreen';

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={HomeScreen} />
        <HomeStack.Screen name="ProfileDetails" component={ProfileDetailsScreen} options={{title:"View Profile"}} />
      </HomeStack.Navigator>
    );
  }

export default HomeStackScreen;