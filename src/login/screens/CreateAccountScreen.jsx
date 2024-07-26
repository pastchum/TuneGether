import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Styles } from '../../../assets/Styles';
import { useAuth } from '../../authContext/Auth-Context';

function CreateAccountScreen({ navigation, route }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordVisible1, setPasswordVisible1] = useState(false);
    const [createAccountError, setCreateAccountError] = useState(null);

    const createAccountErrorMessage = (errorMsg) => {
        return (
            <View testID="error-message">
                {errorMsg === "noInput" && <Text>Fields cannot be empty</Text>}
                {errorMsg === "invalidPass" && <Text>Invalid Password</Text>}
                {errorMsg === "invalidEmail" && <Text>Invalid Email</Text>}
                {errorMsg === "inUse" && <Text>Email already in use</Text>}
                {errorMsg === "requestFailed" && <Text>Network Request Failed. Try again later</Text>}
            </View>
        );
    };

    const { createAcc } = useAuth();

    useEffect(() => {
        if (password && confirmPassword) {
            setPasswordMatch(confirmPassword === password);
        } else {
            setPasswordMatch(true);
        }
    }, [password, confirmPassword]);

    useEffect(() => {
        if (route.params?.issue) {
            setCreateAccountError(route.params.issue);
        }
    }, [route.params]);

    return (
        <View style={styles.container}>
            <Text>Enter your email</Text>
            <TextInput
                style={Styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                testID="email-input"
            />
            <Text>Enter your password</Text>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={Styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!passwordVisible}
                    testID="password-input"
                />
                <TouchableOpacity 
                    onPress={() => setPasswordVisible(!passwordVisible)}
                    style={styles.iconContainer1}
                    testID="password-toggle"
                >
                    <Ionicons name={passwordVisible ? "eye" : "eye-off"} size={24} color='gray'/>
                </TouchableOpacity>
            </View>
            <Text>Re-enter your password</Text>
            <View style={styles.confirmPasswordContainer}>
                <TextInput
                    style={Styles.input}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!passwordVisible1}
                    testID="confirm-password-input"
                />
                <TouchableOpacity 
                    onPress={() => setPasswordVisible1(!passwordVisible1)}
                    style={styles.iconContainer1}
                    testID="confirm-password-toggle"
                >
                    <Ionicons name={passwordVisible1 ? "eye" : "eye-off"} size={24} color='gray'/>
                </TouchableOpacity>
            </View>
            {!passwordMatch && <Text style={styles.errorText}>Passwords do not match</Text>}

            {createAccountErrorMessage(createAccountError)}

            <TouchableOpacity 
                disabled={!passwordMatch}
                onPress={() => {
                    if (createAcc) {
                        createAcc(email, password)
                            .catch(error => {
                                if (error.code === "auth/email-already-in-use") {
                                    return navigation.navigate("CreateAccount", { issue: "inUse" });
                                } else if (error.code === "auth/invalid-email") {
                                    return navigation.navigate("CreateAccount", { issue: "invalidEmail" });
                                } else if (error.code === "auth/network-request-failed") {
                                    return navigation.navigate("CreateAccount", { issue: "requestFailed" });
                                }
                            });
                    }
                }}
                testID="create-account-button"
            >
                <View style={Styles.startChatButton}>
                    <Text style={Styles.buttonText}>Create Account</Text>
                </View>
            </TouchableOpacity>
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
    errorText: {
        color: 'red',
        marginBottom: 16,
        fontFamily: 'Lora-Italic-VariableFont',
        fontSize: 14,
    }
});

export default CreateAccountScreen;
