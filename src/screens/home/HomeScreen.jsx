import React from 'react';
import { View, Text, Platform } from 'react-native';
import SwipeFunction from '../../Swiping/SwipeFunction';
import { Profile1, Profile2 } from '../../Swiping/tmp_profiles/profiles';

const HomeScreen = () => {
    const profileList = [Profile1, Profile2];

    return (
        <View style = {{
            flex : 1, 
            justifyContent: 'center', 
            alignItems: 'center'           
        }}>
            <View>
                <SwipeFunction profileList={profileList}/>
            </View>
        </View>
    )
};

export default HomeScreen;