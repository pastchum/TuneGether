import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { profiles } from "../../Swiping/tmp_profiles/profiles";
import styles from "../../components/Styles";

function ProfileViewScreen( {route} ) {
    const { profileId } = route.params;
    const profile = profiles.find(prf => prf.getId() === profileId);
    return (
        <View style={styles.container}>
            {profile.generateRender()}
            <TouchableOpacity style={styles.startChatButton}>

            </TouchableOpacity>
        </View>
    )
}

export default ProfileViewScreen; 