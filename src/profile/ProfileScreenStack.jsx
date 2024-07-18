import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './screens/ProfileScreen';
import UpdateProfileScreen from './screens/UpdateProfileScreen';
import SettingsScreen from './screens/NewProfileSettingsScreen';

const ProfileStack = createNativeStackNavigator();

function ProfileScreenStack({ darkMode, setDarkMode }) {
    return (
        <ProfileStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: darkMode ? '#333' : 'burlywood',
                },
                headerTintColor: darkMode ? '#fff' : '#000',
            }}
        >
            <ProfileStack.Screen name="Profile" component={ProfileScreen} />
            <ProfileStack.Screen name="UpdateProfile" component={UpdateProfileScreen} />
            <ProfileStack.Screen
                name="ProfileSettings"
                options={{ title: 'Profile Settings' }}
            >
                {props => <SettingsScreen {...props} darkMode={darkMode} setDarkMode={setDarkMode} />}
            </ProfileStack.Screen>
        </ProfileStack.Navigator>
    );
}

export default ProfileScreenStack;