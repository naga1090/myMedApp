import * as React from 'react';
import { useEffect, useState, setState, Component } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, TouchableOpacity, Modal, Platform } from 'react-native';

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../src/aws-exports';
Amplify.configure(awsconfig);

import { createMap, createAmplifyGeocoder, drawPoints } from "maplibre-gl-js-amplify";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css";
import "maplibre-gl-js-amplify/dist/public/amplify-geocoder.css"; // Optional CSS for Amplify recommended styling

import "./HomeScreen.css";
import Constants from 'expo-constants';
import * as Location from 'expo-location';

export default function Home({ updateAuthState, navigation }) {

    // async function, const defination, and React. all create Sign Out button in top right
    async function signOut() {
        try {
            await Auth.signOut();
            updateAuthState('loggedOut');
        } catch (error) {
            console.log('Error signing out: ', error);
        }
    }
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={signOut} title="Sign Out" />
            ),
        });
    }, [navigation]);

    // useEffect(async () => {
    //     const map = await initializeMap();
    // }, []);

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS === 'android' && !Constants.isDevice) {
                setErrorMsg('Oops, this will not work on Snack in an Android emulator. Try it on your device!');
                return;
            }
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    let lat = 38.9072;
    let log = -77.0369;

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
        lat = location['coords']['latitude'];
        log = location['coords']['longitude'];
        initializeMap();
    }

    async function initializeMap() {
        const maps = await createMap({
            container: "map",
            center: [log, lat],
            zoom: 11,
        })
        maps.addControl(createAmplifyGeocoder());
        return maps;
    }

    return (
        <SafeAreaView>
            <View style={{ flex: 1, marginTop: 20 }}>
                <div id="map"></div>
            </View>
            {/* <View style={{alignItems: 'center', marginTop: 10}}>
                <Text>{text}</Text>
            </View> */}
        </SafeAreaView>
    );
}
