import React, { useEffect, useState } from 'react';
import { View, Button, TextInput, Text } from 'react-native';

//import styles
import { Styles } from '../../../assets/Styles'

//import auth context
import { useAuth } from '../../authContext/Auth-Context'

function CreateAccountScreen({ navigation, route }) {
    //set hooks for emails and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);

    //get routes
    const createAccountError = route.params?.issue;

    const createAccountErrorMessage = (errorMsg) => {
        return (
            <View>
                {errorMsg == "noInput" && <Text>Fields cannot be empty</Text>}
                {errorMsg == "invalidPass" && <Text>Invalid Password</Text>}
                {errorMsg == "invalidEmail" && <Text>Invalid Email</Text>}
                {errorMsg == "inUse" && <Text>Email already in use</Text>}
                {errorMsg == "requestFailed" && <Text>Network Request Failed. Try again later</Text>}
            </View>
        )
    }
    
    //get create account function
    const { createAcc } = useAuth();

    useEffect(() => {
        if (password && confirmPassword) {
            setPasswordMatch(confirmPassword === password);
        } else {
            setPasswordMatch(true);
        }
    }, [setPassword, setConfirmPassword])

    return (
        <View style = {{
            flex: 1, 
            alignItems: 'center', 
            justifyContent: 'center'}}
        >    
            <Text>Enter your email</Text>
            <TextInput
                style={Styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />

            <Text>Enter your password</Text>
            <TextInput
                style={Styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Text>Re-enter your password</Text>
            <TextInput 
                style={Styles.input}
                placeholder='Password'
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            {!passwordMatch && <Text>Passwords do not match</Text>}

            {createAccountErrorMessage(createAccountError)}

            <Button title='Create Account' onPress={() => 
                    createAcc(email, password)
                    .catch(error => {
                        if (error.code === "auth/email-already-in-use") {
                            return navigation.navigate("CreateAccount", { issue:"inUse" });
                        } else if (error.code === "auth/invalid-email") {
                            return navigation.navigate("CreateAccount", { issue:"invalidEmail" });
                        } else if (error.code === "auth/network-request-failed") {
                            return navigation.navigate("CreateAccount", { issue:"requestFailed" });
                        } 
                    })
                
            } />
        </View> 
    );
}

export default CreateAccountScreen;