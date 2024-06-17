import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import { useAuth } from '../../authContext/Auth-Context';
import { Styles } from '../../../assets/Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

function LoginScreen({ navigation, route }) {
    //set hooks for emails and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPassWordVisible] = useState(false);

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
            <Image
                source={require('../../../assets/pictures/profile.png')}
                style={styles.image}
            />
            <TextInput
                style={Styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <View style = {styles.passwordContainer}>
                <TextInput
                    style={[Styles.input, { flex: 1}]}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!passwordVisible}
                />
                <TouchableOpacity 
                    onPress={() => setPassWordVisible(!passwordVisible)}
                    style={styles.iconContainer}>
                    <Ionicons name={passwordVisible ? "eye" : "eye-off"} size = {24} color='gray'/>
                </TouchableOpacity>
            </View>
            {loginErrorMessage(loginError)}

            <Button title='Log In'
                    color='burlywood'
                    onPress={() => {
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
                <Text style={Styles.subHeader}>  Don't have an account?</Text>
                <Button 
                    title='Create an account'
                    color='burlywood'
                    onPress={() => navigation.navigate('CreateAccount')}>
                </Button>
            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        margin: 40,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '85%',
        marginVertical: 10,
        paddingLeft: 35
    },
    iconContainer: {
        marginLeft: 10,
        marginBottom: 8,
    },
});

export default LoginScreen;