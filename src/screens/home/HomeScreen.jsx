import React from 'react';
import { View, Text, Platform, TouchableOpacity } from 'react-native';
import SwipeFunction from '../../Swiping/SwipeFunction';
import { Profile1, Profile2 } from '../../Swiping/tmp_profiles/profiles';
import styles from '../../components/Styles';

const HomeScreen = ({ navigation }) => {
    const profileList = [Profile1, Profile2];

    return (
        <View style = {{
            flex : 1, 
            justifyContent: 'center', 
            alignItems: 'center'           
        }}>
            <View>
                <SwipeFunction profileList={profileList} navigation={navigation}/>
            </View>
        </View>
    )
};

export default HomeScreen;