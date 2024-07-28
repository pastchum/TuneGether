import React from "react";
import { View, Text, StyleSheet } from "react-native"

const GetRatings = ({ rating, additionalStyles, darkMode }) => {
    const dynamicStyles = createStyles(additionalStyles, darkMode);

    const totalStars = 5;
    const validRating = typeof rating === 'number' && rating >= 0 && rating <= 5 ? rating : 0;
    const filledStars = Math.round(validRating);
    const emptyStars = totalStars - filledStars;

    return (
        <View style={dynamicStyles.starContainer}>
            {Array(filledStars).fill().map((_, index) => (
                <Text key={`filled-${index}`} style={dynamicStyles.filledStar}>★</Text>
            ))}
            {Array(emptyStars).fill().map((_, index) => (
                <Text key={`empty-${index}`} style={dynamicStyles.emptyStar}>☆</Text>
            ))}
        </View>
    );
}

const createStyles = (additionalStyles, darkMode) => StyleSheet.create({
    starContainer: {
        flexDirection: 'row',
    },
    filledStar: {
        fontSize: 36, // Increased font size
        color: 'burlywood'
        
    },
    emptyStar: {
        fontSize: 36, // Increased font size
        color: 'black'
    },
})

export default GetRatings;