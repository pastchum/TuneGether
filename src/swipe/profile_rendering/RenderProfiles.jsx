import React from "react";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";
import { Styles } from "../../../assets/Styles";
import defaultPFP from "./DefaultPFP.png";
import { instruments } from "../../../assets/instruments/Instruments";

export const renderProfile = (profileData) => {
    console.log("Rendering profile for:", profileData.name, profileData.instrument);

    return profileData && Array.isArray(profileData.instrument) ? (
        <ScrollView style={styles.profileContainer}>
            <View style={styles.profileContent}>
                <Text style={styles.titleText}>{profileData?.name}</Text>
                <Image source={defaultPFP} style={styles.displayPhoto} />
            </View>
            <View style={styles.profileDetails}>
                <Text style={styles.subHeader}>I play</Text>
                <Text>
                    {profileData.instrument
                        .map(id => instruments
                            .find(instrument => id == instrument.id).name + "\n")
                    }
                </Text>
                <View style={styles.moreAboutMe}>
                    <Text style={styles.subHeader}>More About Me</Text>
                    <Text>{profileData?.bio}</Text>
                </View>
            </View>
        </ScrollView>
    ) : (
        <View style={styles.container}>
            <Text>No Profile Available</Text>
        </View>
    );
};

export const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        backgroundColor: "#eaf7e3",
        borderRadius: 15, // Rounded corners
        padding: 20,
        width: 370,
    },
    profileContent: {
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
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    displayPhoto: {
        width: 100,
        height: 100,
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