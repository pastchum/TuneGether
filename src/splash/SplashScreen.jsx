import React, { useRef, useEffect } from 'react';
import { View, Image, Animated, StyleSheet, Text } from "react-native";
import { Styles } from '../../assets/Styles';
import { useNavigation } from '@react-navigation/native';

function SplashScreen() {
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start(() => {
            navigation.replace('Login');
        });
    }, [fadeAnim, navigation]);

    return (
        <View style = {Styles.container}>
            <Image
                source={require('../../assets/pictures/tuneicon.png')}
                style={styles.image}
            />
            <View>

            </View>
        </View>
    );
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 200,
    },
});

export default SplashScreen;