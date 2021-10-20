import * as React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppButton from '../components/AppButton';

function LandingScreen({ navigation }) {
    return (
        <LandingScreenActions navigation={navigation} />
    )
}

class LandingScreenActions extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <AppButton title="Already have an account? Login" onPress={() => this.props.navigation.navigate('LoginScreen')} />
                <View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUpScreen')}>
                        <Text style={styles.forgotPasswordButtonText}>
                            Don't have an account? Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* <Text>{JSON.stringify(this.props, null, 2)}</Text> */}
            </View>
        );
    }
}

export default LandingScreen;

const styles = StyleSheet.create({
    forgotPasswordButtonText: {
        color: 'tomato',
        fontSize: 18,
        fontWeight: '600'
    }
});