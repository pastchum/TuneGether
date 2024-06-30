import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from '../../../config/firebaseConfig';

function ProfileList({ navigation }) {
    const usersRef = firestore.collection('users');
    const [users] = useCollectionData(usersRef, { idField: 'id' });

    const handleProfilePress = (profile) => {
        navigation.navigate('Chat', { profile });
    };

    const renderProfileItem = ({ item }) => (
        <TouchableOpacity key={item.id} style={styles.profileItem} onPress={() => handleProfilePress(item)}>
            <Text>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                renderItem={renderProfileItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    profileItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default ProfileList;