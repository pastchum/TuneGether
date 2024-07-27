import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";
import defaultPFP from "./DefaultPFP.png";
import { instruments } from "../../../assets/instruments/Instruments";
import getRatings from "../../ratings/GetRatings";
import { useAuth } from "../../authContext/Auth-Context";

export const RenderProfile = ({ profileData, additionalStyles = {}, darkMode = false }) => {
    const [pfp, setPfp] = useState(defaultPFP);

    if (!profileData) {
        return (
            <View style={styles.container}>
                <Text>No Profile Available</Text>
            </View>
        );
    }

    useEffect(() => {
        const fetchAndSetPFP = async () => {
            try {
                if (profileData?.profilePicURL) {
                    const response = await fetch(profileData.profilePicURL)
                    const blob = await response.blob()
                    const objectURL = URL.createObjectURL(blob)
                    //set img
                    setPfp({ uri: objectURL });
                    console.log(objectURL);

                    return () => URL.revokeObjectURL(objectURL)
                }
            } catch (error) {
                try {
                    if (profileData?.profilePicURL) {
                        setPfp({ uri: profileData.profilePicURL });
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }

        fetchAndSetPFP();
    }, [profileData?.profilePicURL])

    console.log("Rendering profile for:", profileData.name, profileData.instrument);

    const dynamicStyles = createStyles(additionalStyles, darkMode);

    return (
        <ScrollView style={dynamicStyles.profileContainer}>
            <View style={dynamicStyles.profileContent}>
                <Text style={dynamicStyles.titleText}>{profileData?.name}</Text>
                <Image source={pfp} style={dynamicStyles.displayPhoto} />
            </View>
            {getRatings(profileData)}
            <View style={dynamicStyles.profileDetails}>
                <Text style={dynamicStyles.subHeader}>I play</Text>
                <Text>
                    {Array.isArray(profileData.instrument) ?(
                    profileData.instrument
                        .map(id => {
                            const instrument = instruments.find(instrument => id === instrument.id);
                            return instrument ? instrument.name + "\n" : "";
                        }) 
                    ) : null
                    }
                </Text>
                <View style={dynamicStyles.moreAboutMe}>
                    <Text style={dynamicStyles.subHeader}>More About Me</Text>
                    <Text>{profileData?.bio}</Text>
                </View>
            </View>
        </ScrollView>
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