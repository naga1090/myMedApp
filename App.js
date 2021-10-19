// Import components and pacakges
import * as React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import screens
import LandingScreen from './screens/LandingScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import SignUpScreen from './screens/SignUpScreen.js';

// create the nagivation stack
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LandingScreen" component={LandingScreen} options={{ title: 'Overview' }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Log In'}} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ title: 'Sing Up'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;