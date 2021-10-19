import * as React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function SignUpScreen({ navigation }) {
    return (
        <SignUpScreenActions navigation={navigation} />
    )
}

class SignUpScreenActions extends React.Component {
    render() {
        return (
            <text>Sign Up</text>
        );
    }
}

export default SignUpScreen;