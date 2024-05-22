import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../screens/login/LoginScreen';
import ProfileScreen from '../../screens/login/ProfileScreen'
import CreateAccountScreen from '../../screens/login/CreateAccountScreen';
import { useAuth } from '../../authContext/Auth-Context'

const LoginStack = createNativeStackNavigator();

function LoginStackScreen() {
  const { user } = useAuth();

  return (
      <LoginStack.Navigator>
        { user ? (
          //if user is signed in, direct here
          <LoginStack.Screen name="Profile" component={ProfileScreen} />
        ) : (
          //if user not signed in
          <>
            <LoginStack.Screen name="Sign In" component={LoginScreen} />
            <LoginStack.Screen name="CreateAccount" component={CreateAccountScreen} />
          </>
        )}
      </LoginStack.Navigator>
    );
  }

export default LoginStackScreen;