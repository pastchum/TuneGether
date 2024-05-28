import React, { useState } from 'react';
import { View, Text, Platform, Button, TextInput } from 'react-native';

//import auth context
import { useAuth } from '../../authContext/Auth-Context'

function ProfileScreen() {
    const {user, signOut, profileData } = useAuth();
    console.log("profile: " + profileData);
    
    return (
        <View>
            { profileData ? (
                <>
                    <Text>
                        Name:
                        {profileData.name}
                    </Text>
                    <Text>
                        Instrument:
                        {profileData.instrument}
                    </Text>
                    <Text>
                        Bio:
                        {profileData.bio}
                    </Text> 
                </>
                ) : (
                    <Text> data not found</Text>
                )}
            <Button title='sign out' onPress={signOut}></Button>
        </View>
    )
}

export default ProfileScreen;
