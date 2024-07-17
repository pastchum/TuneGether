import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreenStack from '../home/HomeScreenStack'
import ChatScreenStack from '../chat/ChatScreenStack';
import ProfileScreenStack from '../profile/ProfileScreenStack';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tabs = createBottomTabNavigator();

function BottomNavBar({ darkMode, setDarkMode }) {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === 'HomeStack') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (rn === 'ChatStack') {
            iconName = focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline';
          } else if (rn === 'ProfileStack') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'burlywood',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: darkMode ? 'black' : '#fff',
        },
      })}
    >
      <Tabs.Screen
        name="HomeStack"
        options={{
          tabBarLabel: 'Home',
        }}
      >
        {props => (
          <HomeScreenStack {...props} darkMode={darkMode} />
        )}
      </Tabs.Screen>
      <Tabs.Screen
        name="ChatStack"
        options={{
          tabBarLabel: 'Chat',
        }}
      >
        {props => (
          <ChatScreenStack {...props} darkMode={darkMode} />
        )}
      </Tabs.Screen>
      <Tabs.Screen
        name="ProfileStack"
        options={{
          tabBarLabel: 'Profile',
        }}
      >
        {props => (
          <ProfileScreenStack {...props} darkMode={darkMode} setDarkMode={setDarkMode} />
        )}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}

export default BottomNavBar;