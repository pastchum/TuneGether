import React, { useEffect, useState, useRef, useMemo } from 'react';
import { View, Text, TouchableOpacity, Animated, PanResponder, Dimensions, StyleSheet } from 'react-native';

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

function SwipeFunction( { navigation, darkMode} ) {
    //set current profile for rendering
    const [profilesLoaded, setProfilesLoaded] = useState([]);
    const profilesLoadedRef = useRef([]);
    const lastViewedProfileRef = useRef(null);

    //refresh state
    const [refreshing, setRefreshing] = useState(false);

    //get current user
    const { user, profileData } = useAuth();

    const currProfileRef = useRef(null);

    //thresholds
    const swipeThreshold = 120;
    const tapThreshold = 10;
    const startMargin = width * 0.05;
    const profilesPerLoad = 10;

    //logic for loading data
    const loadData = async() => {
        setRefreshing(true);
        try {
            if (user) {
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

                //fetch profiles 
                let profilesQuery = firestore().collection('users')
                                            .where("userId", "!=", user.uid)
                                            .orderBy('userId')
                                            .limit(profilesPerLoad);
                     
                const currentProfile = await firestore().collection('users')
                                        .doc(currProfileRef.current)
                                        .get();
                if (currentProfile.exists) {
                  profilesQuery = profilesQuery
                                    .startAfter(currentProfile);
                }
                                          
                const profilesSnapshots = await profilesQuery.get();
                
                //filter for not swiped before
                const newProfiles = profilesSnapshots.docs
                    .filter(docs => !(matchedUserIds.has(docs.data().userId)))
                    .map(doc => doc.data());
                setProfilesLoaded(prevProfiles => [...prevProfiles, ...newProfiles]);
                profilesLoadedRef.current = newProfiles;
                console.log(profilesLoadedRef.current)
            }
        } catch (error) {
            console.error("Error loading profiles", error);
            throw error;
        } finally {
            setRefreshing(false);
            console.log("Refresh Done");
        }
    };

    //effect to load data
    useEffect(() => {
      loadData();
    }, []);;

    const position = useRef(new Animated.ValueXY({x: startMargin, y: 10})).current;
    const [currentIndex, setCurrentIndex] = useState(0);

    function handleRender(profile) {
        currProfileRef.current = profile.userId;
        return renderProfile(profile, {}, darkMode);
    }

    //on swipe left -> reject
    function reject() {
        let userId = currProfileRef.current;
        console.log("Swiped Left: " + userId);
        return rejectFunction(userId, profileData.userId);
    };

    function onSwipeLeft() {
      if (currProfileRef.current) {
        reject();
        setCurrentIndex((prevIndex) => prevIndex + 1);
        position.setValue({ x: startMargin, y: 10 });
      }
    }

    //on swipe right -> match
    function match() {
      if (currProfileRef.current) {
          let userId = currProfileRef.current;
          console.log("Swiped right: " + userId);
          console.log("matching: " + userId + " " + profileData.userId);
          return matchFunction(userId, profileData.userId);
      }
    };

    function onSwipeRight() {
      match();
      setCurrentIndex((prevIndex) => prevIndex + 1);
      position.setValue({ x: startMargin, y: 10 });
      console.log(currentIndex);
    }

    //on tap -> navigate to profile screen
    function onPress() {
        let userId = currProfileRef.current;
        console.log("View profile: " + userId);
        navigation.navigate("ProfileDetails", 
                            { matchingId: userId});
    };
  
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
            }).start(onSwipeRight);
          } else if (gesture.dx < -swipeThreshold) {
            //swipe left
            Animated.spring(position, {
              toValue: { x: -width - 100, y: 10 },
              useNativeDriver: false,
            }).start(onSwipeLeft);
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

    const renderCards = useMemo(() => {
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
                    {renderProfile(profile, {}, darkMode)}
                </View>
            }
            else if (currentIndex >= profilesLoaded.length) {
                loadData();
            }
            return null;
          })
          .reverse();
      }, [profilesLoaded, currentIndex]);
    
    console.log(profilesLoaded)
    
    return (profilesLoaded.length > 0 && currentIndex <= profilesLoaded.length) ? ( 
      <> 
        <View style={styles.container}>
            {renderCards}
        </View>
        <View style={styles.bottomRowButtons}>
          <View style={{flexDirection: "row"}}>
                <TouchableOpacity
                    style={styles.startChatButton}
                    >
                    <View>
                        <Text style={styles.name}>Sort</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: "row"}}>
                <TouchableOpacity
                    style={styles.startChatButton}
                    onPress={onSwipeRight}
                    >
                    <View>
                        <Text style={styles.name}>Match</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: "row"}}>
                <TouchableOpacity
                    style={styles.startChatButton}
                    onPress={onSwipeLeft}
                    >
                    <View>
                        <Text style={styles.name}>Reject</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
      </>
    ) : (
      <View styles={{alignItems: "center", justifyContent: "center"}}>
        <Text style={{margin: "auto"}}>
          No profiles available at the moment :(
        </Text>

        <TouchableOpacity
          style={styles.startChatButton}
          onPress={loadData}
          >
          <View>
            <Text style={styles.name}>Refresh</Text>
          </View>
        </TouchableOpacity>
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
    startChatButton: {
      // Add your specific styles for start chat button
      backgroundColor: 'burlywood',
      padding: 0,
      borderRadius: 60,
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 10,
      width: (width-60) / 3
    },
    bottomRowButtons: {
      height: 50, 
      flexDirection: "row"
    }
  });

export default SwipeFunction;