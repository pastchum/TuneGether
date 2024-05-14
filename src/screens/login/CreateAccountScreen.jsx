import React, { useState } from 'react';
import { View, Text, Platform, Button, TextInput } from 'react-native';
import { firebase } from '@react-native-firebase/auth';

//import styles
import styles from '../../components/Styles';

//import auth context
import { useAuth } from '../../context/Auth-context';

function CreateAccountScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
                //create logic for ensuring password is same
            />

            <Button title='Create Account' onPress={() => createAcc(email, password)} />
        </View> 
    );
}

export default CreateAccountScreen;