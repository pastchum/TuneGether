import React, { useState } from 'react';
import { View, Text, Platform, Button, TextInput } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import styles from '../../components/Styles';
import { useAuth } from '../../context/Auth-context';

function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signIn } = useAuth();

    return (
        <View style = {{
            flex: 1, 
            alignItems: 'center', 
            justifyContent: 'center'}}
        >    
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button title='Log In' onPress={() => signIn(email, password)} />

            <View style = {{
                marginTop: 50
            }}>
                <Button 
                    title='Create an account'
                    onPress={() => navigation.navigate('CreateAccount')}>
                </Button>
            </View>
            

        </View>
    )
};

export default LoginScreen;