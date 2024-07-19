import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Styles } from '../../assets/Styles';

//get render profile function
import { renderProfile } from './profile_rendering/RenderProfiles';

//get auth context
import { useAuth } from '../authContext/Auth-Context';

//get firestore
import firestore from '@react-native-firebase/firestore'

//get match function
import matchFunction from '../match/MatchFunction';

function ProfileDetailsScreen({ route, darkMode }) {
    const { matchingId } = route?.params;
    const { profileData } = useAuth();
    const userId = profileData.userId;
    const [currentProfile, setCurrentProfile] = useState(null);
    const dynamicStyles = styles(darkMode);

    console.log('profileId: ', matchingId);

    useEffect(() => {
        const fetchCurrentProfileData = async () => {
            try {
                const profileDataSnapshot = await firestore().collection('users')
                    .doc(matchingId)
                    .get();
                setCurrentProfile(profileDataSnapshot.data());
            } catch (error) {
                console.error('Error fetching profile data: ', error);
                throw error;
            }
        };

        fetchCurrentProfileData();
    }, [matchingId]);

    console.log("profile: " + currentProfile);

    return (
        <View style={dynamicStyles.container}>
            {currentProfile ? (
                <View style={dynamicStyles.profileContainer}>
                    {renderProfile(currentProfile, {}, darkMode)}
                </View>
            ) : (
                <Text style={dynamicStyles.text}>Data not found</Text>
            )}
            <View>
                <TouchableOpacity
                    style={dynamicStyles.startChatButton}
                    onPress={() => { matchFunction(matchingId, userId) }}>
                    <View>
                        <Text style={dynamicStyles.text}>Match</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = (darkMode) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: darkMode ? '#333' : '#fff',
    },
    profileContainer: {
        marginTop: 80,
        marginBottom: 20
    },
    text: {
        color: darkMode ? '#fff' : '#000',
    },
    startChatButton: {
        // Add your specific styles for start chat button
        backgroundColor: 'burlywood',
        padding: 10,
        borderRadius: 5,
        marginBottom: 60
    },
});

export default ProfileDetailsScreen;