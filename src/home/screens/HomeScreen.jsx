import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../../authContext/Auth-Context";
import SwipeFunction from "../../swipe/SwipeFunction";

function HomeScreen({ navigation, darkMode }) {
    const { user } = useAuth();
    const dynamicStyles = styles(darkMode);

    return (
        <View style={dynamicStyles.container}>
            { user ? (<SwipeFunction navigation={navigation} darkMode={darkMode} />)
                : (
                    <Text style={dynamicStyles.text}>
                        Please Log in to Swipe
                    </Text>
                )
            }
        </View>
    );
}

const styles = (darkMode) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: darkMode ? '#333' : '#fff',
    },
    text: {
        color: darkMode ? '#fff' : '#000',
    },
});

export default HomeScreen;