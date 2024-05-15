import React from 'react';
import { Dimensions, View } from 'react-native';
import SwipeFunction from '../../Swiping/SwipeFunction';
import { Profile1, Profile2 } from '../../Swiping/tmp_profiles/profiles';
import styles from '../../components/Styles';

const HomeScreen = ({ navigation }) => {
    const profileList = [Profile1, Profile2];

    return (
        <View>
            <SwipeFunction profileList={profileList} navigation={navigation}/>
        </View>
    )
};

export default HomeScreen;