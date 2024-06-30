import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';

//import styles
import { Styles } from '../../../assets/Styles';

//import auth context
import { useAuth } from '../../authContext/Auth-Context';

//import instrumentPicker function
//import { instrumentPicker } from '../../login/screens/profileCreation/InstrumentPicker';

function UpdateProfileScreen({ navigation, route }) {
    const { invalidName, invalidInstrument } = route?.params;
    //get create user profile function
    const { createUserProfile, user, profileData } = useAuth();
    
    //params for user profile details
    const [name, setName] = useState(profileData.name);
    const [instrument, setInstrument] = useState(profileData.instrument);
    const [bio, setBio] = useState(profileData.bio);

    return (
        <View style={Styles.container}>
            <View style={Styles.inputContainer}>
                <Text>Enter your name</Text>
                <TextInput 
                    style={Styles.input}
                    placeholder={profileData.name}
                    value={name}
                    onChangeText={setName}/>
            </View>
            {invalidName && <Text>Name cannot be empty</Text>}

            <View style={Styles.inputContainer}>
                <Text>What instruments do you play?</Text>
                {/*instrumentPicker(setInstrument)*/}
            </View>
            {invalidInstrument && <Text>You must select at least one instrument</Text>}

            <View style={Styles.inputContainer}>
                <Text>Add your biography</Text>
                <TextInput 
                    style={Styles.input}
                    placeholder={profileData.bio}
                    value={bio}
                    onChangeText={setBio}/>
            </View>

            <Button title='Save your profile'
                onPress={() => {
                    if (name && instrument) {
                        console.log(name + " " + instrument + " " + bio);
                        return createUserProfile(user, name, instrument, bio);
                    } else {
                        const noName = name === "";
                        const noInst = instrument === null;
                        return navigation.navigate("UpdateProfile", { invalidName:noName, invalidInstrument:noInst })
                    }
                }}/>
        </View>
    );
}

export default UpdateProfileScreen;