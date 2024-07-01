import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './screens/ProfileScreen';
import UpdateProfileScreen from './screens/UpdateProfileScreen';
import SettingsScreen from './screens/NewProfileSettingsScreen';

const ProfileStack = createNativeStackNavigator();

function ProfileScreenStack() {
    return (
      <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'burlywood',
        },
      }}>
        <ProfileStack.Screen name="Profile" component={ProfileScreen} />
        <ProfileStack.Screen name="UpdateProfile" component={UpdateProfileScreen} />
        <ProfileStack.Screen name="ProfileSettings" component={SettingsScreen} initialParams={{invalidName: false, invalidInstrumet: false}}/>

      </ProfileStack.Navigator>
    );
  }

export default ProfileScreenStack;