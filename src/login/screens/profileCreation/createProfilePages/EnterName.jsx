import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

//import auth context
import { useAuth } from '../../../../authContext/Auth-Context';

//import instrumentPicker function
import { instrumentPicker } from './profileCreation/InstrumentPicker';

function EnterName({ navigation, route }) {
    const { invalidName, invalidInstrument } = route?.params || {};

    //get create user profile function
    const { createUserProfile, user } = useAuth();
    
    //params for user profile details
    const [name, setName] = useState("");
    const [instrument, setInstrument] = useState("");
    const [bio, setBio] = useState("");

    return (
        <View style={Styles.container}>
            <View style={Styles.inputContainer}>
                <Text style={Styles.labelText}>Enter your name</Text>
                <TextInput 
                    style={Styles.input}
                    placeholder="Your name"
                    value={name}
                    onChangeText={setName}/>
            </View>
            {invalidName && <Text style={Styles.errorText}>Name cannot be empty</Text>}

            {invalidInstrument && <Text style={Styles.errorText}>You must select at least one instrument</Text>}

            <TouchableOpacity 
                style={Styles.button}
                onPress={() => {
                    if (name && instrument) {
                        return createUserProfile(user, name, instrument, bio);
                    } else {
                        const noName = name === "";
                        const noInst = instrument === null;
                        return navigation.navigate("CreateProfile", { invalidName:noName, invalidInstrument:noInst })
                    }
                }}>
                <Text style={Styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f0f0f0',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
    },
    errorText: {
        color: 'red',
        marginBottom: 16,
        fontFamily: 'Lora-Italic-VariableFont',
        fontSize: 14,
    },
    labelText: {
        fontFamily: 'Lora-Italic-VariableFont', 
        fontSize: 16,
        marginBottom: 8,
    },
    button: {
        backgroundColor: 'burlywood',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Lora-VariableFont_wght', 
    },
});

export default EnterName;