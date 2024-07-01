import firestore from "@react-native-firebase/firestore";

function matchFunction(matchingId, userId) {
    //matchingId is other profile Id, userId is user profile Id

    console.log("MatchId " + matchingId);
    console.log("UserId " + userId);

        //get list of matches
    firestore()
        .collection('matches')
        .where('user2Id', '==', userId)
        .where('user1Id', '==', matchingId)
        .get()
        .then((matches) => {
            //if match found
            if (!matches.empty) {
                matches.forEach((doc) => {
                if (doc.data().status === "pending") {
                    doc.ref.update({ status: 'matched' }).then(() => console.log("Match created"));
                }
                });
            } else {
                //create match
                firestore().collection('matches').add({
                user1Id: userId,
                user2Id: matchingId,
                status: 'pending',
                createdAt: new Date().toISOString()
                }).then(() => console.log("Pending match created"));
            }
            })
        .catch((error) => {
            console.error("Error matching: ", error);
            });
}

export default matchFunction;