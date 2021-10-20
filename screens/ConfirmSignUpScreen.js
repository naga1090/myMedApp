import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, TouchableOpacity } from 'react-native';

import { Auth } from 'aws-amplify';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';

export default function ConfirmSignUpScreen({ route, navigation }) {

    const { emailUsername } = route.params;
    const [email, setEmail] = useState('');
    const [authCode, setAuthCode] = useState('');

    async function confirmSignUp() {
        try {
            if(email === "" || authCode === ""){
                alert("Please fill out all fields");
                throw "Empty Fields";
            }
            await Auth.confirmSignUp(email, authCode);
            console.log('Code confirmed');
            navigation.navigate('HomeScreen');
        } catch (error) {
            console.log('Verification code does not match. Please enter a valid verification code or resend it.',error.code);
        }
    }
    async function resendConfirmationCode() {
        try {
            await Auth.resendSignUp(emailUsername);
            console.log('Code resent successfully');
        } catch(error){
            console.log('Error resending code: ', error);
        }
    }
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Confirm Sign Up</Text>
                <AppTextInput
                    value={email}
                    onChangeText={text => setEmail(text)}
                    leftIcon="account"
                    placeholder="Enter email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                />
                <AppTextInput
                    value={authCode}
                    onChangeText={text => setAuthCode(text)}
                    leftIcon="numeric"
                    placeholder="Enter verification code"
                    keyboardType="numeric"
                />
                <AppButton title="Confirm Sign Up" onPress={confirmSignUp} />
                <View style={styles.footerButtonContainer}>
                    <TouchableOpacity onPress={resendConfirmationCode}>
                        <Text style={styles.forgotPasswordButtonText}>
                            Resend verification code?
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