import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

//get render GroupChat function
import { RenderGroupChat } from '../components/RenderGroupChatDetails';

//get firestore
import firestore from '@react-native-firebase/firestore'

const { width } = Dimensions.get('window')

function GroupChatDetailsScreen({ route, darkMode, navigation }) {
    const { chatId } = route.params;
    const [currentGroupChat, setCurrentGroupChat] = useState(null);
    const dynamicStyles = styles(darkMode);

    console.log('GroupChatId: ', chatId);

    useEffect(() => {
        const fetchCurrentGroupChatData = async () => {
            try {
                const GroupChatDataSnapshot = await firestore().collection('groupchats')
                    .doc(chatId)
                    .get();
                setCurrentGroupChat(GroupChatDataSnapshot.data());
            } catch (error) {
                console.error('Error fetching GroupChat data: ', error);
                throw error;
            }
        };

        fetchCurrentGroupChatData();
    }, []);

    console.log("GroupChat: " + currentGroupChat);

    return (
        <View style={dynamicStyles.container}>
            {currentGroupChat ? (
                <View style={dynamicStyles.GroupChatContainer}>
                    <RenderGroupChat groupChatData={currentGroupChat} darkMode={darkMode} navigation={navigation} />
                </View>
            ) : (
                <Text style={dynamicStyles.text}>Data not found</Text>
            )}
        </View>
    );
}

const styles = (darkMode) => StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: darkMode ? '#333' : '#fff',
    },
    GroupChatContainer: {
        marginTop: 5,
        marginBottom: 5
    },
    text: {
        color: darkMode ? '#fff' : '#000',
    }
});

export default GroupChatDetailsScreen;