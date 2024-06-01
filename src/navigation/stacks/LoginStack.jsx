import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../screens/login/LoginScreen';
import ProfileScreen from '../../screens/login/ProfileScreen'
import CreateAccountScreen from '../../screens/login/CreateAccountScreen';
import { useAuth } from '../../authContext/Auth-Context'
import CreateProfileScreen from '../../screens/login/profileCreation/CreateProfileScreen';
import ProfileSettingsScreen from '../../screens/login/ProfileSettingsScreen';
import UpdateProfileScreen from '../../screens/login/profileCreation/UpdateProfileScreen';

const LoginStack = createNativeStackNavigator();

function LoginStackScreen() {
  const { user, profileCreated } = useAuth();
  
  return (
      <LoginStack.Navigator>
        { user && profileCreated ? (
          //if user is signed in, direct here
          <>
            <LoginStack.Screen name="Profile" component={ProfileScreen} />
            <LoginStack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
            <LoginStack.Screen 
              name="UpdateProfile" 
              component={UpdateProfileScreen} 
              initialParams={{invalidName: false, invalidInstrument: false}}/>
          </>
        ) : user ? (
          //user signed in but no profile created
          <LoginStack.Screen 
            name="CreateProfile" 
            component={CreateProfileScreen} 
            initialParams={{invalidName: false, invalidInstrument: false}}/>
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