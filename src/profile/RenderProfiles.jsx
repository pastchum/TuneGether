import React from "react";
import { ScrollView, View, Text, Image } from "react-native";
import { Styles } from "../../assets/Styles";
import defaultPFP from "./DefaultPFP.png";

export const renderProfile = (profileData) => {
    console.log("Rendering profile for:", profileData.name); 
    return profileData != null ? (
        <ScrollView style={Styles.profileContainer}>
            <View style={{justifyContent:'center', alignItems: 'center'}}>
                <Text style={Styles.titleText}>{profileData.name}</Text>
                <Image source={defaultPFP} style={Styles.displayPhoto} />
            </View>
            <View style={{marginTop: 30, marginLeft: 30, marginBottom: 30}}>
                    <Text style={Styles.subHeader}>I play</Text>
                    <Text>{profileData.instrument}</Text>
                    <View style={{marginTop: 30}}>
                        <Text style={Styles.subHeader}>More About Me</Text>
                        <Text>{profileData.bio}</Text>
                    </View>
            </View>
        </ScrollView>
    ) : (
        <View style={Styles.container}>
            <Text>
                No Profile Available
            </Text>
        </View>
    )
};
