import React from 'react';
import { View, TouchableOpacity, FlatList} from 'react-native';
import styles, { phoneWidth } from '../components/Styles';

function SwipeFunction( { profileList, navigation } ) {
    //function to render profiles as a button that navigates to its own details screen
    const profileRender = ({ item }) => (
        <View style={styles.container}>
            <TouchableOpacity 
                onPress={() => navigation.navigate("ProfileDetails", { profileId: item.getId()})}>
                {item.generateRender()}
            </TouchableOpacity>
        </View>
    );
    
    /*const Divider = () => (
        <View style={{
            height: "100%",
            width: 20
        }}/>
    );*/

    return (
        //display profiles as flatlist
        <FlatList 
            data={profileList}
            renderItem ={profileRender} 
            initialNumToRender={1}
            horizontal={true} 
            pagingEnabled={true}
            snapToAlignment="start"
            snapToInterval={phoneWidth}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.getId()}
            />
    )
}

export default SwipeFunction;



