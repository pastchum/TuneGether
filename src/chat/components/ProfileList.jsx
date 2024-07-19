import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firestore from '@react-native-firebase/firestore'
import { useAuth } from '../../authContext/Auth-Context';
import { renderProfileBar } from '../../swipe/profile_rendering/RenderProfileBar';

function ProfileList({ navigation }) {
    const [friends, setFriends] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const { user } = useAuth();

    //logic for loading data
    const loadData = async() => {
        setRefreshing(true);
        try {
            if (user) {
                //fetch profiles 
                const profilesSnapshots = await firestore().collection('users').where('userId', '!=', user.uid).get();
                //fetch matches
                const matches = await firestore().collection('matches')
                    .where('status', '==', "matched")
                    .get();
                const matchedUserIds = new Set(matches.docs.map(match => {
                            if (match.data().user1Id === user.uid) return match.data().user2Id;
                            else if (match.data().user2Id === user.uid) return match.data().user1Id;
                            else return "";
                        }).filter(id => id !== ""))
                console.log(matchedUserIds)
                //filter
                const friendsData = profilesSnapshots.docs
                    .filter(doc => doc.data().userId !== user.uid)
                    .filter(doc => matchedUserIds.has(doc.data().userId))
                    .map(doc => ({ ...doc.data(), id: doc.id }));

                setFriends(friendsData);
            }
        } catch (error) {
            console.error("Error loading friends", error);
            throw error;
        } finally {
            setRefreshing(false);
        }
    };

    //refresh logic
    const onRefresh = () => {
        loadData();
    };

    //effect to load data
    useEffect(() => {
        loadData();
    }, []);


    const handleProfilePress = (profile) => {
        navigation.navigate('Chat', { userId: profile.userId });
    };

    const renderProfileItem = ({ item }) => (
        <TouchableOpacity key={item.userId} style={styles.profileItem} onPress={() => handleProfilePress(item)}>
            {renderProfileBar(item)}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {friends.length > 0 ? (
                <FlatList
                    data={friends}
                    renderItem={renderProfileItem}
                    keyExtractor={(item) => item.userId}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                />
            ) : (
                <View>
                    <Text>
                        No friends here 
                        Go find some through swiping!
                    </Text>

                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
    },
    profileItem: {
        padding: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default ProfileList;