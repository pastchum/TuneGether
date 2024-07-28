import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Text, Image, TextInput, KeyboardAvoidingView, Pressable, SectionList, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useAuth } from '../../authContext/Auth-Context';
import { RenderChatBar } from '../components/RenderChatBar';
import ChatMessage from '../components/ChatMessage';
import DefaultPFP from "../../swipe/profile_rendering/DefaultPFP.png";

function GroupChatScreen({ route, darkMode, navigation }) {
    const { chatId } = route?.params;
    const dynamicStyles = styles(darkMode);

    const [chatProfile, setChatProfile] = useState(null);
    const [message, setMessage] = useState("");
    const [profileData, setProfileData] = useState({});
    const [chatHistory, setChatHistory] = useState([]);

    const { user } = useAuth();
    const uid = user.uid;

    useEffect(() => {
        const fetchProfileData = async (id) => {
            try {
                const profileSnapshot = await firestore().collection('users').doc(id).get();
                const currProfileData = profileSnapshot.data();
                return { id, data: currProfileData };
            } catch (error) {
                console.error(`Error fetching profile for user ${id}:`, error);
                return { id, data: null };
            }
        };

        const fetchProfile = async () => {
            try {
                const chatProfileSnapshot = await firestore().collection('groupchats')
                    .doc(chatId)
                    .get();
                if (chatProfileSnapshot.exists) {
                    const chatProfileData = chatProfileSnapshot.data();
                    setChatProfile(chatProfileData);
                    const profilePromises = chatProfileData.users.map(userId => fetchProfileData(userId));
                    const profiles = await Promise.all(profilePromises);

                    const profileDataMap = profiles.reduce((acc, { id, data }) => {
                        if (data) acc[id] = data;
                        return acc;
                    }, {});
                    setProfileData(profileDataMap);
                } else {
                    console.log("Profile does not exist: " + chatId);
                }
            } catch (error) {
                console.error("Error fetching chat: ", error);
            }
        };

        const fetchMessages = () => {
            try {
                const messagesSnapshot = firestore().collection('groupchats')
                    .doc(chatId)
                    .collection('messages');

                const unsubscribeMessages = messagesSnapshot.onSnapshot(messages => {
                    const messageDocs = messages.docs.map(doc => doc.data());
                    setChatHistory([...messageDocs].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)));
                });

                return () => {
                    unsubscribeMessages();
                };
            } catch (error) {
                console.log("Error fetching messages: ", error);
            }
        };

        const unsubMessages = fetchMessages();

        fetchProfile();
        return () => {
            unsubMessages();
        };
    }, [chatId]);

    const handleSend = useCallback((messageType, messageText) => {
        firestore().collection('groupchats')
            .doc(chatId)
            .collection('messages')
            .add({
                senderId: uid,
                messageType: messageType,
                messageText: messageText,
                createdAt: new Date().toISOString()
            })
            .then(() => {
                setMessage("");
            });
    }, [uid, chatId]);

    const OtherChatMessage = ({ chatMsg }) => {
        const profilePic = profileData[chatMsg.senderId]?.profilePicURL
            ? { uri: profileData[chatMsg.senderId].profilePicURL }
            : DefaultPFP;
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ alignContent: 'flex-start' }}>
                    <Image
                        source={profilePic}
                        style={dynamicStyles.displayPhoto}
                    />
                </View>
                <ChatMessage uid={chatMsg.senderId} text={chatMsg.messageText} createdAt={chatMsg.createdAt} darkMode={darkMode} />
            </View>
        );
    };

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

    if (!chatProfile) {
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
                    return navigation.navigate("GroupChatDetails", { chatId: chatId, darkMode: darkMode });
                }}>
                <View style={dynamicStyles.profileContainer}>
                    <RenderChatBar chatData={chatProfile} darkMode={darkMode}/>
                </View>
            </TouchableOpacity>

            <SectionList
                sections={groupMessagesByDate(chatHistory)}
                keyExtractor={(item, index) => item.createdAt + index}
                renderItem={({ item }) => (
                    item.senderId === uid ? (
                        <ChatMessage uid={item.senderId} text={item.messageText} createdAt={item.createdAt} darkMode={darkMode} />
                    ) : (
                        <OtherChatMessage chatMsg={item} />
                    )
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

                <Pressable
                    style={dynamicStyles.button}
                    onPress={() => handleSend("text", message)}
                >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
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
        backgroundColor: darkMode ? '#333' : '#fff'
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
        color: darkMode ? '#fff' : '#000',
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
        backgroundColor: darkMode ? 'slategrey' : 'lightsteelblue',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
    },
    displayPhoto: {
        marginLeft: 5,
        marginTop: 10,
        height: 35,
        width: 35,
        borderRadius: 50,
        marginBottom: 20,
    },
});

export default GroupChatScreen;
