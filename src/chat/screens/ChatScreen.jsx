import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Text, Button, FlatList, TextInput, KeyboardAvoidingView, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import { useAuth } from '../../authContext/Auth-Context';
import { RenderProfileBar } from '../../swipe/profile_rendering/RenderProfileBar';

function ChatScreen({ route, darkMode, navigation }) {
    //get userId of chat recipient
    const { userId } = route?.params;
    const dynamicStyles = styles(darkMode);

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

        const fetchMessages = () => {
            try {
                const sentSnapshot = firestore().collection('messages')
                                        .where('senderId', '==', uid)
                                        .where('receiverId', '==', userId);
    
                const receivedSnapshot = firestore().collection('messages')
                                        .where('senderId', '==', userId)
                                        .where('receiverId', '==', uid);
    
                const unsubscribeSent = sentSnapshot.onSnapshot(sentMessages => {
                    const sentDocs = sentMessages.docs.map(doc => doc.data());
                    setChatHistory(prevHistory => {
                        const otherMessages = prevHistory.filter(msg => msg.senderId !== uid || msg.receiverId !== userId);
                        return [...otherMessages, ...sentDocs].sort((a, b) => a.createdAt > b.createdAt ? 1 : -1);
                    });
                });
                            
                const unsubscribeReceived = receivedSnapshot.onSnapshot(receivedMessages => {
                    const receivedDocs = receivedMessages.docs.map(doc => doc.data());
                    setChatHistory(prevHistory => {
                        const otherMessages = prevHistory.filter(msg => msg.senderId !== userId || msg.receiverId !== uid);
                        return [...otherMessages, ...receivedDocs].sort((a, b) => a.createdAt > b.createdAt ? 1 : -1);
                    });
                });
                
                return () => {
                    unsubscribeReceived();
                    unsubscribeSent()
                };
            } catch (error) {
                console.log("Error fetching messages: ", error)
            }
        }
        unsubscribeMessages = fetchMessages();

        fetchProfile();
        return () => {
            unsubscribeMessages();
        };

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
                setMessage("")
            });
    }, [uid, userId])

    if (!profile) {
        return (
            <View style={dynamicStyles.container}>
                <Text style={dynamicStyles.errorText}>No profile selected</Text>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView style={dynamicStyles.container}>
            <TouchableOpacity
                onPress={() => {
                    return navigation.navigate('HomeStack', { screen: "ProfileDetails", 
                                                              params: { matchingId: userId } })
                }}>
                <View style={dynamicStyles.profileContainer}>
                    <RenderProfileBar profileData={profile} />
                </View>
            </TouchableOpacity>
                
            <ScrollView>
                {chatHistory.map((chatMessage, index) => (
                    <View key={index}>
                        <Text>{chatMessage.senderId === uid ? "Me: " : "Them: "}{chatMessage.messageText}</Text>
                    </View>
                ))}
            </ScrollView>

            <View style={dynamicStyles.bottomContainer}>
                <TextInput 
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                    style={dynamicStyles.input}
                    placeholder='Type your message here...'
                />

                <Pressable 
                    style={dynamicStyles.button}
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

const styles = (darkMode) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkMode ? '#000' : '#fff'
    },
    profileContainer: {
        height: 70
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