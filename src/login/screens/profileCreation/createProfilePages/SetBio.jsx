import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

//import styles
import { Styles } from '../../../../../assets/Styles';

//import auth context
import { useAuth } from '../../../../authContext/Auth-Context';


function SetBio({ navigation, route }) {
    //get params
    const { name, instrument } = route?.params || {};

    //get create user profile function
    const { createUserProfile, user } = useAuth();
    
    //params for user profile details
    const [biography, setBiography] = useState("");
    const [inputHeight, setInputHeight] = useState(40);

    return (
        <View style={styles.container}>
            <View style={[styles.container, {height: Math.max(100, inputHeight)}]}>
                <Text>Add your biography</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Your biography"
                    value={biography}
                    onChangeText={setBiography}
                    multiline
                    onContentSizeChange={(event) => 
                        setInputHeight(event.nativeEvent.contentSize.height)}   
                    />
            </View>

            <TouchableOpacity 
                style={Styles.button}
                onPress={() => {
                    console.log(user);
                    console.log(name);
                    console.log(instrument);
                    console.log(biography);
                    createUserProfile(user, name, instrument, biography);
                }}>
                <View style={Styles.startChatButton}>
                    <Text style={Styles.buttonText}>Create Profile</Text>
                </View>
            </TouchableOpacity>

        </View>
    );
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        maxWidth: '95%',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f0f0f0',
    },
    inputContainer: {
        width: '90%',
        marginBottom: 16,
    },
    input: {
        width: (300), 
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
        textAlignVertical: 'top'
    }
};

export default SetBio;