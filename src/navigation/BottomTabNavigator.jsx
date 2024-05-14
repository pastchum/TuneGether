import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from './HomeStackScreen';
import { NavigationContainer } from '@react-navigation/native';
import LoginStackScreen from './LoginStackScreen';

const Tabs = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tabs.Navigator screenOptions={{headerShown:false}}>
        <Tabs.Screen name="HomeStack" component={HomeStackScreen} />
        <Tabs.Screen name="LoginStack" component={LoginStackScreen} />
    </Tabs.Navigator>
  );
}

export default BottomTabNavigator;