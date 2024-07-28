import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import defaultPFP from "./DefaultPFP.png";

export const RenderProfileBar = ({ profileData, additionalStyles = {}, darkMode = false }) => {
    console.log("Rendering profile bar for:", profileData.name, profileData.instrument);

    const [pfp, setPfp] = useState(defaultPFP);
    const dynamicStyles = createStyles(additionalStyles, darkMode);

    useEffect(() => {
        const fetchAndSetPFP = async () => {
            try {
                if (profileData?.profilePicURL) {
                    setPfp({ uri: profileData.profilePicURL });
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchAndSetPFP();
    }, [profileData?.profilePicURL])

    return profileData && Array.isArray(profileData.instrument) ? (
        <View style={dynamicStyles.profileContainer}>
            <View style={{ padding: 20 }}>
                <Image source={pfp} style={dynamicStyles.displayPhoto} />
            </View>
            <View style={dynamicStyles.profileContent}>
                <Text style={dynamicStyles.titleText}>{profileData?.name}</Text>
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
        flexDirection: "row",
        backgroundColor: darkMode ? "slategrey" : "lightsteelblue",
        padding: 0,
        width: "100%",
        height: 70,
        borderColor: 'grey',
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        ...additionalStyles.profileContainer,
    },
    profileContent: {
        marginLeft: 20,
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        ...additionalStyles.profileContent,
    },
    profileDetails: {
        marginTop: 30,
        marginLeft: 30,
        marginBottom: 30,
        ...additionalStyles.profileDetails,
    },
    moreAboutMe: {
        marginTop: 30,
        ...additionalStyles.moreAboutMe,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: darkMode ? '#fff' : '#000',
        ...additionalStyles.titleText,
    },
    displayPhoto: {
        width: 40,
        height: 40,
        borderRadius: 50,
        marginBottom: 20,
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

export default RenderProfileBar;
