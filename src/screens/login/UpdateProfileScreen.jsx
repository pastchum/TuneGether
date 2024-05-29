import React, { useState } from 'react';
import { View, Text, Button, TextInput, ScrollView } from 'react-native';

//import styles
import { Styles } from '../../../assets/Styles'

//import auth context
import { useAuth } from '../../authContext/Auth-Context'

function UpdateProfileScreen({ navigation }) {
    //get create user profile function
    const { createUserProfile, user, profileData } = useAuth();
    
    //params for user profile details
    const [name, setName] = useState("");
    const [instrument, setInstrument] = useState("");
    const [bio, setBio] = useState("");

    //list of instruments
    const instruments = [
        {
            instrumentName: 'Vocals',
            instrumentId: 0
        }, 
        {
            instrumentName: 'Bass',
            instrumentId: 1 
        }, 
        {
            instrumentName: 'Guitar',
            instrumentId: 2
        }, 
        {
            instrumentName: 'Drums',
            instrumentId: 3 
        }, 
        {
            instrumentName: 'Keyboard/Piano',
            instrumentId: 4 
        }];
    

    return (
        <View style={Styles.container}>
            <View style={Styles.container}>
                <Text>Enter your name</Text>
                <TextInput 
                    style={Styles.input}
                    placeholder={profileData.name}
                    value={name}
                    onChangeText={setName}/>
            </View>
            <View style={Styles.container}>
                <Text>What instruments do you play?</Text>

            </View>
            <View style={Styles.container}>
                <Text>Add your biography</Text>
                <TextInput 
                    style={Styles.input}
                    placeholder={profileData.bio}
                    value={bio}
                    onChangeText={setBio}/>
            </View>

            <Button title='Save your profile'
                onPress={() => {
                    return createUserProfile(user, name, instrument, bio);
                }}/>
        </View>
    );
}

export default UpdateProfileScreen;