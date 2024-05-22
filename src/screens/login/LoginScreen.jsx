import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { useAuth } from '../../authContext/Auth-Context'
import { Styles } from '../../../assets/Styles';

function LoginScreen({ navigation }) {
    //set hooks for emails and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //get sign in function
    const { signIn } = useAuth();

    return (
        <View style = {Styles.container}>
            <TextInput
                style={Styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={Styles.input}
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
                <Text style={Styles.subHeader}>Don't have an account?</Text>
                <Button 
                    title='Create an account'
                    onPress={() => navigation.navigate('CreateAccount')}>
                </Button>
            </View>

        </View>
    )
};

export default LoginScreen;