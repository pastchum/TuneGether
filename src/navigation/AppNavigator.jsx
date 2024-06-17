import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavBar from "./BottomNavBar";
import LoginStackScreen from '../login/LoginScreenStack'

//get auth context
import { useAuth } from "../authContext/Auth-Context";

const AppNavigationStack = createNativeStackNavigator();

function AppNavigator() {
    const { user, profileData } = useAuth();

    return (
        <AppNavigationStack.Navigator
            screenOptions={{headerShown: false}}
        >
            { user && profileData ? (
                <AppNavigationStack.Screen 
                    name="SignedInStack"
                    component={BottomNavBar}
                    
                /> 
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