import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, FlatList} from 'react-native';
import { Styles, phoneWidth } from '../../assets/Styles';
import { renderProfile } from '../profile/RenderProfiles';
import { useAuth } from '../authContext/Auth-Context';
import firestore, { collection } from '@react-native-firebase/firestore'

function SwipeFunction( { navigation } ) {
    const [currentProfile, setCurrentProfile] = useState([]);
    const { user } = useAuth();

    //function to render profiles as a button that navigates to its own details screen
    const profileRender = ({ item }) => (
        <View style={Styles.container}>
            <TouchableOpacity 
                //onPress={() => navigation.navigate("ProfileDetails", { profileId: item.getId()})}
            >
                {renderProfile(item)}
            </TouchableOpacity>
        </View>
    );

    useEffect(() => {
        //get all but own profile
        const loadData = async() => {
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
            }
        };

        loadData();
    }, [setCurrentProfile]);
    
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
            renderItem ={profileRender} 
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