import * as React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function ConfirmSignUpScreen({ navigation }) {
    return (
        <ConfirmSignUpScreenActions navigation={navigation} />
    )
}

class ConfirmSignUpScreenActions extends React.Component {
    render() {
        return (
            <text>Confirm Screen</text>
        );
    }
}

export default ConfirmSignUpScreen;