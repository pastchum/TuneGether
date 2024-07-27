import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ProfileDetailsScreen from './ProfileDetailsScreen';
import { useAuth } from '../authContext/Auth-Context';
import firestore from '@react-native-firebase/firestore';
import matchFunction from '../match/MatchFunction';
import rejectFunction from '../match/RejectFunction';

jest.mock('../authContext/Auth-Context', () => ({
    useAuth: jest.fn(),
}));

jest.mock('@react-native-firebase/firestore', () => ({
    __esModule: true,
    default: jest.fn(() => ({
        collection: jest.fn().mockReturnThis(),
        doc: jest.fn().mockReturnThis(),
        get: jest.fn().mockResolvedValue({
            exists: true,
            data: () => ({ userId: 'profile123', name: 'Test User', instrument: [1, 2], bio: 'I love music!' }),
        }),
        where: jest.fn().mockReturnThis(),
    })),
}));

jest.mock('../match/MatchFunction', () => jest.fn());
jest.mock('../match/RejectFunction', () => jest.fn());

describe('ProfileDetailsScreen', () => {
    let mockProfileData;
    let mockUser;
    let mockNavigation;
    let mockRoute;

    beforeEach(() => {
        mockUser = { uid: 'user123' };
        mockProfileData = { userId: 'user123', name: 'Test User', instrument: [1, 2], bio: 'I love music!' };
        mockNavigation = { navigate: jest.fn() };
        mockRoute = { params: { matchingId: 'profile123' } };

        useAuth.mockReturnValue({
            user: mockUser,
            profileData: mockProfileData,
        });

        firestore().collection().where().get = jest
            .fn()
            .mockResolvedValueOnce({
                empty: true,
            })
            .mockResolvedValueOnce({
                empty: true,
            });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders profile details correctly', async () => {
        const { getByText } = render(
            <ProfileDetailsScreen route={mockRoute} darkMode={false} navigation={mockNavigation} />
        );

        await waitFor(() => {
            expect(getByText('Test User')).toBeTruthy();
            expect(getByText('I love music!')).toBeTruthy();
        });
    });


    it('displays "Unmatch" and "Chat" buttons when profiles are matched', async () => {
        firestore().collection().where().get = jest
            .fn()
            .mockResolvedValueOnce({
                empty: false,
            })
            .mockResolvedValueOnce({
                empty: true,
            });

        const { getByText } = render(
            <ProfileDetailsScreen route={mockRoute} darkMode={false} navigation={mockNavigation} />
        );

        await waitFor(() => {
            expect(getByText('Unmatch')).toBeTruthy();
            expect(getByText('Chat')).toBeTruthy();
        });

        fireEvent.press(getByText('Unmatch'));

        await waitFor(() => {
            expect(rejectFunction).toHaveBeenCalledWith('profile123', 'user123');
        });

        fireEvent.press(getByText('Chat'));

        await waitFor(() => {
            expect(mockNavigation.navigate).toHaveBeenCalledWith('ChatStack', {
                screen: 'Chat',
                params: { userId: 'profile123' },
            });
        });
    });

    it('displays "Data not found" when profile data is not available', async () => {
        firestore().collection().doc().get.mockResolvedValueOnce({
            exists: false,
            data: () => null,
        });

        const { getByText } = render(
            <ProfileDetailsScreen route={mockRoute} darkMode={false} navigation={mockNavigation} />
        );

        await waitFor(() => {
            expect(getByText('Data not found')).toBeTruthy();
        });
    });
});
