import React, { useState } from 'react';
import { View, Button, TextInput } from 'react-native';

//import styles
import { Styles } from '../../../assets/Styles'

//import auth context
import { useAuth } from '../../authContext/Auth-Context'

function CreateProfileScreen({ navigation }) {
    
    const { createUserProfile } = useAuth();
    
    return (
        <View>



            <Button title='Create Account'
                onPress={() => {
                    createUserProfile();
                }}/>
        </View>
    );
}

export default CreateProfileScreen;