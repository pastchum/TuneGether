import { View, Text } from "react-native";
import { useAuth } from "../../authContext/Auth-Context";
import SwipeFunction from "../../swipe/SwipeFunction";

function HomeScreen() {
    const { user, fetchProfileData } = useAuth();

    return (
        <View>
            <SwipeFunction />
        </View>
    )
};

export default HomeScreen;