import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import defaultPFP from "./DefaultPFP.png";

export const renderProfileBar = (profileData, additionalStyles = {}, darkMode = false) => {
    console.log("Rendering profile bar for:", profileData.name, profileData.instrument);

    const dynamicStyles = createStyles(additionalStyles, darkMode);

    return profileData && Array.isArray(profileData.instrument) ? (
        <View style={dynamicStyles.profileContainer}>
            <View style={{padding: 20}}>
                <Image source={defaultPFP} style={dynamicStyles.displayPhoto} />
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