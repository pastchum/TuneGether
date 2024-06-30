import React, { useEffect, useState, useRef } from 'react';
import { View, Text, RefreshControl, Animated, PanResponder, Dimensions, StyleSheet } from 'react-native';

//get profile rendering function
import { renderProfile } from './profile_rendering/RenderProfiles';

//get auth context for current user
import { useAuth } from '../authContext/Auth-Context';

//get firestore
import firestore from '@react-native-firebase/firestore'

import matchFunction from '../match/MatchFunction';

const { width, height } = Dimensions.get('window')

function SwipeFunction( { navigation } ) {
    //set current profile for rendering
    const [profilesLoaded, setProfilesLoaded] = useState([]);

    //refresh state
    const [refreshing, setRefreshing] = useState(false);

    //get current user
    const { user, profileData } = useAuth();

    //set last seen profile
    const [lastViewedProfile, setLastViewedProfile] = useState("");

    //thresholds
    const swipeThreshold = 120;
    const tapThreshold = 10;
    const startMargin = width * 0.05;

    //logic for loading data
    const loadData = async() => {
        setRefreshing(true);
        try {
            if (user) {
                const profilesSnapshots = await firestore().collection('users').limit(10).get();
                const newProfiles = profilesSnapshots.docs
                    .filter(docs => docs.data().userId !== user.uid)
                    .map(doc => doc.data());
                setProfilesLoaded(prevProfiles => [...prevProfiles, ...newProfiles]);
                if (profilesLoaded.length > 0) {
                    setLastViewedProfile(profilesLoaded[0].userId);
                }
            }
        } catch (error) {
            console.error("Error loading profiles", error);
            throw error;
        } finally {
            setRefreshing(false);
        }
    };

    //refresh logic
    const onRefresh = () => {
        loadData();
    };

    //effect to load data
    useEffect(() => {
        loadData();
    }, []);

    //on swipe left -> reject


    //on swipe right -> match
    function onSwipeRight() {
        if(profile.userId != lastViewedProfile) {
            setLastViewedProfile(profile.userId);
        }
        console.log("LastViewedProfile: " + lastViewedProfile)
        console.log("matching: " + lastViewedProfile + " " + profileData.userId);
        return matchFunction(lastViewedProfile);
    };

    //on tap -> navigate to profile screen
    function onPress() {
        if(false && profilesLoaded[currentIndex].userId != lastViewedProfile) {
            setLastViewedProfile(profilesLoaded[currentIndex].userId);
        }
        console.log("LastViewedProfile: " + lastViewedProfile)
        //console.log('ids: ' + lastViewedProfile + " " + profileData.userId);
        navigation.navigate("ProfileDetails", 
                            { matchingId: lastViewedProfile});
    };

    const position = useRef(new Animated.ValueXY({x: startMargin, y: 10})).current;
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gesture) => {
          position.setValue({ x: gesture.dx, y: gesture.dy });
        },
        onPanResponderRelease: (event, gesture) => {
          if (Math.abs(gesture.dx) < tapThreshold && Math.abs(gesture.dy) < tapThreshold) {
            onPress();
          } else if (gesture.dx > swipeThreshold) {
            //swipe right
            Animated.spring(position, {
              toValue: { x: width + 100, y: 0 },
              useNativeDriver: false,
            }).start(() => {
              onSwipeRight();
              setCurrentIndex((prevIndex) => prevIndex + 1);
              position.setValue({ x: startMargin, y: 10 });
            });
          } else if (gesture.dx < -swipeThreshold) {
            //swipe left
            Animated.spring(position, {
              toValue: { x: -width - 100, y: 10 },
              useNativeDriver: false,
            }).start(() => {
              console.log(lastViewedProfile);
              setCurrentIndex((prevIndex) => prevIndex + 1);
              position.setValue({ x: startMargin, y: 10 });
            });
          } else if (gesture.dy > swipeThreshold) {
            //Refresh
            Animated.spring(position, {
                toValue: { x: startMargin, y: 10 },
                useNativeDriver: false,
            }).start(() => {
                onRefresh();
            })
          } else {
            Animated.spring(position, {
              toValue: { x: startMargin, y: 10 },
              useNativeDriver: false,
            }).start();
          }
        },
      })
    ).current;

    const renderCards = () => {
        return profilesLoaded
          .map((profile, index) => {
            if (index === currentIndex) {
                console.log(profile.userId);
                return profile ? (
                    <Animated.View
                        key={profile.userId}
                        style={[styles.card, position.getLayout()]}
                        {...panResponder.panHandlers}
                    >
                        {renderProfile(profile)}
                    </Animated.View>
                ) : null;
            } else if (index === currentIndex + 1) {
                <View key={profile.id} style={[styles.card, { top: 10 * (index - currentIndex), zIndex: -index }]}>
                    {renderProfile(profile)}
                </View>
            }
    
            return null;
          })
          .reverse();
      };
    
      return (
            <View style={styles.container}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                {renderCards()}
            </View>
        );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
      width: width * 0.9,
      height: height * 0.8,
      position: 'absolute',
      borderRadius: 10,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    name: {
      fontSize: 20,
      fontWeight: 'bold',
      padding: 10,
      textAlign: 'center',
    },
  });

export default SwipeFunction;