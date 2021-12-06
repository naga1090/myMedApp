import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, TouchableOpacity } from 'react-native';

import { Auth, Storage, Geo } from 'aws-amplify';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';

var email;
var first_name;
var last_name;
var email_verified;

export default function AccountInfoScreen({ navigation, updateAuthState }) {

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

    async function thisUser() {
        try {
            const { attributes } = await Auth.currentAuthenticatedUser();
            email = attributes["email"];
            first_name = attributes["custom:first_name"];
            last_name = attributes["custom:last_name"];
            email_verified = attributes["email_verified"];
        } catch (error) {
            console.log("Error getting current user: ", error);
        }
    }
    thisUser();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text> Account Info Screen </Text>
            {/* <Text style={styles.buttonText}>{email}</Text> */}
            <input type="file" id="input" ></input>
            <img src="../assets/placeholder_profile.jpg" width="512" height="512"></img>
            <button type="button" id="uploadFiles" onClick={
                async function uploadFiles() {
                    try {
                        const selectedFile = document.getElementById('input').files[0];
                        if (selectedFile) {
                            const result = await Storage.put(selectedFile.name, selectedFile, {
                                level: "private",
                            });
                            console.log(result);
                            console.log("Done Uplodaing");
                        }
                    } catch (error) {
                        console.log("No files to upload");
                    }
                }
            }>Upload Files</button>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        marginVertical: 10,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        width: '80%',
        backgroundColor: 'tomato'
    },
});