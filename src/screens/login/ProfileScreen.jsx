import React, { useState } from 'react';
import { View, Text, Platform, Button, TextInput } from 'react-native';

//import auth context
import { useAuth } from '../../authContext/Auth-Context'

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
