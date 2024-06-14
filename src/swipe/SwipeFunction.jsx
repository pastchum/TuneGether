import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { Styles, phoneWidth } from '../../assets/Styles';

//get profile rendering function
import { renderProfile } from './profile_rendering/RenderProfiles';

//get auth context for current user
import { useAuth } from '../authContext/Auth-Context';

//get firestore
import firestore from '@react-native-firebase/firestore'

function SwipeFunction( { navigation } ) {
    console.log(navigation);
    //set current profile for rendering
    const [currentProfile, setCurrentProfile] = useState([]);

    //refresh state
    const [refreshing, setRefreshing] = useState(false);

    //get current user
    const { user } = useAuth();

    //logic for loading data
    const loadData = async() => {
        setRefreshing(true);
        try {
            if (user) {
                const profilesSnapshots = await firestore().collection('users').get();
                const profiles = profilesSnapshots.docs
                    .filter(docs => docs.data().userId !== user.uid)
                    .map(doc => doc.data());
                setCurrentProfile(profiles);
            }
        } catch (error) {
            console.error("Error loading profiles", error);
            throw error;
        } finally {
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        loadData();
    };

    useEffect(() => {
        loadData();
    }, []);

    //function to render profiles as a button that navigates to its own details screen
    const swipeProfile = ({ item }) => (
        <View style={Styles.container}>
            <TouchableOpacity 
                onPress={() => {
                    const id = item.userId;
                    console.log('item.uid: ', item)
                    navigation.navigate("ProfileDetails", { userId: id});
                }}
            >
                {renderProfile(item)}
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
            data={currentProfile}
            renderItem ={(profile) => {
                console.log(profile);
                return swipeProfile(profile);
            }} 
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            initialNumToRender={1}
            horizontal={true} 
            pagingEnabled={true}
            snapToAlignment="start"
            snapToInterval={phoneWidth}
            showsHorizontalScrollIndicator={false}
            />
    )
}

export default SwipeFunction;