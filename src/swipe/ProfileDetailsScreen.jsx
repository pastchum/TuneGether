import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Styles } from '../../assets/Styles';

//get render profile function
import { renderProfile } from './profile_rendering/RenderProfiles';

//get firestore
import firestore from '@react-native-firebase/firestore'

function ProfileDetailsScreen({ navigation, route }) {
    const userId = route?.params.userId;

    //profiledata state
    const [profileData, setProfileData] = useState(null);

    console.log('profileId: ', userId)

    useEffect(() => {
        const fetchProfileData = async() => {
            try {
                const profileDataSnapshot = await firestore().collection('users')
                        .doc(userId)
                        .get();
                setProfileData(profileDataSnapshot.data());
            } catch (error) {
                console.error('Error fetching profile data: ', error);
                throw error;
            }
        };

        fetchProfileData();
    }, [userId]);

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
            <View>
                <TouchableOpacity
                    style={Styles.startChatButton}
                    onPress={() => {}}>
                    <View >
                        <Text>Match</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ProfileDetailsScreen;