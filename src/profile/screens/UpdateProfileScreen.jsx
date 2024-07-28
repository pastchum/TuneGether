import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';

//import auth context
import { useAuth } from '../../authContext/Auth-Context';

import { selectImage } from "../../login/screens/profileCreation/ImagePicker";

//for instrument selection
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { instruments } from '../../../assets/instruments/Instruments';
import Icon from 'react-native-vector-icons/MaterialIcons';

import defaultPfp from "../../swipe/profile_rendering/DefaultPFP.png"

function UpdateProfileScreen({ navigation, route, darkMode }) {
    const { invalidName } = route?.params || {};
    const { createUserProfile, user, profileData, uploadProfilePicture } = useAuth();

    const [name, setName] = useState(profileData.name);
    const [profilePic, setProfilePic] = useState(profileData.profilePicURL
        ? profileData.profilePicURL
        : defaultPfp);
    const [instrument, setInstrument] = useState(profileData.instrument);
    const [bio, setBio] = useState(profileData.bio);

    const dynamicStyles = styles(darkMode);

    useEffect(() => {
        const fetchAndSetPFP = async () => {
            try {
                if (profileData?.profilePicURL) {
                    setProfilePic({ uri: profileData.profilePicURL });
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchAndSetPFP();
    }, [profileData?.profilePicURL])

    return (

        <ScrollView contentContainerStyle={dynamicStyles.container} testID="update-profile-container">
            <View style={dynamicStyles.profile}>
                <View style={dynamicStyles.profileAvatarContainer}>
                    <Image
                        source={require('../../../assets/pictures/profile.png')}
                        style={dynamicStyles.profileAvatar} />
                    <TouchableOpacity

                        style={dynamicStyles.cameraButton}
                        onPress={async () => {
                            const imagePath = await selectImage();
                            setProfilePic(imagePath);
                            console.log("setting picture: " + profilePic);
                          }}
                    >
                        <View style={dynamicStyles.cameraIconBackground}>
                            <FeatherIcon name="camera" size={20} color="burlywood" />
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={dynamicStyles.profileName}>John Doe</Text>
                <Text style={dynamicStyles.profileEmail}>john.doe@mail.com</Text>
                <View style={dynamicStyles.profileAction}>
                    <FeatherIcon color="#fff" name="edit" size={16} />
                </View>
            </View>

            
            <View style={dynamicStyles.inputContainer}>
                <Text style={dynamicStyles.label}>Enter your name</Text>
                <TextInput 
                    style={dynamicStyles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
                {invalidName && <Text style={dynamicStyles.errorText}>Name cannot be empty</Text>}
            </View>

            <View style={dynamicStyles.inputContainer}>
                <Text style={dynamicStyles.label}>What instruments do you play?</Text>
                <SectionedMultiSelect
                    items={instruments}
                    IconRenderer={Icon}
                    uniqueKey="id"
                    onSelectedItemsChange={setInstrument}
                    selectedItems={instrument}
                    selectText="Choose some instruments..."
                    searchPlaceholderText="Search instruments..."
                    modalAnimationType="slide"
                    colors={{primary: 'burlywood'}}
                    styles={{
                        backdrop: styles.multiSelectBackdrop,
                        selectToggle: styles.multiSelectBox,
                        chipContainer: styles.multiSelectChipContainer,
                        chipText: styles.multiSelectChipText,
                    }}
                />
                {!instrument && <Text style={dynamicStyles.errorText}>You must select at least one instrument</Text>}
            </View>

            <View style={dynamicStyles.inputContainer}>
                <Text style={dynamicStyles.label}>Add your biography</Text>
                <TextInput 
                    style={dynamicStyles.input}
                    placeholder="Bio"
                    value={bio}
                    onChangeText={setBio}
                    multiline
                />
            </View>

            <Button 
                title="Save your profile"
                color='burlywood'
                onPress={() => {
                    if (name) {
                        console.log(name, bio);
                        createUserProfile(user, name, instrument, bio, null);
                    } else {
                        navigation.navigate("UpdateProfile", { invalidName: !name, invalidInstrument: false });
                    }
                }}
            />

        </ScrollView>
    );
}

const styles = (darkMode) => StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: darkMode ? '#000' : '#fff',
    },
    inputContainer: {
        marginBottom: 20,
    },
    profile: {
        padding: 16,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: darkMode ? '#333' : '#fff',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#e3e3e3',
    },
    profileAvatarContainer: {
        borderWidth: 2,
        borderColor: 'burlywood',
        borderRadius: 105,
        padding: 2,
    },
    profileAvatar: {
        width: 100,
        height: 100,
        borderRadius: 9999,
    },
    cameraButton: {
        position: 'absolute',
        bottom: -7,
        right: 0,
        backgroundColor: 'transparent',
        padding: 5,
    },
    cameraIconBackground: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'burlywood',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: darkMode ? '#fff' : '#000',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        backgroundColor: darkMode ? '#555' : '#fff',
        color: darkMode ? '#fff' : '#000',
    },
    errorText: {
        color: 'red',
        marginTop: 5,
    },
    multiSelectBackdrop: {
        backgroundColor: 'rgba(255, 183, 0, 0.2)',
    },
    multiSelectBox: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#bbb',
        padding: 12,
        marginBottom: 12
    },
    multiSelectChipContainer: {
        borderWidth: 0,
        backgroundColor: 'burlywood',
        borderRadius: 8
    },
    multiSelectChipText: {
        color: '#222',
        fontSize: 14.5
    },
    button: {
        backgroundColor: 'burlywood',
        padding: 0,
        borderRadius: 60,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        width: 180,
        height: 40,
        alignItems:'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '700'
    },
});

export default UpdateProfileScreen;