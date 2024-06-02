import React, { useState } from 'react';
import { View, Text, Button, TextInput, ScrollView } from 'react-native';

//import styles
import { Styles } from '../../../../assets/Styles'

//import auth context
import { useAuth } from '../../../authContext/Auth-Context'

//import instrumentPicker function
import { instrumentPicker } from './instrumentPicker/InstrumentPicker';

function CreateProfileScreen({ navigation, route }) {
    const { invalidName, invalidInstrument } = route?.params || {};

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
            {invalidName && <Text>Name cannot be empty</Text>}

            <View style={Styles.container}>
                <Text>What instruments do you play?</Text>
                {instrumentPicker(setInstrument)}
                
            </View>
            <View style={Styles.container}>
                <Text>Add your biography</Text>
                <TextInput 
                    style={Styles.input}
                    placeholder="Your biography"
                    value={bio}
                    onChangeText={setBio}/>
            </View>
            {invalidInstrument && <Text>You must select at least one instrument</Text>}

            <Button title='Save your profile'
                color='burlywood'
                onPress={() => {
                    if (name && instrument) {
                        return createUserProfile(user, name, instrument, bio);
                    } else {
                        const noName = name === "";
                        const noInst = instrument === null;
                        return navigation.navigate("CreateProfile", { invalidName:noName, invalidInstrument:noInst })
                    }
                }}/>
        </View>
    );
}

export default CreateProfileScreen;