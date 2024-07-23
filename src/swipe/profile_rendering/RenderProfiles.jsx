import React from "react";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";
import { Styles } from "../../../assets/Styles";
import defaultPFP from "./DefaultPFP.png";
import { instruments } from "../../../assets/instruments/Instruments";
import getRatings from "../../ratings/GetRatings";

export const renderProfile = (profileData, additionalStyles = {}, darkMode = false) => {
    console.log("Rendering profile for:", profileData.name, profileData.instrument);

    const dynamicStyles = createStyles(additionalStyles, darkMode);

    return profileData && Array.isArray(profileData.instrument) ? (
        <ScrollView style={dynamicStyles.profileContainer}>
            <View style={dynamicStyles.profileContent}>
                <Text style={dynamicStyles.titleText}>{profileData?.name}</Text>
                <Image source={defaultPFP} style={dynamicStyles.displayPhoto} />
            </View>
            {getRatings(profileData)}
            <View style={dynamicStyles.profileDetails}>
                <Text style={dynamicStyles.subHeader}>I play</Text>
                <Text>
                    {profileData.instrument
                        .map(id => instruments
                            .find(instrument => id == instrument.id).name + "\n")
                    }
                </Text>
                <View style={dynamicStyles.moreAboutMe}>
                    <Text style={dynamicStyles.subHeader}>More About Me</Text>
                    <Text>{profileData?.bio}</Text>
                </View>
            </View>
        </ScrollView>
    ) : (
        <View style={dynamicStyles.container}>
            <Text>No Profile Available</Text>
        </View>
    );
};

const createStyles = (additionalStyles, darkMode) => StyleSheet.create({
    profileContainer: {
        flex: 1,
        backgroundColor: darkMode ? "slategrey" : "lightsteelblue",
        borderRadius: 15, 
        padding: 20,
        width: 370,
        ...additionalStyles.profileContainer,
    },
    profileContent: {
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
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        ...additionalStyles.titleText,
    },
    displayPhoto: {
        width: 300,
        height: 300,
        borderRadius: 30,
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