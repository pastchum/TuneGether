import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import defaultPFP from "../../swipe/profile_rendering/DefaultPFP.png";
import { RenderProfileBar } from "../../swipe/profile_rendering/RenderProfileBar";
import firestore from '@react-native-firebase/firestore';
import { useAuth } from "../../authContext/Auth-Context";

export const RenderGroupChat = ({ groupChatData, additionalStyles = {}, darkMode = false, navigation }) => {
    const { user } = useAuth();
    const userId = user.uid;
    const [pfp, setPfp] = useState(defaultPFP);
    const [profileData, setProfileData] = useState({});
    console.log(groupChatData)
    const dynamicStyles = createStyles(additionalStyles, darkMode);

    useEffect(() => {
        const fetchProfileData = async (id) => {
            try {
                const profileSnapshot = await firestore().collection('users').doc(id).get();
                const currProfileData = profileSnapshot.data();
                return { id, data: currProfileData };
            } catch (error) {
                console.error(`Error fetching profile for user ${id}:`, error);
                return { id, data: null };
            }
        };

        const fetchAndSetPFP = async () => {
            try {
                if (groupChatData?.profilePicURL) {
                    setPfp({ uri: groupChatData.profilePicURL });
                }
            } catch (error) {
                console.log(error);
            }
        }

        const fetchProfileDetails = async () => {
            const profilePromises = groupChatData.users.map(userId => fetchProfileData(userId));
            const profiles = await Promise.all(profilePromises);

            const profileDataMap = profiles.reduce((acc, { id, data }) => {
                if (data) acc[id] = data;
                    return acc;
            }, {});
            setProfileData(profileDataMap);
        }

        fetchAndSetPFP();
        fetchProfileDetails();
        console.log(profileData);
    }, [groupChatData?.profilePicURL])

    console.log("Rendering GroupChat for:", groupChatData?.name);

    return groupChatData 
        ? (
        <ScrollView style={dynamicStyles.GroupChatContainer}>
            <View style={dynamicStyles.GroupChatContent}>
                <Text style={dynamicStyles.titleText}>{groupChatData?.name}</Text>
                <Image source={pfp} style={dynamicStyles.displayPhoto} />
            </View>
            <View style={dynamicStyles.GroupChatDetails}>
                <View style={dynamicStyles.moreAboutMe}>
                    <Text style={dynamicStyles.subHeader}>Bio</Text>
                    <Text>{groupChatData?.bio}</Text>

                </View>
                <View style={dynamicStyles.moreAboutMe}>
                    <Text style={dynamicStyles.subHeader}>Members</Text>
                </View>
                {Array.isArray(groupChatData.users) ?(
                    groupChatData.users
                        .map(user => {
                                const data = profileData[user];
                                console.log(data);
                                return data ? (
                                    <TouchableOpacity 
                                        onPress={() => {
                                            return user === userId 
                                            ? navigation.navigate('ProfileStack', 
                                                { screen: 'Profile', params: { darkMode: darkMode } })
                                            : navigation.navigate('HomeStack', 
                                                { screen: 'ProfileDetails', params: { matchingId: user } });
                                        }}>
                                        <RenderProfileBar profileData={data} darkMode={darkMode} />
                                    </TouchableOpacity>
                                ) : (
                                    <View>
                                        <Text>Profile not Available</Text>
                                    </View>
                                )
                            }
                        ) 
                    ) : null
                    }
            </View>
        </ScrollView>
        ) : (
            <View style={dynamicStyles.container}>
                <Text>No GroupChat Available</Text>
            </View>
        );
};

const createStyles = (additionalStyles, darkMode) => StyleSheet.create({
    GroupChatContainer: {
        flex: 1,
        backgroundColor: darkMode ? "slategrey" : "lightsteelblue",
        borderRadius: 15, 
        padding: 20,
        width: 370,
        ...additionalStyles.GroupChatContainer,
    },
    GroupChatContent: {
        justifyContent: 'center',
        alignItems: 'center',
        ...additionalStyles.GroupChatContent,
    },
    GroupChatDetails: {
        marginTop: 0,
        marginBottom: 30,
        ...additionalStyles.GroupChatDetails,
    },
    moreAboutMe: {
        marginLeft: 30,
        marginTop: 30,
        ...additionalStyles.moreAboutMe,
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        ...additionalStyles.titleText,
    },
    displayPhoto: {
        width: 300,
        height: 300,
        borderRadius: 30,
        marginBottom: 10,
        ...additionalStyles.displayPhoto,
    },
    subHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        ...additionalStyles.subHeader,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        ...additionalStyles.container,
    },
});