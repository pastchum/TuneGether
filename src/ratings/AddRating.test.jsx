import firestore from '@react-native-firebase/firestore';
import addRating from './AddRating'; 

jest.mock('@react-native-firebase/firestore', () => ({
    __esModule: true,
    default: jest.fn(() => ({
        collection: jest.fn().mockReturnThis(),
        doc: jest.fn().mockReturnThis(),
        update: jest.fn(),
    })),
}));

describe('addRating', () => {
    let mockFirestore;
    let mockCollection;
    let mockDoc;
    let mockUpdate;

    beforeEach(() => {
        mockUpdate = jest.fn();
        mockDoc = jest.fn(() => ({
            update: mockUpdate,
        }));
        mockCollection = jest.fn(() => ({
            doc: mockDoc,
        }));
        mockFirestore = firestore.mockReturnValue({
            collection: mockCollection,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('updates rating and numberOfRates correctly when profileData has current rating and numberOfRates', () => {
        const profileData = {
            userId: 'user123',
            rating: 4.0,
            numberOfRates: 5,
        };
        const newRatingValue = 5;

        addRating(profileData, newRatingValue);

        const expectedTotalRating = profileData.numberOfRates * profileData.rating + newRatingValue;
        const expectedNewNumberOfRates = profileData.numberOfRates + 1;
        const expectedNewRating = expectedTotalRating / expectedNewNumberOfRates;

        expect(mockUpdate).toHaveBeenCalledWith({
            rating: expectedNewRating,
            numberOfRates: expectedNewNumberOfRates,
        });
    });

    it('sets rating and numberOfRates to initial values when profileData has no current rating and numberOfRates', () => {
        const profileData = {
            userId: 'user123',
            rating: undefined,
            numberOfRates: undefined,
        };
        const newRatingValue = 5;

        addRating(profileData, newRatingValue);

        expect(mockUpdate).toHaveBeenCalledWith({
            rating: newRatingValue,
            numberOfRates: 1,
        });
    });

    it('updates rating and numberOfRates correctly when profileData has numberOfRates but no current rating', () => {
        const profileData = {
            userId: 'user123',
            rating: undefined,
            numberOfRates: 5,
        };
        const newRatingValue = 5;

        addRating(profileData, newRatingValue);

        expect(mockUpdate).toHaveBeenCalledWith({
            rating: newRatingValue,
            numberOfRates: 1,
        });
    });

    it('updates rating and numberOfRates correctly when profileData has current rating but no numberOfRates', () => {
        const profileData = {
            userId: 'user123',
            rating: 4.0,
            numberOfRates: undefined,
        };
        const newRatingValue = 5;

        addRating(profileData, newRatingValue);

        expect(mockUpdate).toHaveBeenCalledWith({
            rating: newRatingValue,
            numberOfRates: 1,
        });
    });

    it('handles case when profileData is missing userId', () => {
        const profileData = {
            rating: 4.0,
            numberOfRates: 5,
        };
        const newRatingValue = 5;

        expect(() => addRating(profileData, newRatingValue)).toThrow('Missing userId');
    });
});