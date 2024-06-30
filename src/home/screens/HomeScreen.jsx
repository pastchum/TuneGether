import { View, Text } from "react-native";
import { useAuth } from "../../authContext/Auth-Context";
import SwipeFunction from "../../swipe/SwipeFunction";
import { Styles } from "../../../assets/Styles";

function HomeScreen( { navigation }) {
    const { user } = useAuth();

    return (
        <View>
            { user ? (<SwipeFunction navigation={navigation} />)
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