import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavBar from "./BottomNavBar";
import LoginStackScreen from '../login/LoginScreenStack'

//get auth context
import { useAuth } from "../authContext/Auth-Context";

const AppNavigationStack = createNativeStackNavigator();

function AppNavigator() {
  const { user, profileData, fetchUserProfile } = useAuth();
  const [darkMode, setDarkMode] = useState(false);  // Manage dark mode state here

  useEffect(() => {
    fetchUserProfile(user);
  }, [user])

  return (
    <AppNavigationStack.Navigator screenOptions={{ headerShown: false }}>
      {user && profileData ? (
        <AppNavigationStack.Screen
          name="SignedInStack"
          options={{ headerShown: false }}
        >
          {props => (
            <BottomNavBar {...props} darkMode={darkMode} setDarkMode={setDarkMode} />
          )}
        </AppNavigationStack.Screen>
      ) : (
        <AppNavigationStack.Screen
          name="LoginStack"
          component={LoginStackScreen}
        />
      )}
    </AppNavigationStack.Navigator>
  );
}

export default AppNavigator;