import * as React from 'react';
import { useEffect, useState, setState, Component } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, TouchableOpacity, Modal, Platform } from 'react-native';

import Amplify, { Auth, Geo } from 'aws-amplify';
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

    let text = 'Loading Map (May take a minute)..';
    let rawResults = -1;

    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
        lat = location['coords']['latitude'];
        log = location['coords']['longitude'];
        getPoints();
        initializeMap();
    }

    async function getPoints() {
        rawResults = Geo.searchByText('starbucks', { "biasPosition": [log, lat], "maxResults": 15 });
        return rawResults;
    }

    async function initializeMap() {
        const maps = await createMap({
            container: "map",
            center: [log, lat],
            zoom: 11,
        })

        Promise.all([rawResults]).then((values) => {
            var cleanResults = values[0];
            var places = [];
            cleanResults.forEach(element => {
                var label = element['label'];
                var labelSplit = label.split(",");
                const name = labelSplit[0];
                labelSplit.shift();
                var addy = labelSplit.join(", ").trimLeft();
                var coor = element['geometry']['point'];

                // // console.log(label);
                // console.log(name);
                // console.log(addy);
                // console.log(coor);
                // console.log("---------------");

                var placeInfo = {};
                placeInfo["coordinates"] = coor;
                placeInfo["title"] = name;
                placeInfo["address"] = addy;
                places.push(placeInfo);

            });
            maps.on("load", function () {
                drawPoints(
                    "mySourceName",
                    places,
                    maps,
                    {
                        showCluster: true,
                        unclusteredOptions: {
                            showMarkerPopup: true
                        },
                        clusterOptions: {
                            showCount: true
                        }
                    }
                );
            });
        })

        maps.addControl(createAmplifyGeocoder());
        return maps;
    }

    return (
        <SafeAreaView>
            <View style={{ flex: 1, marginTop: 20 }}>
                <div id="map"></div>
            </View>
            <View style={{ alignItems: 'center', marginTop: 10 }}>
                <Text>{text}</Text>
            </View>
        </SafeAreaView>
    );
}
