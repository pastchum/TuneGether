import React, { useState } from 'react';
import { View, Text, TouchableHighlight, FlatList, ScrollView, Image } from 'react-native';
import styles, { phoneWidth } from '../components/Styles';

function SwipeFunction( { profileList } ) {
    const profileRender = ({ item }) => (
        (item.generateRender())
    );
    
    const Divider = () => (
        <View style={{
            height: "100%",
            width: 30
        }}/>
    );

    return (
        //display profiles
        <View style={styles.container}>
            <FlatList 
                data={profileList}
                renderItem ={profileRender} 
                initialNumToRender={1}
                horizontal={true} 
                pagingEnabled={true}
                snapToAlignment="start"
                snapToInterval={phoneWidth}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={Divider}
                />
        </View>
    )
}

export default SwipeFunction;



