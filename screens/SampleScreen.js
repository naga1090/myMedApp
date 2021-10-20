import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, TouchableOpacity } from 'react-native';

import { Auth } from 'aws-amplify';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';

export default function SampleScreen({ navigation, updateAuthState }) {
    return (
        <View>
            <Text> Hello </Text>
        </View>
    );
}