import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

//get render profile function
import { RenderProfile } from './profile_rendering/RenderProfiles';

//get auth context
import { useAuth } from '../authContext/Auth-Context';

//get firestore
import firestore from '@react-native-firebase/firestore'

//get match function
import matchFunction from '../match/MatchFunction';

//get unmatch function
import rejectFunction from '../match/RejectFunction';

//get addRating function


const { width } = Dimensions.get('window')

function ProfileDetailsScreen({ route, darkMode, navigation }) {
    const { matchingId } = route?.params;
    const { profileData } = useAuth();
    const userId = profileData.userId;
    const [currentProfile, setCurrentProfile] = useState(null);
    const dynamicStyles = styles(darkMode);
    const [matched, setMatched] = useState(false);

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

        const fetchMatched = async () => {
            try {
                const match1 = await firestore().collection('matches')
                                        .where('status', '==', 'matched')
                                        .where('user1Id', '==', userId)
                                        .where('user2Id', '==', matchingId).get();

                const match2 = await firestore().collection('matches')
                                        .where('status', '==', 'matched')
                                        .where('user1Id', '==', matchingId)
                                        .where('user2Id', '==', userId).get();
                
                console.log(match1 + " " + match2)

                if (!match1.empty || !match2.empty) {
                    setMatched(true);
                } else {
                    setMatched(false);
                }

            } catch (error) {
                console.error("error fetching match: " + error);
            }
        }

        fetchCurrentProfileData();
        fetchMatched();
    }, [matchingId]);

    console.log("profile: " + currentProfile);
    console.log(matched);

    return (
        <View style={dynamicStyles.container}>
            {currentProfile ? (
                <View style={dynamicStyles.profileContainer}>
                    <RenderProfile profileData={currentProfile} darkMode={darkMode} />
                </View>
            ) : (
                <Text style={dynamicStyles.text}>Data not found</Text>
            )}
            {!matched && 
            <View style={{flexDirection: "row"}}>
                <TouchableOpacity
                    style={dynamicStyles.startChatButton}
                    onPress={() => { matchFunction(matchingId, userId) }}>
                    <View>
                        <Text style={dynamicStyles.text}>Match</Text>
                    </View>
                </TouchableOpacity>
            </View>}
            {matched && 
            <View style={dynamicStyles.bottomRowButtons}>
                <TouchableOpacity
                    style={dynamicStyles.startChatButton}
                    onPress={() => { rejectFunction(matchingId, userId) }}>
                    <View>
                        <Text style={dynamicStyles.text}>Unmatch</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={dynamicStyles.startChatButton}
                    onPress={() => {
                        return navigation.navigate('ChatStack', { screen: "Chat",
                                                                  params: { userId: matchingId } })
                    }}
                    >
                    <View>
                        <Text style={dynamicStyles.text}>Chat</Text>
                    </View>
                </TouchableOpacity>
            </View>}
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
        padding: 5,
        borderRadius: 5,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        width: (width-60) / 3
      },
    bottomRowButtons: {
        height: 50, 
        flexDirection: "row"
      }
});

export default ProfileDetailsScreen;