import React from "react";
import { View, Text } from "react-native"

const getRatings = (profileData) => {
    try {
        //check for ratings
        if (profileData) {
            const rating = profileData.rating;
            const numberOfRates = profileData.numberOfRates;

            if (rating === undefined || numberOfRates === undefined || numberOfRates === 0 ) {
                return (
                    <View>
                        <Text>
                            No ratings yet
                        </Text>
                    </View>
                )
            } else {
                return (
                    <View>
                        <Text>Rating: </Text>
                        <Text>{rating}/5</Text>
                    </View>
                )
            }
        } 
    } catch (error) {

    }
}

export default getRatings;