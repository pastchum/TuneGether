import AsyncStorage from "@react-native-async-storage/async-storage";

// Save last viewed profile ID
export const saveLastViewedProfileId = async (profileId) => {
    try {
      await AsyncStorage.setItem('lastViewedProfileId', profileId);
    } catch (error) {
      console.error("Failed to save last viewed profile ID:", error);
    }
  };
  
  // Load last viewed profile ID
export const loadLastViewedProfileId = async () => {
    try {
      const profileId = await AsyncStorage.getItem('lastViewedProfileId');
      return profileId;
    } catch (error) {
      console.error("Failed to load last viewed profile ID:", error);
      return null;
    }
  };