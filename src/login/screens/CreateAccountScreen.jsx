import React, { useEffect, useState } from 'react';
import { View, Button, TextInput, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

//import styles
import { Styles } from '../../../assets/Styles';

//import auth context
import { useAuth } from '../../authContext/Auth-Context';

function CreateAccountScreen({ navigation, route }) {
    //set hooks for emails and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [passwordVisible, setPassWordVisible] = useState(false);
    const [passwordVisible1, setPassWordVisible1] = useState(false);


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
            <View style = {styles.passwordContainer}>
                <TextInput
                    style={Styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!passwordVisible}
                    />
                    <TouchableOpacity 
                        onPress={() => setPassWordVisible(!passwordVisible)}
                        style={styles.iconContainer1}>
                        <Ionicons name={passwordVisible ? "eye" : "eye-off"} size = {24} color='gray'/>
                    </TouchableOpacity>

            </View>
            <Text>Re-enter your password</Text>
            <View style = {styles.confirmPasswordContainer}>
                <TextInput
                style={Styles.input}
                placeholder='Password'
                onChangeText={setConfirmPassword}
                secureTextEntry = {!passwordVisible1}
            />
            <TouchableOpacity 
                onPress={() => setPassWordVisible1(!passwordVisible1)}
                style={styles.iconContainer1}>
                <Ionicons name={passwordVisible1 ? "eye" : "eye-off"} size = {24} color='gray'/>
            </TouchableOpacity>
            </View>
            {!passwordMatch && <Text>Passwords do not match</Text>}

            {createAccountErrorMessage(createAccountError)}

            <Button title='Create Account' 
                    color='burlywood'
                    onPress={() => 
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '65%',
        marginVertical: 10,
        paddingLeft: 35
    },
    confirmPasswordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '65%',
        marginVertical: 10,
        paddingLeft: 35
    },
    iconContainer1: {
        marginLeft: 10,
        marginBottom: 8,
    },
});

export default CreateAccountScreen;