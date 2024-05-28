import React, { useState } from 'react';
import { View, Text, Button, TextInput, ScrollView } from 'react-native';
import SearchableDropDown from 'react-native-searchable-dropdown';

//import styles
import { Styles } from '../../../assets/Styles'

//import auth context
import { useAuth } from '../../authContext/Auth-Context'

function CreateProfileScreen({ navigation }) {
    //get create user profile function
    const { createUserProfile, user } = useAuth();
    
    //params for user profile details
    const [name, setName] = useState("");
    const [instrument, setInstrument] = useState("");
    const [bio, setBio] = useState("");

    return (
        <View style={Styles.container}>
            <View style={Styles.container}>
                <Text>Enter your name</Text>
                <TextInput 
                    style={Styles.input}
                    placeholder="Your name"
                    value={name}
                    onChangeText={setName}/>
            </View>
            <View style={Styles.container}>
                <Text>What instruments do you play?</Text>
                <SearchableDropDown 
                    placeholder="Your instrument"
                    value={instrument}
                    onChangeText={setInstrument}/>
            </View>
            <View style={Styles.container}>
                <Text>Add your biography</Text>
                <TextInput 
                    style={Styles.input}
                    placeholder="Your biography"
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

export default CreateProfileScreen;