import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import defaultPFP from "../../swipe/profile_rendering/DefaultPFP.png";

export const RenderChatBar = ({ chatData, additionalStyles = {}, darkMode = false, navigation }) => {
    console.log("Rendering chat bar for:", chatData.name);

    const [pfp, setPfp] = useState(defaultPFP);
    const dynamicStyles = createStyles(additionalStyles, darkMode);

    useEffect(() => {
        const fetchAndSetPFP = async () => {
            try {
                if (chatData?.profilePicURL) {
                    setPfp({ uri: chatData.profilePicURL });
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchAndSetPFP();
    }, [chatData?.profilePicURL])

    return chatData ? (
        <View style={dynamicStyles.profileContainer}>
            <View style={{padding: 20}}>
                <Image source={pfp} style={dynamicStyles.displayPhoto} />
            </View>
            <View style={dynamicStyles.profileContent}>
                <Text style={dynamicStyles.titleText}>{chatData?.name}</Text>
            </View>
        </View>
    ) : (
        <View style={dynamicStyles.container}>
            <Text>No Profile Available</Text>
        </View>
    );
};

const createStyles = (additionalStyles, darkMode) => StyleSheet.create({
    profileContainer: {
        flex: 1,
        flexDirection:"row",
        backgroundColor: darkMode ? "slategrey" : "lightsteelblue",
        padding: 0,
        width: "100%",
        height: 70
    },
    profileContent: {
        marginLeft: 20,
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileDetails: {
        marginTop: 30,
        marginLeft: 30,
        marginBottom: 30,
    },
    moreAboutMe: {
        marginTop: 30,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold-condensed',
        marginBottom: 10,
    },
    displayPhoto: {
        width: 40,
        height: 40,
        borderRadius: 50, // Rounded display photo
        marginBottom: 20,
    },
    subHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});