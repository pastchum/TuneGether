import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

function ChatMessage({ message }) {
    const { text, uid } = message;

    return (
        <View style={styles.messageContainer}>
            <Text>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    messageContainer: {
        padding: 10,
        margin: 10,
        backgroundColor: '#f1f1f1',
        borderRadius: 5,
    },
});

export default ChatMessage;