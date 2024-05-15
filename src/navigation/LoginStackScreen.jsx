import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import LoginScreen from '../screens/login/LoginScreen';
import CreateAccountScreen from '../screens/login/CreateAccountScreen';
import ProfileScreen from '../screens/login/ProfileScreen';

//import auth context
import { useAuth } from '../context/Auth-context';

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