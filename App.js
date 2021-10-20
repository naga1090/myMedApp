// Import components and pacakges
import * as React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Amplify from 'aws-amplify';
import config from './src/aws-exports';

// import screens
import HomeScreen from './screens/HomeScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import SignUpScreen from './screens/SignUpScreen.js';
import ConfirmSignUpScreen from './screens/ConfirmSignUpScreen.js';

// create the nagivation stack
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ title: 'Sign Up'}} />
        <Stack.Screen name="ConfirmSignUpScreen" component={ConfirmSignUpScreen} options={{ title: 'Confirmation'}} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Log In'}} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Overview' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;