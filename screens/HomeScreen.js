import * as React from 'react';
import { useEffect, useState, setState, Component } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, TouchableOpacity, Modal } from 'react-native';

import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../src/aws-exports';
Amplify.configure(awsconfig);

import { createMap, createAmplifyGeocoder, drawPoints } from "maplibre-gl-js-amplify";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css";
import "maplibre-gl-js-amplify/dist/public/amplify-geocoder.css"; // Optional CSS for Amplify recommended styling

import "./ho.css";

import AppButton from '../components/AppButton';

async function initializeMap() {
    const maps = await createMap({
        container: "map",
        center: [-77.0369, 38.9072],
        zoom: 11,
    })
    maps.addControl(createAmplifyGeocoder());
    return maps;
}
initializeMap();

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

    return (
        <View style={{ flex: 1 }}>
            <div id="map"></div>
        </View>
    );
}
