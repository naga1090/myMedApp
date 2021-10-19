import * as React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function LoginScreen({ navigation }) {
    return (
        <LoginScreenActions navigation={navigation} />
    )
}

class LoginScreenActions extends React.Component {
    render() {
        return (
            <text>Login</text>
        );
    }
}

export default LoginScreen;