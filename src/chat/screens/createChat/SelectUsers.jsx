import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Styles } from "../../../../assets/Styles";
import { useAuth } from "../../../authContext/Auth-Context";
import firestore from "@react-native-firebase/firestore";

export default function SelectUsers({ navigation }) {
  const { user } = useAuth();
  const [friends, setFriends] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  console.log("Selected:", selectedItems);

  // Logic for loading data
  const loadData = async () => {
    setRefreshing(true);
    try {
      if (user) {
        // Fetch profiles
        const profilesSnapshots = await firestore()
          .collection("users")
          .where("userId", "!=", user.uid)
          .get();
        // Fetch matches
        const matches = await firestore()
          .collection("matches")
          .where("status", "==", "matched")
          .get();
        const matchedUserIds = new Set(
          matches.docs
            .map((match) => {
              if (match.data().user1Id === user.uid)
                return match.data().user2Id;
              else if (match.data().user2Id === user.uid)
                return match.data().user1Id;
              else return "";
            })
            .filter((id) => id !== "")
        );

        console.log(matchedUserIds);

        // Filter
        const friendsData = profilesSnapshots.docs
          .filter((doc) => doc.data().userId !== user.uid)
          .filter((doc) => matchedUserIds.has(doc.data().userId))
          .map((doc) => ({ ...doc.data(), id: doc.id }));

        setFriends(friendsData);
      }
    } catch (error) {
      console.error("Error loading friends", error);
      throw error;
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.labelText}>Add users to your group</Text>
        <SectionedMultiSelect
          items={friends}
          IconRenderer={Icon}
          uniqueKey="id"
          onSelectedItemsChange={setSelectedItems}
          selectedItems={selectedItems}
          selectText="Choose users..."
          searchPlaceholderText="Search users..."
          modalAnimationType="slide"
          colors={{ primary: "burlywood" }}
          styles={{
            backdrop: styles.multiSelectBackdrop,
            selectToggle: styles.multiSelectBox,
            chipContainer: styles.multiSelectChipContainer,
            chipText: styles.multiSelectChipText,
          }}
        />
      </View>
      <View>
        {selectedItems.length < 1 && (
          <Text style={Styles.errorText}>You must select a user</Text>
        )}
      </View>
      <TouchableOpacity
        onPress={() => {
          if (selectedItems.length > 0) {
            setSelectedItems((prevSelected) => [...prevSelected, user.uid]);
            return navigation.navigate("AddDetails", { users: selectedItems });
          } else {
            return navigation.navigate("SelectUsers", { invalidUsers: true });
          }
        }}
      >
        <View style={Styles.startChatButton}>
          <Text style={Styles.buttonText}>Next</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 24,
  },
  labelText: {
    fontFamily: "Lora-Italic-VariableFont",
    fontSize: 16,
    marginBottom: 8,
  },
  multiSelectBackdrop: {
    backgroundColor: "rgba(255, 183, 0, 0.2)",
  },
  multiSelectBox: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#bbb",
    padding: 12,
    marginBottom: 12,
  },
  multiSelectChipContainer: {
    borderWidth: 0,
    backgroundColor: "burlywood",
    borderRadius: 8,
  },
  multiSelectChipText: {
    color: "#222",
    fontSize: 14.5,
  },
});
