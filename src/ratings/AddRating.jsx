import firestore from '@react-native-firebase/firestore';

const addRating = async (profileData, rating, userId) => {
    const profileId = profileData.userId;
    const userRef = firestore().collection('users').doc(profileId);

    try {
        const userDoc = await userRef.get();
        const userData = userDoc.data();

        let ratings = userData.ratings || {};
        const oldRating = ratings[userId] || 0;

        // Update or set the new rating
        ratings[userId] = rating;

        // Calculate the new average rating
        const ratingsArray = Object.values(ratings);
        const newAverageRating = ratingsArray.reduce((sum, r) => sum + r, 0) / ratingsArray.length;

        // Update the user's ratings and average rating
        await userRef.update({ ratings: ratings, rating: newAverageRating });

    } catch (error) {
        console.error('Error updating rating: ', error);
        throw error;

    }
};

export default addRating;
