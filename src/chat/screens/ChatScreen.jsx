import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import ChatRoom from '../components/ChatRoom';

function ChatScreen({ route, darkMode }) {
    const { profile } = route.params;
    const dynamicStyles = styles(darkMode);

    if (!profile) {
        return (
            <View style={dynamicStyles.container}>
                <Text style={dynamicStyles.errorText}>No profile selected</Text>
            </View>
        );
    }

    return (
        <View style={dynamicStyles.container}>
            <Text style={dynamicStyles.header}>Chat with {profile.name}</Text>
            <ChatRoom profile={profile} />
        </View>
    );
}

const styles = (darkMode) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: darkMode ? '#000' : '#fff',
    },
    header: {
        padding: 15,
        fontSize: 18,
        fontWeight: 'bold',
        color: darkMode ? '#fff' : '#000',
    },
    errorText: {
        fontSize: 18,
        color: darkMode ? 'red' : 'red',
    },
});

export default ChatScreen;