import firestore from "@react-native-firebase/firestore";
import { useAuth } from "../authContext/Auth-Context";

function matchFunction(matchingId) {
    //matchingId is other profile Id, userId is user profile Id
    //get list of matches
    const { profileData } = useAuth();
    const userId = profileData.userId

    console.log("MatchId " + matchingId);
    console.log("UserId " + userId);

    const matches = firestore().collection('matches')
                        .where('user2Id', '==', userId)
                        .where('user1Id', '==', matchingId)
                        .get();

    if (matches.exists) {
        firestore().collection('matches')
                        .where('user2Id', '==', userId)
                        .where('user1Id', '==', matchingId)
                        .update({
                            status: 'matched'
                        })
                        .then(() => console.log("Match created"));
    } else if (matches.docs.data().status == "pending") {
        //if matches doesnt exist or matchingId not found in matches
        firestore().collection('matches').add({
            user1Id: userId,
            user2Id: matchingId,
            status: 'pending',
            createdAt: new Date().toISOString()
        });
    }
}

export default matchFunction;