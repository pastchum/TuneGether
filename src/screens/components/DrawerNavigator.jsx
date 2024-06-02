import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from './path/to/authContext/Auth-Context';
import ProfileScreen from './path/to/screens/login/ProfileScreen';
import ProfileSettingsScreen from './path/to/screens/login/ProfileSettingsScreen';
import UpdateProfileScreen from './path/to/screens/login/profileCreation/UpdateProfileScreen';
import CreateProfileScreen from './path/to/screens/login/profileCreation/CreateProfileScreen';
import LoginScreen from './path/to/screens/login/LoginScreen';
import CreateAccountScreen from './path/to/screens/login/CreateAccountScreen';

const Drawer = createDrawerNavigator();
const LoginStack = createNativeStackNavigator();

function LoginStackNavigator() {
  const { user, profileCreated } = useAuth();

  return (
    <LoginStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'burlywood',
        },
      }}>
      {user && profileCreated ? (
        <>
          <LoginStack.Screen 
            name="Profile" 
            component={ProfileScreen} 
            options={({ navigation }) => ({
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                  <Ionicons name="settings-outline" size={25} color="black" style={{ marginRight: 15 }} />
                </TouchableOpacity>
              ),
            })}
          />
          <LoginStack.Screen 
            name="UpdateProfile" 
            component={UpdateProfileScreen} 
            initialParams={{invalidName: false, invalidInstrument: false}} 
          />
        </>
      ) : user ? (
        <LoginStack.Screen name="CreateProfile" component={CreateProfileScreen} />
      ) : (
        <>
          <LoginStack.Screen name="Login" component={LoginScreen} />
          <LoginStack.Screen name="CreateAccount" component={CreateAccountScreen} />
        </>
      )}
    </LoginStack.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={LoginStackNavigator} />
      <Drawer.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
