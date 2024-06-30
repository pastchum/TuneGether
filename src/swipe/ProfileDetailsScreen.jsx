import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Styles } from '../../assets/Styles';

//get render profile function
import { renderProfile } from './profile_rendering/RenderProfiles';

//get auth context
import { useAuth } from '../authContext/Auth-Context';

//get firestore
import firestore from '@react-native-firebase/firestore'

//get match function
import matchFunction from '../match/MatchFunction';

function ProfileDetailsScreen({ navigation, route }) {
    const { matchingId } = route?.params;
    const { profileData } = useAuth();
    const userId = profileData.userId;

    //currentProfile state
    const [currentProfile, setCurrentProfile] = useState(null);

    console.log('profileId: ', matchingId)

    useEffect(() => {
        const fetchCurrentProfileData = async() => {
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
        <View style={Styles.container}>
            { currentProfile ? (
                <View style={Styles.profileContainer}>
                    {renderProfile(currentProfile)} 
                </View >
                ) : (
                    <Text> data not found</Text>
                )}
            <View>
                <TouchableOpacity
                    style={Styles.startChatButton}
                    onPress={() => {matchFunction(matchingId , userId)}}>
                    <View >
                        <Text>Match</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ProfileDetailsScreen;