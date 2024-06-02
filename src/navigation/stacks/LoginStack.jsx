import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import LoginScreen from '../../screens/login/LoginScreen';
import ProfileScreen from '../../screens/login/ProfileScreen'
import CreateAccountScreen from '../../screens/login/CreateAccountScreen';
import { useAuth } from '../../authContext/Auth-Context'
import CreateProfileScreen from '../../screens/login/profileCreation/CreateProfileScreen';
import ProfileSettingsScreen from '../../screens/login/ProfileSettingsScreen';
import UpdateProfileScreen from '../../screens/login/profileCreation/UpdateProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NewProfileSettingsScreen from '../../screens/login/NewProfileSettingsScreen';

const LoginStack = createNativeStackNavigator();

function LoginStackScreen() {
  const { user, profileCreated } = useAuth();
  
  return (
      <LoginStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'burlywood',
        },
      }}>
        { user && profileCreated ? (
          //if user is signed in, direct here
          <>
            <LoginStack.Screen 
              name="Profile" 
              component={ProfileScreen} 
              options={({ navigation }) => ({
                headerRight: () => (
                  <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                    <Ionicons name="settings-outline" size={25} color="black" style={{ marginRight: 15 }} />
                  </TouchableOpacity>
                ),
              })}
            />
            <LoginStack.Screen name="Settings" component={NewProfileSettingsScreen} />
            <LoginStack.Screen 
              name="UpdateProfile" 
              component={UpdateProfileScreen} 
              initialParams={{invalidName: false, invalidInstrument: false}}
              />
          </>
        ) : user ? (
          //user signed in but no profile created
          <LoginStack.Screen name="CreateProfile" component={CreateProfileScreen} />
        ) : (
          //if user not signed in
          <>
            <LoginStack.Screen name="Login" component={LoginScreen} />
            <LoginStack.Screen name="CreateAccount" component={CreateAccountScreen}/>
          </>
        )}
      </LoginStack.Navigator>
    );
  }

export default LoginStackScreen;