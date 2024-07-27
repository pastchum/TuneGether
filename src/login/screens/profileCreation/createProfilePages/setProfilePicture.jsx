import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { selectImage } from '../ImagePicker';
import defaultPFP from "../../../../swipe/profile_rendering/DefaultPFP.png";


function SetProfilePicture({ navigation, route }) {
    const { name } = route?.params || {};
    
    //params for user profile details
    const [selectingPicture, setSelectingPicture] = useState(false);
    const [invalidPicture, setInvalidPicture] = useState(false);
    const [profilePicURL, setProfilePicURL] = useState('');

    useEffect(() => {
        if (profilePicURL) {
            console.log('Updated profilePicURL:', profilePicURL);
        }
    }, [profilePicURL]);

    return (
        <View style={Styles.container}>
            <View>
                <Text style={Styles.labelText}>
                    Add your Profile Picture
                </Text>
            </View>
            {profilePicURL? 
                (<Image source={{ uri: profilePicURL }} style={{ width: 200, height: 200 }} />) : 
                (<Image source={defaultPFP} style={{ width: 200, height: 200 }} />)}
            <TouchableOpacity
                onPress={async() => {
                        setSelectingPicture(true);
                        try {
                            const imagePath = await selectImage();
                            setProfilePicURL(imagePath);
                            setInvalidPicture(false);
                        } catch(error) {
                            setInvalidPicture(true);
                        } finally {
                            setSelectingPicture(false);
                        }
                    }
                }
                >
                <View style={Styles.inputContainer}>
                    <Text style={Styles.labelText}>Press here to upload</Text>

                </View>
            </TouchableOpacity>

            {invalidPicture && <Text style={Styles.errorText}>Invalid Picture</Text>}

            <TouchableOpacity 
                style={Styles.button}
                onPress={() => {
                    while (!selectingPicture) {
                        if (profilePicURL) {
                            console.log(profilePicURL);
                            return navigation.navigate("SetInstrument", { name: name, profilePicURL: profilePicURL });
                        } else {
                            return navigation.navigate("SetInstrument", { name: name, profilePicURL: "" });
                        }
                    }
                }}>
                <Text style={Styles.buttonText}>
                    {profilePicURL ? "Next" : "Continue without picture" }
                </Text>
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
        marginTop: 20,
        borderColor: 'black',
        borderRadius: 5,
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

export default SetProfilePicture;