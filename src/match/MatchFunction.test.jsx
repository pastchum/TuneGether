import firestore from "@react-native-firebase/firestore";
import matchFunction from './MatchFunction';

jest.mock('@react-native-firebase/firestore', () => {
    const mockFirestore = {
        collection: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        get: jest.fn(),
        add: jest.fn(),
    };
    return () => mockFirestore;
});

describe('matchFunction', () => {
    const mockFirestore = firestore();

    beforeEach(() => {
        jest.clearAllMocks();
        global.console = {
            log: jest.fn(),
            error: jest.fn(),
        };
    });

    it('should update match status to matched if a pending match is found', async () => {
        const mockDocRef = {
            data: () => ({ status: 'pending' }),
            ref: { update: jest.fn().mockResolvedValueOnce() },
        };

        mockFirestore.get.mockResolvedValueOnce({
            empty: false,
            forEach: (callback) => callback(mockDocRef),
        });

        await matchFunction('matchingId', 'userId');

        expect(mockFirestore.collection).toHaveBeenCalledWith('matches');
        expect(mockFirestore.where).toHaveBeenCalledWith('user2Id', '==', 'userId');
        expect(mockFirestore.where).toHaveBeenCalledWith('user1Id', '==', 'matchingId');
        expect(mockFirestore.get).toHaveBeenCalled();
        expect(mockDocRef.ref.update).toHaveBeenCalledWith({ status: 'matched' });

        expect(console.log).toHaveBeenCalledWith("MatchId matchingId");
        expect(console.log).toHaveBeenCalledWith("UserId userId");
    });

    it('should create a pending match if no existing match is found', async () => {
        mockFirestore.get.mockResolvedValueOnce({
            empty: true,
            forEach: jest.fn(),
        });

        await matchFunction('matchingId', 'userId');

        expect(mockFirestore.collection).toHaveBeenCalledWith('matches');
        expect(mockFirestore.where).toHaveBeenCalledWith('user2Id', '==', 'userId');
        expect(mockFirestore.where).toHaveBeenCalledWith('user1Id', '==', 'matchingId');
        expect(mockFirestore.get).toHaveBeenCalled();
        expect(mockFirestore.add).toHaveBeenCalledWith({
            user1Id: 'userId',
            user2Id: 'matchingId',
            status: 'pending',
            createdAt: expect.any(String),
        });

        expect(console.log).toHaveBeenCalledWith("MatchId matchingId");
        expect(console.log).toHaveBeenCalledWith("UserId userId");
    });

});
