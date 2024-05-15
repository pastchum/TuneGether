import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { profiles } from "../../Swiping/tmp_profiles/profiles";
import styles from "../../components/Styles";

function ProfileDetailsScreen( {route} ) {
    //get profile to be rendered
    const { profileId } = route.params;
    const profile = profiles.find(prf => prf.getId() === profileId);

    return (
        <View style={styles.container}>
            {profile.generateRender()}
            {/* button to start chat 
            **chat yet to be implemented** */}
            <TouchableOpacity style={styles.startChatButton}>
                <Text style={styles.buttonText}>Start Chat</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ProfileDetailsScreen; 