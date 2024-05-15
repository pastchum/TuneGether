import React, { useState } from 'react';
import { View, Text, TouchableHighlight, FlatList, ScrollView, Image } from 'react-native';
import styles from '../components/Styles';
import profiles, { Profile1, Profile2 } from './tmp_profiles/profiles';

function SwipeFunction() {
    const profileRender = ({ item }) => (
        (item.generateRender())
    );

    const profileList = [Profile1, Profile2];

    return (
        //display profiles
        <View style={styles.container}>
            <FlatList horizontal={true} 
                data={profileList}
                renderItem ={profileRender} 
                initialNumToRender={1}/>
        </View>
    )
}

export default SwipeFunction;



