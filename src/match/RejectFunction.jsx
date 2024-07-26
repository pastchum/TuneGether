import firestore from "@react-native-firebase/firestore";

function rejectFunction(matchingId, userId) {
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
                        doc.ref.update({ status: 'rejected' }).then(() => {
                            console.log("Match rejected");
                        });
                    }
                });
            } else {
                //create match
                firestore().collection('matches').add({
                    user1Id: userId,
                    user2Id: matchingId,
                    status: 'rejected',
                    createdAt: new Date().toISOString()
                }).then(() => {
                    console.log("Reject created");
                });
            }
        })
        .catch((error) => {
            console.error("Error rejecting: ", error);
        });
}

export default rejectFunction;