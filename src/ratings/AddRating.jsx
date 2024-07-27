import React from "react";
import firestore from "@react-native-firebase/firestore";

const addRating = (profileData, rating) => {
    const userId = profileData.userId;
    const currentRating = profileData.rating;
    let currentNumberOfRates = profileData.numberOfRates;

    if (!userId) {
        throw new Error('Missing userId');
    }

    if (currentNumberOfRates !== undefined && currentRating !== undefined) {
        // Calculate new rating
        const totalRating = currentNumberOfRates * currentRating + rating;
        currentNumberOfRates++;
        const newRating = totalRating / currentNumberOfRates;

        firestore().collection('users').doc(userId).update({
            rating: newRating,
            numberOfRates: currentNumberOfRates
        });
    } else {
        firestore().collection('users').doc(userId).update({
            rating: rating,
            numberOfRates: 1
        });
    }
}

export default addRating;
