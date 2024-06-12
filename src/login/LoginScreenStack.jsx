import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import { useAuth } from '../authContext/Auth-Context';
import CreateProfileScreen from './screens/profileCreation/CreateProfileScreen';

const LoginStack = createNativeStackNavigator();

function LoginScreenStack() {
  const { user } = useAuth();
  
  return (
      <LoginStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'burlywood',
        },
      }}>
        { user ? (
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

export default LoginScreenStack;