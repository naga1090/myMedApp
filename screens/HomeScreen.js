import * as React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert, TouchableOpacity } from 'react-native';

import { Auth } from 'aws-amplify';

export default function Home({ updateAuthState, navigation }) {

    async function signOut() {
        try {
            await Auth.signOut();
            updateAuthState('loggedOut');
        } catch (error) {
            console.log('Error signing out: ', error);
        }
    }
    
    const [count, setCount] = React.useState(0);
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={signOut} title="Sign Out" />
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text> Home YUHHHHH </Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20
    }
});