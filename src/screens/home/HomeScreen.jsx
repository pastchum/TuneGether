import { View, Text } from "react-native";
import { useAuth } from "../../authContext/Auth-Context";
import SwipeFunction from "../../swipe/SwipeFunction";
import { Styles } from "../../../assets/Styles";

function HomeScreen() {
    const { user, fetchProfileData } = useAuth();

    return (
        <View style={Styles.container}>
            { user ? (<SwipeFunction />)
                : (
                    <Text>
                        Please Log in to Swipe
                    </Text>
                )
            }
        </View>
    )
};

export default HomeScreen;