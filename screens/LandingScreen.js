import * as React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function LandingScreen({ navigation }) {
    return (
        <LandingScreenActions navigation={navigation} />
    )
}

class LandingScreenActions extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <button onClick={() => this.props.navigation.navigate('LoginScreen')}>Login</button>
                <button onClick={() => this.props.navigation.navigate('SignUpScreen')}>Sign Up</button>
            </View>
        );
    }
}

export default LandingScreen;