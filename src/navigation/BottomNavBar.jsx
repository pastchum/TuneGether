import * as React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from './stacks/HomeScreenStack';
import ChatStackScreen from './stacks/ChatStack';
import LoginStackScreen from './stacks/LoginStack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ProfileIcon from '../../assets/pictures/profile.png';

const Tabs = createBottomTabNavigator();

function BottomNavBar() {
    return;
}

function BottomTabNavigator() {
    return (
      <Tabs.Navigator 
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn  === "HomeStack") {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === "ChatStack") {
              iconName = focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline';
            } else if (rn == "LoginStack") {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name = {iconName} size ={size} color = {color}/>
          },

          tabBarActiveTintColor: 'burlywood',
          tabBarInactiveTintColor: 'gray',
        })
      }
      >
          <Tabs.Screen 
            name="HomeStack" 
            component={HomeStackScreen} 
            options={{
              tabBarLabel: "Home",
            }}
            />
          <Tabs.Screen 
            name="ChatStack" 
            component={ChatStackScreen} 
            options={{
              tabBarLabel: "Chat",
            }}/>
          <Tabs.Screen 
            name="LoginStack" 
            component={LoginStackScreen} 
            options={{
              tabBarLabel: "Profile",
            }}/>
      </Tabs.Navigator>
    );
  }
  
  export default BottomTabNavigator;