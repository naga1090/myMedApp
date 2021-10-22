// Import components and pacakges
import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Amplify, { Auth } from 'aws-amplify';
import config from './src/aws-exports';
Amplify.configure(config);

// import screens
import SignUpScreen from './screens/SignUpScreen.js';
import ConfirmSignUpScreen from './screens/ConfirmSignUpScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import AccountInfoScreen from './screens/AccountInfoScreen';

// create the nagivation stacks
const AuthenticationStack = createStackNavigator();
const TabStack = createBottomTabNavigator();
// const AppStack = createStackNavigator();

const AuthenticationNavigator = props => {
  return (
    <AuthenticationStack.Navigator headerMode="none">

      <AuthenticationStack.Screen name="LoginScreen" options={{ title: 'Login | Med App' }} >
        {screenProps => (<LoginScreen {...screenProps} updateAuthState={props.updateAuthState} />)}
      </AuthenticationStack.Screen>

      <AuthenticationStack.Screen name="SignUpScreen" component={SignUpScreen} options={{ title: 'Sign Up | Med App' }} />

      <AuthenticationStack.Screen name="ConfirmSignUpScreen" options={{ title: 'Confirm Sign Up | Med App' }} >
        {screenProps => (<ConfirmSignUpScreen {...screenProps} updateAuthState={props.updateAuthState} />)}
      </AuthenticationStack.Screen>

    </AuthenticationStack.Navigator>
  );
};

const TabNavigator = props => {
  return (
    <TabStack.Navigator>
      <TabStack.Screen name="HomeScreen" options={{ title: 'Home' }} >
        {screenProps => (<HomeScreen {...screenProps} updateAuthState={props.updateAuthState} />)}
      </TabStack.Screen>
      <TabStack.Screen name="AccountInfoScreen" options={{ title: 'Account' }} >
        {screenProps => (<AccountInfoScreen {...screenProps} updateAuthState={props.updateAuthState} />)}
      </TabStack.Screen>
    </TabStack.Navigator>
  );
};

const Initializing = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="tomato" />
    </View>
  );
};

function App() {

  const [isUserLoggedIn, setUserLoggedIn] = useState('initializing');

  useEffect(() => {
    checkAuthState();
  }, []);

  async function checkAuthState() {
    try {
      await Auth.currentAuthenticatedUser();
      console.log('User is signed in');
      setUserLoggedIn('loggedIn');
    } catch (err) {
      console.log('User is not signed in');
      setUserLoggedIn('loggedOut');
    }
  }

  function updateAuthState(isUserLoggedIn) {
    setUserLoggedIn(isUserLoggedIn);
  }

  return (
    <NavigationContainer>
      {isUserLoggedIn === 'initializing' && <Initializing />}
      {isUserLoggedIn === 'loggedIn' && (<TabNavigator updateAuthState={updateAuthState} />)}
      {isUserLoggedIn === 'loggedOut' && (<AuthenticationNavigator updateAuthState={updateAuthState} />)}
    </NavigationContainer>
  );
}

export default App;