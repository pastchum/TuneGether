import React from "react";
import firestore from "@react-native-firebase/firestore";

const addRating = (profileData, rating) => {
    const userId = profileData.userId;
    const currentRating = profileData.rating;
    const currentNumberOfRates = profileData.numberOfRates;

    if (currentNumberOfRates !== undefined && currentRating !== undefined) {
        //calculate new rating
        const totalRating = currentNumberOfRates * currentRating + rating;
        const currentNumberOfRates = currentNumberOfRates++;
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

