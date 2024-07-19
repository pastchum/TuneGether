import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import defaultPFP from "./DefaultPFP.png";

export const renderProfileBar = (profileData) => {
    console.log("Rendering profile bar for:", profileData.name, profileData.instrument);

    return profileData && Array.isArray(profileData.instrument) ? (
        <View style={styles.profileContainer}>
            <View style={{padding: 20}}>
                <Image source={defaultPFP} style={styles.displayPhoto} />
            </View>
            <View style={styles.profileContent}>
                <Text style={styles.titleText}>{profileData?.name}</Text>
            </View>
        </View>
    ) : (
        <View style={styles.container}>
            <Text>No Profile Available</Text>
        </View>
    );
};

export const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        flexDirection:"row",
        backgroundColor: "#eaf7e3",
        borderRadius: 15, // Rounded corners
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