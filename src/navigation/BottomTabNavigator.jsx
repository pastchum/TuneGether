import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from './HomeStackScreen';
import LoginStackScreen from './LoginStackScreen';
import ChatScreen from '../screens/chat/ChatScreen';

const Tabs = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tabs.Navigator screenOptions={{headerShown:false}}>
        <Tabs.Screen name="HomeStack" component={HomeStackScreen} options={{tabBarLabel: "Home"}}/>
        <Tabs.Screen name="Chat" component={ChatScreen} options={{tabBarLabel: "Chat"}}/>
        <Tabs.Screen name="LoginStack" component={LoginStackScreen} options={{tabBarLabel: "Profile"}}/>
    </Tabs.Navigator>
  );
}

export default BottomTabNavigator;