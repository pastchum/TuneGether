import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './screens/ProfileScreen';
import UpdateProfileScreen from './screens/UpdateProfileScreen';
import SettingsScreen from './screens/NewProfileSettingsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';


const ProfileStack = createNativeStackNavigator();

function ProfileScreenStack({ darkMode, setDarkMode }) {
    return (
        <ProfileStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'burlywood',
                }
            }}
        >
            <ProfileStack.Screen
                name="Profile"
                options={({ navigation }) => ({
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ProfileSettings')}
                            accessibilityLabel="settings"
                        >
                            <Ionicons name="settings-outline" size={24} color={'#000'} style={{ marginRight: 10 }} />
                        </TouchableOpacity>
                    ),
                })}>
                {props => <ProfileScreen {...props} darkMode={darkMode} />}
            </ProfileStack.Screen>
            <ProfileStack.Screen name="UpdateProfile">
                {props => <UpdateProfileScreen {...props} darkMode={darkMode} />}
            </ProfileStack.Screen>
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