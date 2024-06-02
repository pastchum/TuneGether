import React, { useState } from 'react';
import { View, Text, Platform, Button, TextInput } from 'react-native';
import { Styles } from '../../../assets/Styles';

//import auth context
import { useAuth } from '../../authContext/Auth-Context'

function ProfileSettingsScreen({ navigation }) {
    const {user, signOut } = useAuth();
    
    return (
        <View style={Styles.container}>
            <View style={Styles.profileContainer}>
                <Button 
                    title='Edit your profile' onPress={() => navigation.navigate("UpdateProfile")}
                    color='burlywood' />
                <Button 
                    title='sign out' onPress={signOut} 
                    color='burlywood'/>
            </View >
        </View>
    )
}

export default ProfileSettingsScreen;
