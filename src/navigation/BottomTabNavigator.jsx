import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from './HomeStackScreen';
import { NavigationContainer } from '@react-navigation/native';
import LoginStackScreen from './LoginStackScreen';
import ChatScreen from '../screens/chat/ChatScreen';

const Tabs = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tabs.Navigator screenOptions={{headerShown:false}}>
        <Tabs.Screen name="HomeStack" tabBarLabel="Home" component={HomeStackScreen} />
        <Tabs.Screen name="Chat" tabBarLabel="Chat" component={ChatScreen} />
        <Tabs.Screen name="LoginStack" tabBarLabel="Profile" component={LoginStackScreen} />
    </Tabs.Navigator>
  );
}

export default BottomTabNavigator;