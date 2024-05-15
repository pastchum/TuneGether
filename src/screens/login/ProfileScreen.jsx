import React, { useState } from 'react';
import { View, Text, Platform, Button, TextInput } from 'react-native';
import { firebase } from '@react-native-firebase/auth';

//import auth context
import { useAuth } from '../../context/Auth-context';

function ProfileScreen() {
    const {user} = useAuth();
    const { signOut } = useAuth();

    return (
        <View>
            <Text>
                User Profile Screen
                {/* full implementation to be done at later date */}
            </Text>
            <Button title='sign out' onPress={signOut}></Button>
        </View>
    )
}

export default ProfileScreen;