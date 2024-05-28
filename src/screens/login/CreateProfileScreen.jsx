import React, { useState } from 'react';
import { View, Text, Button, TextInput, ScrollView } from 'react-native';

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
        <ScrollView>
            <View>
                <Text>Enter your name</Text>
                <TextInput 
                    placeholder="Your name"
                    value={name}
                    onChangeText={setName}/>
            </View>
            <View>
                <Text>What instruments do you play?</Text>
                <TextInput 
                    placeholder="Your instrument"
                    value={instrument}
                    onChangeText={setInstrument}/>
            </View>
            <View>
                <Text>Add your biography</Text>
                <TextInput 
                    placeholder="Your biography"
                    value={bio}
                    onChangeText={setBio}/>
            </View>

            <Button title='Save your profile'
                onPress={() => 
                    createUserProfile(user, name, instrument, bio)
                }/>
        </ScrollView>
    );
}

export default CreateProfileScreen;