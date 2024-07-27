import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

//get render profile function
import { RenderProfile } from '../../swipe/profile_rendering/RenderProfiles';

//import auth context
import { useAuth } from '../../authContext/Auth-Context';

function ProfileScreen({ darkMode }) {
    const { profileData } = useAuth();

    const dynamicStyles = styles(darkMode);
    const additionalStyles = {
        displayPhoto: { width: 150, height: 150, borderRadius: 80 }
    };

    return (
        <View style={dynamicStyles.container}>
            {profileData ? (
                <View style={dynamicStyles.profileContainer}>
                    <RenderProfile profileData={profileData} additionalStyles={additionalStyles} darkMode={darkMode} />
                </View>
            ) : (
                <Text style={dynamicStyles.dataNotFound}>data not found</Text>
            )}
            
        </View>
    );
}

export default ProfileScreen;

const styles = (darkMode) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: darkMode ? '#333' : '#fff',
    },
    profileContainer: {
        flex: 1,
        backgroundColor: darkMode ? '#333' : '#fff',
        borderRadius: 15,
        padding: 20,
        margin: 20,
    },
    startChatButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: darkMode ? '#555' : '#f0f0f0',
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: darkMode ? '#fff' : '#333',
    },
    dataNotFound: {
        color: darkMode ? '#fff' : '#000',
    },
});