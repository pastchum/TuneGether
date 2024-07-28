import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { useAuth } from '../../authContext/Auth-Context';

const { width } = Dimensions.get('window');

function ChatMessage({ text, uid, darkMode, createdAt }) {
    const { profileData } = useAuth();
    const userId = profileData.userId;
    const dynamicStyles = styles(darkMode);

    // Function to format the timestamp
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        
        if (isNaN(date.getTime())) {
            return 'Invalid date';
        }

        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <View style={(uid === userId) 
                ? dynamicStyles.userMessageContainer 
                : dynamicStyles.otherMessageContainer}>
            <View style={(uid === userId) 
                ? dynamicStyles.userMessageBubble 
                : dynamicStyles.otherMessageBubble}>
                <Text style={dynamicStyles.messageText}>{text}</Text>
                <Text style={dynamicStyles.timestampText}>{formatTimestamp(createdAt)}</Text>
            </View>
        </View>
    );
}

const styles = (darkMode) => StyleSheet.create({
    userMessageContainer: {
        flex: 1,
        alignItems: 'flex-end',
        padding: 5,
    },
    otherMessageContainer: {
        flex: 1,
        alignItems: 'flex-start',
        padding: 5,
    },
    userMessageBubble: {
        backgroundColor: darkMode ? '#444' : '#f1f1f1',
        borderRadius: 15,
        padding: 10,
        margin: 5,
        maxWidth: width * 0.7,
        borderTopRightRadius: 0,
    },
    otherMessageBubble: {
        backgroundColor: darkMode ? 'slategrey' : 'lightsteelblue',
        borderRadius: 15,
        padding: 10,
        margin: 5,
        maxWidth: width * 0.7,
        borderTopLeftRadius: 0,
    },
    messageText: {
        fontSize: 16,
        color: darkMode ? '#fff' : '#000',
    },
    timestampText: {
        fontSize: 12,
        color: darkMode ? '#ccc' : '#888',
        marginTop: 5,
        alignSelf: 'flex-end',
    },
});

export default ChatMessage;
