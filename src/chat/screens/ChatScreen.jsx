import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import ChatRoom from '../components/ChatRoom';

function ChatScreen({ route }) {
    const { userId } = route?.params;

    if (!userId) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>No profile selected</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Chat with {profile.name}</Text>
            <ChatRoom profile={profile} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        padding: 15,
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    },
});

export default ChatScreen;