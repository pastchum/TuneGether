import React, { useEffect, useState, useRef } from 'react';
import { View, Text, RefreshControl, Animated, PanResponder, Dimensions, StyleSheet } from 'react-native';

//get profile rendering function
import { renderProfile } from './profile_rendering/RenderProfiles';

//get auth context for current user
import { useAuth } from '../authContext/Auth-Context';

//get firestore
import firestore from '@react-native-firebase/firestore'

//get match & reject functions
import matchFunction from '../match/MatchFunction';
import rejectFunction from '../match/RejectFunction';

const { width, height } = Dimensions.get('window')

function SwipeFunction( { navigation } ) {
    //set current profile for rendering
    const [profilesLoaded, setProfilesLoaded] = useState([]);
    const profilesLoadedRef = useRef([]);

    //refresh state
    const [refreshing, setRefreshing] = useState(false);

    //get current user
    const { user, profileData } = useAuth();

    const currProfileRef = useRef(null);

    //thresholds
    const swipeThreshold = 120;
    const tapThreshold = 10;
    const startMargin = width * 0.05;

    //logic for loading data
    const loadData = async() => {
        setRefreshing(true);
        try {
            if (user) {
                //fetch profiles 
                const profilesSnapshots = await firestore().collection('users').limit(20).get();

                //fetch matches
                const matches1 = firestore().collection('matches')
                    .where('user1Id', '==', user.uid)
                    .get();
                const matches2 = firestore().collection('matches')
                    .where('user2Id', '==', user.uid)
                    .where('status', '==', "matched")
                    .get();

                const [matches1Result, matches2Result] = await Promise.all([matches1, matches2]);
                const matches = [...matches1Result.docs, ...matches2Result.docs];
                const matchedUserIds = new Set(matches.map(match => 
                    match.data().user1Id === user.uid ? match.data().user2Id : match.data().user1Id));

                //filter for not swiped before
                const newProfiles = profilesSnapshots.docs
                    .filter(docs => docs.data().userId !== user.uid)
                    .filter(docs => !(matchedUserIds.has(docs.data().userId)))
                    .map(doc => doc.data());

                setProfilesLoaded(prevProfiles => [...prevProfiles, ...newProfiles]);
                profilesLoadedRef.current = newProfiles;
            }
        } catch (error) {
            console.error("Error loading profiles", error);
            throw error;
        } finally {
            setRefreshing(false);
        }
    };

    //effect to load data
    useEffect(() => {
        loadData();
    }, []);

    function handleRender(profile) {
        currProfileRef.current = profile.userId;
        return renderProfile(profile);
    }

    //on swipe left -> reject
    function onSwipeLeft() {
        let userId = currProfileRef.current;
        console.log("Swiped Left: " + userId);
        return rejectFunction(userId, profileData.userId);
    };

    //on swipe right -> match
    function onSwipeRight() {
        let userId = currProfileRef.current;
        console.log("Swiped right: " + userId);
        console.log("matching: " + userId + " " + profileData.userId);
        return matchFunction(userId, profileData.userId);
    };

    //on tap -> navigate to profile screen
    function onPress() {
        let userId = currProfileRef.current;
        console.log("View profile: " + userId);
        navigation.navigate("ProfileDetails", 
                            { matchingId: userId});
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
            //press
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
              onSwipeLeft();
              setCurrentIndex((prevIndex) => prevIndex + 1);
              position.setValue({ x: startMargin, y: 10 });
            });
          } else if (gesture.dy > swipeThreshold) {
            //Refresh
            Animated.spring(position, {
                toValue: { x: startMargin, y: 10 },
                useNativeDriver: false,
            }).start(() => {
                loadData();
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
                        {handleRender(profile)}
                    </Animated.View>
                ) : null;
            } else if (index === currentIndex + 1) {
                <View key={profile.userId} style={[styles.card, { top: 20, zIndex: -index }]}>
                    {renderProfile(profile)}
                </View>
            }
            else if (currentIndex > profilesLoaded.length) {
                loadData();
            }
            return null;
          })
          .reverse();
      };
    
    return (
        <View style={styles.container}>
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