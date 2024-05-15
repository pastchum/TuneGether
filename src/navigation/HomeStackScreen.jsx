import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Platform } from 'react-native';
import HomeScreen from '../screens/home/HomeScreen';
import ProfileViewScreen from '../screens/home/ProfileScreen';

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={HomeScreen} />
        <HomeStack.Screen name="ProfileView" component={ProfileViewScreen} />
      </HomeStack.Navigator>
    );
  }

export default HomeStackScreen;