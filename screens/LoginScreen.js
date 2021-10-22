import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, TouchableOpacity, Pressable, TextInput } from 'react-native';

import { Auth } from 'aws-amplify';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';

import Modal from "modal-enhanced-react-native-web";

var regularExpressionEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
var regularExpressionPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

export default function LoginScreen({ navigation, updateAuthState }) {
    const [email, setEmail] = useState('');
    const [forgotEmail, setForgotEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authCode, setAuthCode] = useState('');
    const [forgotPassword, setForgotPassword] = useState('');
    const [forgotPasswordConf, setForgotPasswordConf] = useState('');

    async function Login() {
        try {
            if (email === "" || password === "") {
                alert("Please fill out all fields");
                throw "Empty Fields";
            } else if (!regularExpressionEmail.test((email.toLowerCase()))) {
                alert("Please enter a valid email");
                throw "invalid email";
            } else if (!regularExpressionPassword.test(password)) {
                alert("password should be at least 8 chars, at least 1 upper char, 1 lower case char, 1 number, and 1 special char");
                throw "invalid password";
            }
            const username = email; // auth needs username varibel to be passed in even if username is email
            await Auth.signIn(username, password);
            console.log('Success');
            updateAuthState('loggedIn');
        } catch (error) {
            console.log(' Error loggin in...', error);
        }
    }

    const [isInitialModalVisible, setInitialModalVisible] = useState(false);
    const toggleInitialModal = () => {
        setInitialModalVisible(!isInitialModalVisible);
    };

    const [isVeriModalVisible, setVeriModalVisible] = useState(false);
    const toggleVeriModal = () => {
        setVeriModalVisible(!isVeriModalVisible);
    };

    async function nextButton() {
        try {
            if (forgotEmail === "") {
                alert("Please fill out all fields");
                throw "Empty Fields";
            } else if (!regularExpressionEmail.test((forgotEmail.toLowerCase()))) {
                alert("Please enter a valid email");
                throw "invalid email";
            }
            const username = forgotEmail; // auth needs username varibel to be passed in even if username is email
            await Auth.forgotPassword(username);
            toggleInitialModal();
            toggleVeriModal();
        } catch (error) {
            console.log(' Error reseting password in...', error);
            if (error.name === "UserNotFoundException") {
                alert("Profile does not exist")
            }
        }
    }

    async function resetPassowrd() {
        try {
            if (authCode === "" || forgotPassword === "" || forgotPasswordConf === "") {
                alert("Please fill out all fields");
                throw "Empty Fields";
            } else if (!regularExpressionPassword.test(forgotPassword)) {
                alert("password should be at least 8 chars, at least 1 upper char, 1 lower case char, 1 number, and 1 special char");
                throw "invalid password";
            } else if (forgotPassword !== forgotPasswordConf){
                alert("Passwords do not match");
                throw "Passwords do not match";
            }
            const username = forgotEmail; // auth needs username varibel to be passed in even if username is email
            const code = authCode; // ^^
            const new_password = forgotPassword; // ^^
            await Auth.forgotPasswordSubmit(username, code, new_password);
            alert("Password has been reset!");
            console.log("Password Reset");
            toggleVeriModal();
        } catch (error) {
            console.log(' Error reseting password in...', error);
            if (error.name == "CodeMismatchException") {
                alert("Incorrent verification code. Please enter correct code.")
            }
        }
    }

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Login to your account</Text>
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
                    value={password}
                    onChangeText={text => setPassword(text)}
                    leftIcon="lock"
                    placeholder="Enter password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                    textContentType="password"
                />
                <AppButton title="Login" onPress={Login} />
                <View style={styles.footerButtonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
                        <Text style={styles.signUpButtonText}>
                            Don't have an account? Sign Up
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleInitialModal}>
                        <Text style={styles.forgotPasswordButtonText}>
                            Forgot password? Reset it
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal animationType="slide" transparent={true} isVisible={isInitialModalVisible} >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTextTitle}> Forgot Password </Text>
                        <Text style={styles.textStyle}> Enter your email, a verification code will be sent to the email if the account exists.</Text>
                        <AppTextInput
                            value={forgotEmail}
                            onChangeText={text => setForgotEmail(text)}
                            leftIcon="account"
                            placeholder="Enter email"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            textContentType="emailAddress"
                        />
                        <TouchableOpacity onPress={nextButton}>
                            <Text style={styles.modalNextButton}>Next&#8594;</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={toggleInitialModal} >
                            <Text style={styles.textStyle}>  Close  </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal animationType="slide" transparent={true} isVisible={isVeriModalVisible} >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTextTitle}> Forgot Password </Text>
                        <Text style={styles.textStyle}> Verification code sent to {forgotEmail}, enter it below with new password:</Text>
                        <AppTextInput
                            value={authCode}
                            onChangeText={text => setAuthCode(text)}
                            leftIcon="numeric"
                            placeholder="Enter verification code"
                            keyboardType="numeric"
                        />
                        <AppTextInput
                            value={forgotPassword}
                            onChangeText={text => setForgotPassword(text)}
                            leftIcon="lock"
                            placeholder="Enter new password"
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry
                            textContentType="password"
                        />
                        <AppTextInput
                            value={forgotPasswordConf}
                            onChangeText={text => setForgotPasswordConf(text)}
                            leftIcon="lock-reset"
                            placeholder="Enter new password again"
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry
                            textContentType="password"
                        />
                        <TouchableOpacity onPress={resetPassowrd}>
                            <Text style={styles.modalNextButton}>Reset Password</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={toggleVeriModal} >
                            <Text style={styles.textStyle}>  Close  </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

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
    signUpButtonText: {
        color: 'tomato',
        fontSize: 18,
        fontWeight: '600',
    },
    forgotPasswordButtonText: {
        color: 'tomato',
        fontSize: 18,
        fontWeight: '600',
        marginTop: 10
    },

    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 100,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 40,
        elevation: 10
    },
    buttonClose: {
        backgroundColor: "tomato",
        position: 'absolute',
        // top: 200, 
        bottom: 0,
        marginBottom: 10
    },
    textStyle: {
        color: "black",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    modalTextTitle: {
        // color: 'tomato',
        marginBottom: 15,
        position: 'absolute',
        top: 0,
        bottom: 0,
        fontSize: 30,
        fontWeight: 600,
        marginTop: 5
    },
    closeButtonModal: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 150,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 40,
        elevation: 10
    },
    modalTextInput: {
        backgroundColor: '#f9f9f9',
        borderRadius: 25,
        flexDirection: 'row',
        padding: 15,
        marginVertical: 10
    },
    modalNextButton: {
        color: 'tomato',
        fontSize: 18,
        fontWeight: '600',
        marginTop: -5
    },
});