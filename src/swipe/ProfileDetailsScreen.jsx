import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

//get render profile function
import { renderProfile } from './profile_rendering/RenderProfiles';

//get auth context
import { useAuth } from '../authContext/Auth-Context';

//get firestore
import firestore from '@react-native-firebase/firestore'

//get match function
import matchFunction from '../match/MatchFunction';

//get unmatch function
import rejectFunction from '../match/RejectFunction';

//get addRating function


function ProfileDetailsScreen({ route, darkMode, navigation }) {
    const { matchingId } = route?.params;
    const { profileData } = useAuth();
    const userId = profileData.userId;
    const [currentProfile, setCurrentProfile] = useState(null);
    const dynamicStyles = styles(darkMode);
    const [matched, setMatched] = useState(true);

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
                                        .where('match', '==', 'status')
                                        .where('user2Id', '==', userId)
                                        .where('user1Id', '==', matchingId).get();

                const match2 = await firestore().collection('matches')
                                        .where('match', '==', 'status')
                                        .where('user2Id', '==', userId)
                                        .where('user1Id', '==', matchingId).get();

                if (!match1.empty || !match2.empty) {
                    setMatched(true);
                } else {
                    setMatched(false);
                }
                    
                const checkForMatch = firestore().collection('matches')
                        .where('match', '==', 'status')
                        .onSnapshot(snapshot => {
                            const matched = snapshot.docs.some(doc =>
                                (doc.data().user1Id === userId && doc.data().user2Id === matchingId) ||
                                (doc.data().user1Id === matchingId && doc.data().user2Id === userId)
                            );
                            setMatched(matched.empty);
                            console.log(matched.empty);
                        });

                return checkForMatch;

            } catch (error) {
                console.error("error fetching match: " + error);
            }
        }
        //unsubscribeMatch = fetchMatched();

        fetchCurrentProfileData();
        return () => {
            //unsubscribeMatch;
        }
    }, [matchingId]);

    console.log("profile: " + currentProfile);
    console.log(matched);

    return (
        <View style={dynamicStyles.container}>
            {currentProfile ? (
                <View style={dynamicStyles.profileContainer}>
                    {renderProfile(currentProfile, {}, darkMode)}
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
            <View style={{flexDirection: "row"}}>
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
        padding: 10,
        borderRadius: 5,
        marginBottom: 60
    },
});

export default ProfileDetailsScreen;