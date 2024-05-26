import React, { useState } from 'react';
import { View, Button, TextInput } from 'react-native';

//import styles
import { Styles } from '../../../assets/Styles'

//import auth context
import { useAuth } from '../../authContext/Auth-Context'

function CreateAccountScreen({ navigation, route }) {
    //set hooks for emails and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //get routes
    const createAccountError = route.params?.issue;

    const createAccountErrorMessage = (errorMsg) => {
        return (
            <View>
                {errorMsg == "noInput" && <Text>Fields cannot be empty</Text>}
                {errorMsg == "invalidPass" && <Text>Invalid Password</Text>}
                {errorMsg == "invalidEmail" && <Text>Invalid Email</Text>}
                {errorMsg == "noEmail" && <Text>Email not found</Text>}
                {errorMsg == "inUse" && <Text>Email already in use</Text>}
                {errorMsg == "requestFailed" && <Text>Network Request Failed. Try again later</Text>}
            </View>
        )
    }
    
    //get create account function
    const { createAcc } = useAuth();

    return (
        <View style = {{
            flex: 1, 
            alignItems: 'center', 
            justifyContent: 'center'}}
        >    
            <TextInput
                style={Styles.input}
                placeholder="Enter your Email"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={Styles.input}
                placeholder="Enter your Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput 
                style={Styles.input}
                placeholder='Re-enter your Password'
                onChangeText={null}
                secureTextEntry
                //create logic for ensuring password is same to be done at later date
            />

            {createAccountErrorMessage(createAccountError)}

            <Button title='Create Account' onPress={() => 
                createAcc(email, password)
                .catch(error => {
                    if (error.code === "auth/email-already-in-use") {
                        return navigation.navigate("CreateAccount", { issue:"inUse" });
                    } else if (error.code === "auth/network-request-failed") {
                        return navigation.navigate("CreateAccount", { issue:"requestFailed" });
                    } 
                })
                
            } />
        </View> 
    );
}

export default CreateAccountScreen;