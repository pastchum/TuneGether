import React, { useState } from 'react';
import { View, Button, TextInput } from 'react-native';

//import styles
import styles from '../../../assets/Styles'

//import auth context
import { useAuth } from '../../authContext/Auth-Context'

function CreateAccountScreen() {
    //set hooks for emails and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //get create account function
    const { createAcc } = useAuth();

    return (
        <View style = {{
            flex: 1, 
            alignItems: 'center', 
            justifyContent: 'center'}}
        >    
            <TextInput
                style={styles.input}
                placeholder="Enter your Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter your Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput 
                style={styles.input}
                placeholder='Re-enter your Password'
                onChangeText={null}
                secureTextEntry
                //create logic for ensuring password is same to be done at later date
            />

            <Button title='Create Account' onPress={() => createAcc(email, password)} />
        </View> 
    );
}

export default CreateAccountScreen;