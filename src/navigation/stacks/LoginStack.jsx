import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../screens/login/LoginScreen';

const LoginStack = createNativeStackNavigator();

function LoginStackScreen() {
    return (
      <LoginStack.Navigator>
        <LoginStack.Screen name="Login" component={LoginScreen} />
      </LoginStack.Navigator>
    );
  }

export default LoginStackScreen;