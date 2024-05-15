import React, { useState } from 'react';
import { View, Text, Platform, Button, TextInput } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import styles from '../../components/Styles';
import { useAuth } from '../../context/Auth-context';

function LoginScreen({ navigation }) {
    //set hooks for emails and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //get sign in function
    const { signIn } = useAuth();

    return (
        <View style = {styles.container}>
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

            {/* for create account */}
            <View style = {{
                marginTop: 50
            }}>
                <Text style={styles.subHeader}>Don't have an account?</Text>
                <Button 
                    title='Create an account'
                    onPress={() => navigation.navigate('CreateAccount')}>
                </Button>
            </View>

        </View>
    )
};

export default LoginScreen;