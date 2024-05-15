import React from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import profilePic1 from './PFP1.png';
import profilePic2 from './PFP2.png';
import styles from '../../components/Styles';

class Profile {
    #name;
    #pic;
    #instrument;
    #bio;
    #id
    constructor (name, pic, instrument, bio, id) {
        this.#name = name;
        this.#pic = pic;
        this.#instrument = instrument;
        this.#bio = bio;
        this.#id = id;
    }

    getId() {
        return this.#id;
    }

    generateRender() {
        console.log("Rendering profile for:", this.#name);  // This will log the name to ensure the function is called
        return (
        <ScrollView style={styles.profileContainer}>
            <View style={{justifyContent:'center', alignItems: 'center'}}>
                <Text style={styles.titleText}>{this.#name}</Text>
                <Image source={this.#pic} style={styles.displayPhoto} />
                <View style={{marginTop: 30}}>
                    <Text style={styles.subHeader}>Instrument</Text>
                    <Text>{this.#instrument}</Text>
                    <View style={{marginTop: 30}}>
                        <Text style={styles.subHeader}>More About Me</Text>
                        <Text>{this.#bio}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )};
}

export const Profile1 = new Profile(
    'JAYLON TAN',
    profilePic1,
    'bass',
    'I love cats and I like to play bass!!',
    0
);

export const Profile2 = new Profile(
    'PATRICK THOMAS',
    profilePic2,
    'bass, guitar, keyboard',
    'I love dogs and I like to play bass, guitar or keyboard!!',
    1
);

export const profiles = [Profile1, Profile2];
