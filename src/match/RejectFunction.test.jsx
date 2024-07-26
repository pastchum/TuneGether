import firestore from "@react-native-firebase/firestore";
import rejectFunction from './RejectFunction';

jest.mock('@react-native-firebase/firestore', () => {
    const mockFirestore = {
        collection: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        get: jest.fn(),
        add: jest.fn(),
    };
    return () => mockFirestore;
});

describe('rejectFunction', () => {
    const mockFirestore = firestore();

    beforeEach(() => {
        jest.clearAllMocks();
        global.console = {
            log: jest.fn(),
            error: jest.fn(),
        };
    });

    it('should update match status to rejected if a pending match is found', async () => {
        const mockDocRef = {
            data: () => ({ status: 'pending' }),
            ref: { update: jest.fn().mockResolvedValueOnce() },
        };

        mockFirestore.get.mockResolvedValueOnce({
            empty: false,
            forEach: (callback) => callback(mockDocRef),
        });

        await rejectFunction('matchingId', 'userId');

        expect(mockFirestore.collection).toHaveBeenCalledWith('matches');
        expect(mockFirestore.where).toHaveBeenCalledWith('user2Id', '==', 'userId');
        expect(mockFirestore.where).toHaveBeenCalledWith('user1Id', '==', 'matchingId');
        expect(mockFirestore.get).toHaveBeenCalled();
        expect(mockDocRef.ref.update).toHaveBeenCalledWith({ status: 'rejected' });

        // Ensure logs match the expected output
        expect(console.log).toHaveBeenNthCalledWith(1, "MatchId matchingId");
        expect(console.log).toHaveBeenNthCalledWith(2, "UserId userId");
    });

    it('should create a rejected match if no existing match is found', async () => {
        mockFirestore.get.mockResolvedValueOnce({
            empty: true,
            forEach: jest.fn(),
        });

        await rejectFunction('matchingId', 'userId');

        expect(mockFirestore.collection).toHaveBeenCalledWith('matches');
        expect(mockFirestore.where).toHaveBeenCalledWith('user2Id', '==', 'userId');
        expect(mockFirestore.where).toHaveBeenCalledWith('user1Id', '==', 'matchingId');
        expect(mockFirestore.get).toHaveBeenCalled();
        expect(mockFirestore.add).toHaveBeenCalledWith({
            user1Id: 'userId',
            user2Id: 'matchingId',
            status: 'rejected',
            createdAt: expect.any(String),
        });

        // Ensure logs match the expected output
        expect(console.log).toHaveBeenNthCalledWith(1, "MatchId matchingId");
        expect(console.log).toHaveBeenNthCalledWith(2, "UserId userId");
    });

});