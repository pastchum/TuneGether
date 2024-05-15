import React from 'react';
import { View, TouchableOpacity, FlatList} from 'react-native';
import styles, { phoneWidth } from '../components/Styles';
import { profiles } from './tmp_profiles/profiles';

function SwipeFunction( { profileList, navigation } ) {
    const profileRender = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate("ProfileView", { profileId: item.getId()})}>
            {item.generateRender()}
        </TouchableOpacity>
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
                keyExtractor={item => item.getId()}
                />
        </View>
    )
}

export default SwipeFunction;



