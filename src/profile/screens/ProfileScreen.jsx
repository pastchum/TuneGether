import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Button, TextInput } from 'react-native';
import { Styles } from '../../../assets/Styles';

//get render profile function
import { renderProfile } from '../../swipe/profile_rendering/RenderProfiles';

//import auth context
import { useAuth } from '../../authContext/Auth-Context';

function ProfileScreen({ navigation }) {
    const {user, profileData, signOut } = useAuth();
    console.log("profile: " + profileData);
    
    return (
        <View style={styles.container}>
            { profileData ? (
                <View style={styles.profileContainer}>
                    {renderProfile(profileData)} 
                </View >
                ) : (
                    <Text> data not found</Text>
                )}
            <View>
                <TouchableOpacity
                    style={styles.startChatButton}
                    onPress={() => navigation.navigate('ProfileSettings')}>
                    <View >
                        <Text>Account Settings</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ProfileScreen;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    profileContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        margin: 20,
    },
    startChatButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
});