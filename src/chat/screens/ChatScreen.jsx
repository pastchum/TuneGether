import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Pressable, SectionList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useAuth } from '../../authContext/Auth-Context';
import { RenderProfileBar } from '../../swipe/profile_rendering/RenderProfileBar';
import ChatMessage from '../components/ChatMessage';

function ChatScreen({ route, darkMode, navigation }) {
    const { userId } = route?.params;
    const dynamicStyles = styles(darkMode);

    const [profile, setProfile] = useState(null);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const { user } = useAuth();
    const uid = user.uid;

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileSnapshot = await firestore().collection('users').doc(userId).get();
                if (profileSnapshot.exists) {
                    setProfile(profileSnapshot.data());
                } else {
                    console.log('Profile does not exist: ' + userId);
                }
            } catch (error) {
                console.error('Error fetching profile: ', error);
            }
        };

        const fetchMessages = () => {
            try {
                const sentSnapshot = firestore()
                    .collection('messages')
                    .where('senderId', '==', uid)
                    .where('receiverId', '==', userId);

                const receivedSnapshot = firestore()
                    .collection('messages')
                    .where('senderId', '==', userId)
                    .where('receiverId', '==', uid);

                const unsubscribeSent = sentSnapshot.onSnapshot(sentMessages => {
                    const sentDocs = sentMessages.docs.map(doc => doc.data());
                    setChatHistory(prevHistory => {
                        const otherMessages = prevHistory.filter(msg => msg.senderId !== uid || msg.receiverId !== userId);
                        return [...otherMessages, ...sentDocs].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                    });
                });

                const unsubscribeReceived = receivedSnapshot.onSnapshot(receivedMessages => {
                    const receivedDocs = receivedMessages.docs.map(doc => doc.data());
                    setChatHistory(prevHistory => {
                        const otherMessages = prevHistory.filter(msg => msg.senderId !== userId || msg.receiverId !== uid);
                        return [...otherMessages, ...receivedDocs].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                    });
                });

                return () => {
                    unsubscribeReceived();
                    unsubscribeSent();
                };
            } catch (error) {
                console.log('Error fetching messages: ', error);
            }
        };
        const unsubscribeMessages = fetchMessages();

        fetchProfile();
        return () => {
            unsubscribeMessages();
        };
    }, [userId]);

    const handleSend = useCallback((messageType, messageText) => {
        firestore()
            .collection('messages')
            .add({
                senderId: uid,
                receiverId: userId,
                messageType: messageType,
                messageText: messageText,
                createdAt: new Date().toISOString(),
            })
            .then(() => {
                setMessage('');
            });
    }, [uid, userId]);

    const groupMessagesByDate = (messages) => {
        const grouped = messages.reduce((acc, message) => {
            const date = new Date(message.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(message);
            return acc;
        }, {});

        return Object.keys(grouped).map(date => ({
            title: date,
            data: grouped[date],
        }));
    };

    if (!profile) {
        return (
            <View style={dynamicStyles.container}>
                <Text style={dynamicStyles.errorText}>No profile selected</Text>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView style={dynamicStyles.container}>
            <Pressable
                onPress={() => {
                    navigation.navigate('HomeStack', { screen: 'ProfileDetails', params: { matchingId: userId } });
                }}>
                <View style={dynamicStyles.profileContainer}>
                    <RenderProfileBar profileData={profile} darkMode={darkMode}/>
                </View>
            </Pressable>

            <SectionList
                sections={groupMessagesByDate(chatHistory)}
                keyExtractor={(item, index) => item.createdAt + index}
                renderItem={({ item }) => (
                    <ChatMessage uid={item.senderId} text={item.messageText} darkMode={darkMode} createdAt={item.createdAt} />
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={dynamicStyles.dateHeaderContainer}>
                        <Text style={dynamicStyles.dateHeaderText}>{title}</Text>
                    </View>
                )}
            />

            <View style={dynamicStyles.bottomContainer}>
                <TextInput
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                    style={dynamicStyles.input}
                    placeholder='Type your message here...'
                    placeholderTextColor={darkMode ? '#fff' : '#888'}
                />

                <Pressable style={dynamicStyles.button} onPress={() => handleSend('text', message)}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Send</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = (darkMode) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkMode ? '#333' : '#fff',
    },
    profileContainer: {
        height: 70,
    },
    header: {
        padding: 15,
        fontSize: 18,
        fontWeight: 'bold',
        color: darkMode ? '#fff' : '#333',
    },
    errorText: {
        fontSize: 18,
        color: darkMode ? 'red' : 'red',
    },
    dateHeaderContainer: {
        marginVertical: 10,
        alignSelf: 'center',
        backgroundColor: darkMode ? '#555' : '#eee',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 15,
    },
    dateHeaderText: {
        fontSize: 14,
        color: darkMode ? '#fff' : '#333',
        fontWeight: 'bold',
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
        color: darkMode ? '#fff' : '#000', // Ensure the input text is visible in dark mode
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#dddddd',
        marginBottom: 0,
    },
    button: {
        backgroundColor: darkMode ? 'slategrey' : 'lightsteelblue',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
    },
});

export default ChatScreen;
