import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, TouchableOpacity } from 'react-native';

import { Auth } from 'aws-amplify';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';

var regularExpressionEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
var regularExpressionPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

export default function SignUpScreen({ navigation }) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassowrd, setConfirmPassword] = useState('');

    async function signUp() {
        try {
            if(firstName === "" || lastName === "" || email === "" || password === "" || confirmPassowrd === ""){
                alert("Please fill out all fields");
                throw "Empty Fields";
            } else if(!regularExpressionEmail.test((email.toLowerCase()))){
                alert("Please enter a valid email");
                throw "Invalid email";
            } else if(!regularExpressionPassword.test(password)){
                alert("Password should be at least 8 chars, at least 1 upper char, 1 lower case char, 1 number, and 1 special char");
                throw "Invalid password";
            } else if (password !== confirmPassowrd){
                alert("Passwords do not match");
                throw "Passwords do not match";
            }
            const username = email; // auth needs username varibel to be passed in even if username is email
            await Auth.signUp({ 
                username,
                password,
                attributes: {
                    email,
                    "custom:first_name": firstName,
                    "custom:last_name": lastName
                } 
            });
            console.log('Sign-up Confirmed');
            navigation.navigate('ConfirmSignUpScreen', { emailUsername: email });
        } catch (error) {
            console.log(' Error signing up...', error);
        }
    }
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Create a new account</Text>
                <AppTextInput
                    value={firstName}
                    onChangeText={text => setFirstName(text)}
                    leftIcon="account"
                    placeholder="Enter first name"
                    autoCapitalize="none"
                    keyboardType="default"
                    textContentType="name"
                />
                <AppTextInput
                    value={lastName}
                    onChangeText={text => setLastName(text)}
                    leftIcon="account"
                    placeholder="Enter last name"
                    autoCapitalize="none"
                    keyboardType="default"
                    textContentType="name"
                />
                <AppTextInput
                    value={email}
                    onChangeText={text => setEmail(text)}
                    leftIcon="email"
                    placeholder="Enter email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                />
                <AppTextInput
                    value={password}
                    onChangeText={text => setPassword(text)}
                    leftIcon="lock"
                    placeholder="Enter password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                    textContentType="password"
                />
                <AppTextInput
                    value={confirmPassowrd}
                    onChangeText={text => setConfirmPassword(text)}
                    leftIcon="lock-reset"
                    placeholder="Enter password again"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                    textContentType="password"
                />
                <AppButton title="Sign Up" onPress={signUp} />
                <View style={styles.footerButtonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                        <Text style={styles.forgotPasswordButtonText}>
                            Already have an account? Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        color: '#202020',
        fontWeight: '500',
        marginVertical: 15
    },
    footerButtonContainer: {
        marginVertical: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    forgotPasswordButtonText: {
        color: 'tomato',
        fontSize: 18,
        fontWeight: '600'
    }
});