import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import { useAuth } from '../../authContext/Auth-Context';
import { RenderChatBar } from './RenderChatBar';

function GroupChatList({ navigation, darkMode }) {
    const [chats, setChats] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const { user } = useAuth();
    const dynamicStyles = styles(darkMode);

    // Logic for loading data
    const loadData = async () => {
        setRefreshing(true);
        try {
            if (user) {
                // Fetch profiles
                const groupChatSnapshots = await firestore().collection('groupchats')
                    .where('users', 'array-contains', user.uid).get();
                
                console.log(groupChatSnapshots);

                // Filter
                const chatsData = groupChatSnapshots.docs
                    .map(doc => ({ ...doc.data(), id: doc.chatId }));
                console.log(chatsData);

                setChats(chatsData);
            }
        } catch (error) {
            console.error("Error loading chats", error);
            throw error;
        } finally {
            setRefreshing(false);
        }
    };

    // Refresh logic
    const onRefresh = () => {
        loadData();
    };

    // Effect to load data
    useEffect(() => {
        loadData();
    }, []);

    const handleChatPress = (chat) => {
        navigation.navigate('GroupChat', { chatId: chat.chatId });
    };

    const renderChatItem = ({ item }) => (
        <TouchableOpacity key={item.chatId} style={dynamicStyles.profileItem} onPress={() => handleChatPress(item)}>
            <RenderChatBar chatData={item} />
        </TouchableOpacity>
    );

    return (
        <View style={dynamicStyles.container}>
            {chats.length > 0 ? (
                <FlatList
                    data={chats}
                    renderItem={renderChatItem}
                    keyExtractor={(item) => item.chatId}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                />
            ) : (
                <FlatList
                    data={[1]}
                    renderItem={() => (
                    <View style={{margin: "auto", marginTop: 20, alignItems: "center"}}>
                        <Text style={dynamicStyles.text}>
                            No chats :(
                        </Text> 
                        <TouchableOpacity 
                            onPress={() => {}}>
                            <Text style={dynamicStyles.text}>
                                Create one now
                            </Text>
                        </TouchableOpacity>
                    </View>)}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                />
            )}
        </View>
    );
}

const styles = (darkMode) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        backgroundColor: darkMode ? '#333' : '#fff',
    },
    profileItem: {
        padding: 0,
        borderBottomWidth: 1,
        borderBottomColor: darkMode ? '#444' : '#ccc',
    },
    text: {
        fontFamily: "roboto",
        fontWeight: "700",
        color: darkMode ? '#fff' : '#000',
    },
});

export default GroupChatList;