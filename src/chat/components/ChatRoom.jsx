import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firestore from '@react-native-firebase/firestore'
import firebase from '@react-native-firebase/app'
import ChatMessage from './ChatMessage';
import { useAuth } from '../../authContext/Auth-Context';

function ChatRoom({ profile }) {
    const userId = profile.userId;
    const chatRef = firestore().collection('messages').doc(userId).collection('messages');
    const query = chatRef.orderBy('createdAt').limit(25);
    const { user } = useAuth();

    const [messages] = useCollectionData(query, { idField: 'id' });
    const [text, setText] = useState('');

    const sendMessage = async () => {
        if (!user) {
            console.error('No user is authenticated.');
            return;
        }

        if (text.trim()) {
            const { uid } = user;
            await chatRef.add({
                text,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
            });
            setText('');
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                renderItem={({ item }) => <ChatMessage message={item} />}
                keyExtractor={(item) => item.id}
                inverted
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={text}
                    onChangeText={setText}
                    placeholder="Type your message"
                />
                <Button title="Send" onPress={sendMessage} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
});

export default ChatRoom;