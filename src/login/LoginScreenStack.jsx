import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import { useAuth } from '../authContext/Auth-Context';
import SetName from './screens/profileCreation/createProfilePages/SetName';
import SetInstrument from './screens/profileCreation/createProfilePages/SetInstrument';
import SetBio from './screens/profileCreation/createProfilePages/SetBio';
import SplashScreen from '../splash/SplashScreen';

const LoginStack = createNativeStackNavigator();

function LoginScreenStack() {
  const { user } = useAuth();
  
  return (
      <LoginStack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerStyle: {
            backgroundColor: 'burlywood',
          },
        }}>
        
        { user ? (
          //user signed in but no profile created
          <>
            <LoginStack.Screen 
              name="SetName" 
              component={SetName} 
              initialParams={{invalidName: false}}
              />
            <LoginStack.Screen
              name="SetInstrument"
              component={SetInstrument}
              initialParams={{invalidInstrument: false}}
              />
            <LoginStack.Screen
              name="SetBio"
              component={SetBio}
              />
          </>
        ) : (
          //if user not signed in
          <>
            <LoginStack.Screen
              name = "Splash"
              component={SplashScreen}
              options={{ headerShown: false }}
              />
            <LoginStack.Screen name="Login" component={LoginScreen} />
            <LoginStack.Screen name="CreateAccount" component={CreateAccountScreen}/>
          </>
        )}
      </LoginStack.Navigator>
    );
  }

export default LoginScreenStack;