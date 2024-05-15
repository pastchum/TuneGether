import React from 'react';
import { View, Text, Platform } from 'react-native';
import SwipeFunction from '../../Swiping/SwipeFunction';

const HomeScreen = () => {
    return (
        <View style = {{
            flex : 1, 
            justifyContent: 'center', 
            alignItems: 'center'           
        }}>
            <View>
                <SwipeFunction />
            </View>
        </View>
    )
};

export default HomeScreen;