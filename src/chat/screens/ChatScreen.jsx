import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Text, Button, FlatList, TextInput, KeyboardAvoidingView, Pressable, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import firebase from '@react-native-firebase/app'
import { useAuth } from '../../authContext/Auth-Context';
import { renderProfileBar } from '../../swipe/profile_rendering/RenderProfileBar';

function ChatScreen({ route }) {
    //get userId of chat recipient
    const { userId } = route?.params;

    //set states
    const [profile, setProfile] = useState(null);
    const [message, setMessage] = useState("");

    const [chatHistory, setChatHistory] = useState([]);

    //get current user id
    const { user } = useAuth();
    const uid = user.uid;

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileSnapshot = await firestore().collection('users').doc(userId).get();
                if (profileSnapshot.exists) {
                    setProfile(profileSnapshot.data());
                }
                else {
                    console.log("Profile does not exist: " + userId);
                }
            } catch (error) {
                console.error("Error fetching profile: ", error);
            }
        };

        const fetchMessages = async () => {
            try {
                const sentSnapshot = await firestore().collection('messages')
                                        .where('senderId', '==', uid)
                                        .where('receiverId', '==', userId)
                                        .get();
                const receivedSnapshot = await firestore().collection('messages')
                                        .where('senderId', '==', userId)
                                        .where('receiverId', '==', uid)
                                        .get()

                const sentDocs = sentSnapshot.docs;
                const receivedDocs = receivedSnapshot.docs;
                const chatDocs = [...sentDocs, ...receivedDocs]
                        .sort((doc1, doc2) => doc1.data().createdAt > doc2.data().createdAt ? 1 : -1);
                if (chatDocs) {
                    setChatHistory(chatDocs.map(doc => doc.data()));
                }
            } catch (error) {
                console.log("Error fetching messages: ", error)
            }
        }

        fetchProfile();
        fetchMessages();
    }, [userId])


    const handleSend = useCallback((messageType, messageText) => {
        firestore().collection('messages')
            .add({
                senderId: uid,
                receiverId: userId,
                messageType: messageType,
                messageText: messageText,
                createdAt: new Date().toISOString()
            })
            .then(() => {
                setMessage("");
                setChatHistory((prevHistory) =>[
                    ...prevHistory,
                    {
                        senderId: uid,
                        receiverId: userId,
                        messageType: messageType,
                        messageText: messageText,
                        createdAt: new Date().toISOString()
                    }
                ]);
            });
    }, [uid, userId])

    
    if (!profile) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>No profile selected</Text>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.profileContainer}>
                {renderProfileBar(profile)}
            </View>
                
            <ScrollView>
                {chatHistory.map((chatMessage, index) => (
                    <View key={index}>
                        <Text>{chatMessage.senderId === uid ? "Me: " : "Them: "}{chatMessage.messageText}</Text>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.bottomContainer}>
                <TextInput 
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                    style={styles.input}
                    placeholder='Type your message here...'
                />

                <Pressable 
                    style={styles.button}
                    onPress={() => handleSend("text", message)}
                >
                    <Text style={{color: "white", fontWeight: "bold"}}>
                        Send
                    </Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    profileContainer: {
        height: 70
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
    bottomContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: "#dddddd",
        marginBottom: 0
    }, 
    button: {
        backgroundColor: "#000080",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
    }
});

export default ChatScreen;