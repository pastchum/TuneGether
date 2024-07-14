import React, { useState } from 'react';
import { View, Text, Button, TextInput, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { launchImageLibrary } from 'react-native-image-picker';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

//import styles
import { Styles } from '../../../assets/Styles';

//import auth context
import { useAuth } from '../../authContext/Auth-Context';

//import instrumentPicker function
//import { instrumentPicker } from '../../login/screens/profileCreation/InstrumentPicker';

function UpdateProfileScreen({ navigation, route }) {
    const { invalidName, invalidInstrument } = route?.params || {};
    const { createUserProfile, user, profileData } = useAuth();

    const [name, setName] = useState(profileData.name);
    const instrument = profileData.instrument;
    const [bio, setBio] = useState(profileData.bio);

    return (
        <ScrollView contentContainerStyle={styles.container}>

        <View style={styles.profile}>
            <View style={styles.profileAvatarContainer}>
                <Image
                source={require('../../../assets/pictures/profile.png')}
                style={styles.profileAvatar} />
                 <TouchableOpacity
                        style={styles.cameraButton}
                        onPress={() => {
                            // handle onPress
                          }}
                    >
                         <View style={styles.cameraIconBackground}>
                            <FeatherIcon name="camera" size={20} color="burlywood" />
                        </View>
                </TouchableOpacity>
            </View>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>john.doe@mail.com</Text>
                
              <View style={styles.profileAction}>
                <FeatherIcon color="#fff" name="edit" size={16} />
              </View>
          </View>
            
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Enter your name</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
                {invalidName && <Text style={styles.errorText}>Name cannot be empty</Text>}
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>What instruments do you play?</Text>
                {/* Implement instrument picker here */}
                {invalidInstrument && <Text style={styles.errorText}>You must select at least one instrument</Text>}
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Add your biography</Text>
                <TextInput 
                    style={styles.input}
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
                        createUserProfile(user, name, instrument, bio, photo);
                    } else {
                        navigation.navigate("UpdateProfile", { invalidName: !name, invalidInstrument: false });
                    }
                }}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    profile: {
        padding: 16,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
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
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#fff',
    },
    errorText: {
        color: 'red',
        marginTop: 5,
    }
});

export default UpdateProfileScreen;