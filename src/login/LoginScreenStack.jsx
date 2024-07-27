import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import { useAuth } from '../authContext/Auth-Context';
import SetName from './screens/profileCreation/createProfilePages/SetName';
import SetInstrument from './screens/profileCreation/createProfilePages/SetInstrument';
import SetBio from './screens/profileCreation/createProfilePages/SetBio';
import SplashScreen from '../splash/SplashScreen';
import SetProfilePicture from './screens/profileCreation/createProfilePages/setProfilePicture';

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
              screenOptions={{ headerShown: false }}
              />
            <LoginStack.Screen
              name="SetProfilePicture"
              component={SetProfilePicture}
              screenOptions={{headerShown: false}}
              />
            <LoginStack.Screen
              name="SetInstrument"
              component={SetInstrument}
              initialParams={{invalidInstrument: false}}
              screenOptions={{ headerShown: false }}
              />
            <LoginStack.Screen
              name="SetBio"
              component={SetBio}
              screenOptions={{ headerShown: false }}
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
            <LoginStack.Screen 
              name="Login" 
              component={LoginScreen} 
              />
            <LoginStack.Screen 
              name="CreateAccount" 
              component={CreateAccountScreen}
              options={{ title: "Create Account" }}
              />
          </>
        )}
      </LoginStack.Navigator>
    );
  }

export default LoginScreenStack;