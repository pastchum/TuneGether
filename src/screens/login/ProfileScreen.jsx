import React, { useState } from 'react';
import { View, Text, Platform, Button, TextInput } from 'react-native';
import { Styles } from '../../../assets/Styles';
import { renderProfile } from '../../profile/RenderProfiles';

//import auth context
import { useAuth } from '../../authContext/Auth-Context'

function ProfileScreen({ navigation }) {
    const {user, profileData } = useAuth();
    console.log("profile: " + profileData);
    
    return (
        <View style={Styles.container}>
            { profileData ? (
                <View style={Styles.profileContainer}>
                    {renderProfile(profileData)}       
                </View >
                ) : (
                    <Text> data not found</Text>
                )}
        </View>
    )
}

export default ProfileScreen;
