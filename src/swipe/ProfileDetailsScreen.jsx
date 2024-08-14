import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  RefreshControl,
} from "react-native";
import { RenderProfile } from "./profile_rendering/RenderProfiles";
import { useAuth } from "../authContext/Auth-Context";
import firestore from "@react-native-firebase/firestore";
import matchFunction from "../match/MatchFunction";
import rejectFunction from "../match/RejectFunction";
import addRating from "../ratings/AddRating";
import { FlatList } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");

function ProfileDetailsScreen({ route, darkMode, navigation }) {
  const { matchingId } = route?.params;
  const { profileData } = useAuth();
  const userId = profileData.userId;
  const [currentProfile, setCurrentProfile] = useState(null);
  const dynamicStyles = styles(darkMode);
  const [matched, setMatched] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  console.log("profileId: ", matchingId);

  const loadData = async () => {
    const fetchCurrentProfileData = async () => {
      try {
        const profileDataSnapshot = await firestore()
          .collection("users")
          .doc(matchingId)
          .get();
        setCurrentProfile(profileDataSnapshot.data());
      } catch (error) {
        console.error("Error fetching profile data: ", error);
        throw error;
      }
    };

    const fetchMatched = async () => {
      try {
        const match1 = await firestore()
          .collection("matches")
          .where("status", "==", "matched")
          .where("user1Id", "==", userId)
          .where("user2Id", "==", matchingId)
          .get();

        const match2 = await firestore()
          .collection("matches")
          .where("status", "==", "matched")
          .where("user1Id", "==", matchingId)
          .where("user2Id", "==", userId)
          .get();

        console.log(match1 + " " + match2);

        if (!match1.empty || !match2.empty) {
          setMatched(true);
        } else {
          setMatched(false);
        }
      } catch (error) {
        console.error("error fetching match: " + error);
      }
    };

    fetchCurrentProfileData();
    fetchMatched();
  };

  useEffect(() => {
    loadData();
  }, [matchingId]);

  console.log("profile: " + currentProfile);
  console.log(matched);

  const handleRating = (rating) => {
    setSelectedRating(rating);
    addRating(currentProfile, rating, userId); // Call the updated addRating function with the userId
    setModalVisible(false);
    loadData();
  };

  const onRefresh = () => {
    loadData();
  };

  return (
    <>
      <FlatList
        data={[1]}
        renderItem={() => (
          <View style={dynamicStyles.container}>
            {currentProfile ? (
              <View style={dynamicStyles.profileContainer}>
                <RenderProfile
                  profileData={currentProfile}
                  darkMode={darkMode}
                />
              </View>
            ) : (
              <Text style={dynamicStyles.text}>Data not found</Text>
            )}
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <View style={dynamicStyles.bottomRowButtons}>
        {!matched && (
          <TouchableOpacity
            style={dynamicStyles.matchButton}
            onPress={() => {
              matchFunction(matchingId, userId);
            }}
          >
            <View>
              <Text style={dynamicStyles.buttonText}>Match</Text>
            </View>
          </TouchableOpacity>
        )}
        {matched && (
          <>
            <TouchableOpacity
              style={dynamicStyles.unmatchButton}
              onPress={() => {
                rejectFunction(matchingId, userId);
              }}
            >
              <View>
                <Text style={dynamicStyles.buttonText}>Unmatch</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={dynamicStyles.chatButton}
              onPress={() => {
                return navigation.navigate("ChatStack", {
                  screen: "Chat",
                  params: { userId: matchingId },
                });
              }}
            >
              <View>
                <Text style={dynamicStyles.buttonText}>Chat</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={dynamicStyles.rateButton}
              onPress={() => setModalVisible(true)}
            >
              <View>
                <Text style={dynamicStyles.buttonText}>Rate</Text>
              </View>
            </TouchableOpacity>
          </>
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          loadData();
        }}
      >
        <View style={dynamicStyles.modalContainer}>
          <View style={dynamicStyles.modalView}>
            <Text style={dynamicStyles.modalText}>Rate this user</Text>
            <View style={dynamicStyles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => {
                    handleRating(star);
                  }}
                >
                  <Text style={dynamicStyles.star}>
                    {star <= selectedRating ? "★" : "☆"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={dynamicStyles.closeButton}
              onPress={() => {
                setModalVisible(!modalVisible);
                loadData();
              }}
            >
              <Text style={dynamicStyles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = (darkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: darkMode ? "#333" : "#fff",
    },
    profileContainer: {
      marginTop: 40,
      marginBottom: 10,
    },
    text: {
      color: "#000",
    },
    matchButton: {
      backgroundColor: "burlywood",
      padding: 10,
      borderRadius: 30,
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 10,
      width: (width - 60) / 3,
      alignItems: "center",
    },
    unmatchButton: {
      backgroundColor: "burlywood",
      padding: 10,
      borderRadius: 30,
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 10,
      width: (width - 60) / 3,
      alignItems: "center",
    },
    chatButton: {
      backgroundColor: "burlywood",
      padding: 10,
      borderRadius: 30,
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 10,
      width: (width - 60) / 3,
      alignItems: "center",
    },
    rateButton: {
      backgroundColor: "burlywood",
      padding: 10,
      borderRadius: 30,
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 10,
      width: (width - 60) / 3,
      alignItems: "center",
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    bottomRowButtons: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 10, // Shifted the buttons up more
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      fontSize: 18,
      fontWeight: "bold",
    },
    starsContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 20,
    },
    star: {
      fontSize: 30,
      marginHorizontal: 5,
      color: "burlywood",
    },
    closeButton: {
      backgroundColor: "burlywood",
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
  });

export default ProfileDetailsScreen;
