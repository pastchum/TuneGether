import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { useAuth } from '../../authContext/Auth-Context'
import { Styles } from '../../../assets/Styles';

function LoginScreen({ navigation, route }) {
    //set hooks for emails and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //get route for login issues
    const loginError = route.params?.issue;

    const loginErrorMessage = (errorMsg) => {
        return (
            <View>
                {errorMsg == "noInput" && <Text>Fields cannot be empty</Text>}
                {errorMsg == "invalidPass" && <Text>Invalid Details</Text>}
                {errorMsg == "invalidEmail" && <Text>Invalid Email</Text>}
                {errorMsg == "noEmail" && <Text>Email not found</Text>}
                {errorMsg == "requestFailed" && <Text>Network Request Failed. Try again later</Text>}
            </View>
        )
    }

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

            {loginErrorMessage(loginError)}

            <Button title='Log In' onPress={() => {
                    if (email != "" && password != "") {
                            return signIn(email, password)
                                .catch (error => {
                                    if (error.code === 'auth/invalid-email') {
                                        return navigation.navigate("Login", {issue: "invalidEmail"});
                                    } else if (error.code === 'auth/invalid-credential') {
                                        return navigation.navigate("Login", {issue: "invalidPass"});
                                    } else if (error.code === 'auth/') {
                                        return navigation.navigate("Login", {issue: "invalidPass"});
                                    } else if (error.code === "auth/network-request-failed") {
                                        return navigation.navigate("CreateAccount", { issue:"requestFailed" });
                                    } 
                                });
                    } 
                    else {
                        return navigation.navigate("Login", {issue: "noInput"});
                    }
                }
            }/>

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