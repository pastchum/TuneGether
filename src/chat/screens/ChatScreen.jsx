import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Button, FlatList, TextInput, KeyboardAvoidingView, Pressable, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import firebase from '@react-native-firebase/app'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuth } from '../../authContext/Auth-Context';
import { renderProfileBar } from '../../swipe/profile_rendering/RenderProfileBar';

function ChatScreen({ route }) {
    const { userId } = route?.params;
    const [profile, setProfile] = useState(null);
    const [message, setMessage] = useState("");

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

        fetchProfile();
    }, [userId])

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
                
            {/*<ChatRoom profile={profile} />*/}
            <ScrollView>

            </ScrollView>

            <View style={styles.bottomContainer}>
                <TextInput 
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                    style={styles.input}
                    placeholder='Type your message here...'
                />

                <Pressable style={styles.button}>
                    <Text style={{color: "white", fontWeight: "bold"}}>
                        Send
                    </Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
}


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