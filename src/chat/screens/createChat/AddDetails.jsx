import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

// Import image picker
import { selectImage } from '../../../login/screens/profileCreation/ImagePicker';

// Import auth context
import { useAuth } from '../../../authContext/Auth-Context';

// Import firebase
import firestore from '@react-native-firebase/firestore';

// Import defaultPFP
import defaultPFP from '../../../swipe/profile_rendering/DefaultPFP.png'

function AddDetails({ navigation, route, darkMode }) {
    // Get params
    const { users } = route?.params || {};
    const { uploadChatPicture } = useAuth();
    
    // Params for title 
    const [title, setTitle] = useState("");
    const [invalidTitle, setInvalidTitle] = useState(false);

    // Params for pfp details
    const [selectingPicture, setSelectingPicture] = useState(false);
    const [invalidPicture, setInvalidPicture] = useState(false);
    const [profilePicURL, setProfilePicURL] = useState('');

    // Params for biography
    const [biography, setBiography] = useState("");
    const [inputHeight, setInputHeight] = useState(40);

    useEffect(() => {
        if (profilePicURL) {
            console.log('Updated profilePicURL:', profilePicURL);
        }
    }, [profilePicURL]);

    return (
        <ScrollView contentContainerStyle={styles(darkMode).scrollViewContainer}>
            <View style={styles(darkMode).container}>
                <Text style={styles(darkMode).headerText}>Create Group Chat</Text>

                <TouchableOpacity
                    onPress={async () => {
                        setSelectingPicture(true);
                        try {
                            const imagePath = await selectImage();
                            setProfilePicURL(imagePath);
                            setInvalidPicture(false);
                        } catch (error) {
                            setInvalidPicture(true);
                        } finally {
                            setSelectingPicture(false);
                        }
                    }}
                >
                    <View style={styles(darkMode).uploadButton}>
                        <Text style={styles(darkMode).uploadButtonText}>Upload Photo</Text>
                    </View>
                </TouchableOpacity>

                {profilePicURL ? (
                    <Image source={{ uri: profilePicURL }} style={styles(darkMode).profilePic} />
                ) : (
                    <Image source={defaultPFP} style={styles(darkMode).profilePic} />
                )}

                {invalidPicture && <Text style={styles(darkMode).errorText}>Invalid Picture</Text>}

                <View style={styles(darkMode).inputContainer}>
                    <Text style={styles(darkMode).labelText}>Group Chat Name</Text>
                    <TextInput
                        style={styles(darkMode).input}
                        placeholder="Enter group chat name"
                        placeholderTextColor={darkMode ? '#aaa' : '#666'}
                        value={title}
                        onChangeText={setTitle}
                    />
                </View>
                {invalidTitle && <Text style={styles(darkMode).errorText}>Title cannot be empty</Text>}

                <View style={[styles(darkMode).bioContainer, { height: Math.max(100, inputHeight) }]}>
                    <Text style={styles(darkMode).labelText}>Biography</Text>
                    <TextInput
                        style={styles(darkMode).bioInput}
                        placeholder="Enter group chat biography"
                        placeholderTextColor={darkMode ? '#aaa' : '#666'}
                        value={biography}
                        onChangeText={setBiography}
                        multiline
                        onContentSizeChange={(event) =>
                            setInputHeight(event.nativeEvent.contentSize.height)
                        }
                    />
                </View>

                <TouchableOpacity
                    style={styles(darkMode).button}
                    onPress={() => {
                        if (!selectingPicture && title) {
                            try {
                                console.log(title);
                                console.log(profilePicURL);
                                console.log(biography);
                                return firestore().collection('groupchats').add({
                                    name: title,
                                    profilePicURL: profilePicURL,
                                    bio: biography,
                                    users: users
                                }).then(
                                    doc => {
                                        firestore().collection('groupchats').doc(doc.id).update({
                                            chatId: doc.id
                                        }).then(() => {
                                            if (profilePicURL) {
                                                return uploadChatPicture(doc.id, profilePicURL)
                                            }
                                        }).then(() => {
                                            setTimeout(() => {}, 500);
                                            return navigation.navigate("GroupChat", { chatId: doc.id });
                                        });
                                    }
                                )
                            }
                            catch (error) {
                                console.error("error creating group chat: " + error);
                            }
                        } else {
                            setInvalidTitle(true);
                        }
                    }}
                >
                    <View style={styles(darkMode).startChatButton}>
                        <Text style={styles(darkMode).buttonText}>Create Chat</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = (darkMode) => StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: darkMode ? '#121212' : '#f0f0f0',
    },
    container: {
        flex: 1,
        width: '95%',
        alignItems: 'center',
        padding: 16,
        backgroundColor: darkMode ? '#121212' : '#f0f0f0',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: darkMode ? '#fff' : '#000',
        marginBottom: 20,
    },
    uploadButton: {
        backgroundColor: darkMode ? '#333' : '#007AFF',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginBottom: 20,
    },
    uploadButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    profilePic: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    errorText: {
        color: 'red',
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 16,
    },
    input: {
        width: '100%',
        borderColor: darkMode ? '#555' : 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: darkMode ? '#333' : '#fff',
        color: darkMode ? '#fff' : '#000',
    },
    labelText: {
        fontSize: 16,
        color: darkMode ? '#fff' : '#000',
        marginBottom: 8,
    },
    bioContainer: {
        width: '100%',
        marginBottom: 16,
    },
    bioInput: {
        width: '100%',
        borderColor: darkMode ? '#555' : 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: darkMode ? '#333' : '#fff',
        color: darkMode ? '#fff' : '#000',
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: darkMode ? '#555' : '#000080',
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginTop: 20,
    },
    startChatButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default AddDetails;
