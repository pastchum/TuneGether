import React from 'react';
import { StyleSheet } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import UpdateProfileScreen from './UpdateProfileScreen';
import { useAuth } from '../../authContext/Auth-Context';

jest.mock('../../authContext/Auth-Context', () => ({
    useAuth: jest.fn(),
}));

describe('UpdateProfileScreen', () => {
    let mockCreateUserProfile;
    let mockNavigation;
    let mockRoute;

    beforeEach(() => {
        mockCreateUserProfile = jest.fn();
        mockNavigation = { navigate: jest.fn() };
        mockRoute = { params: {} };

        useAuth.mockReturnValue({
            createUserProfile: mockCreateUserProfile,
            user: { uid: '12345' },
            profileData: {
                name: 'John Doe',
                instrument: ['Guitar'],
                bio: 'I love playing music!',
            },
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the UpdateProfileScreen correctly', () => {
        const { getByPlaceholderText, getByText } = render(
            <UpdateProfileScreen navigation={mockNavigation} route={mockRoute} darkMode={false} />
        );

        expect(getByPlaceholderText('Name')).toBeTruthy();
        expect(getByPlaceholderText('Bio')).toBeTruthy();
        expect(getByText('Enter your name')).toBeTruthy();
        expect(getByText('What instruments do you play?')).toBeTruthy();
        expect(getByText('Add your biography')).toBeTruthy();
        expect(getByText('Save your profile')).toBeTruthy();
    });

    it('displays error message when name is empty', () => {
        const { getByPlaceholderText, getByText } = render(
            <UpdateProfileScreen navigation={mockNavigation} route={mockRoute} darkMode={false} />
        );

        const nameInput = getByPlaceholderText('Name');
        fireEvent.changeText(nameInput, '');

        const saveButton = getByText('Save your profile');
        fireEvent.press(saveButton);

        expect(mockNavigation.navigate).toHaveBeenCalledWith('UpdateProfile', { invalidName: true, invalidInstrument: false });
    });

    it('calls createUserProfile with correct parameters when inputs are valid', async () => {
        const { getByPlaceholderText, getByText } = render(
            <UpdateProfileScreen navigation={mockNavigation} route={mockRoute} darkMode={false} />
        );

        const nameInput = getByPlaceholderText('Name');
        const bioInput = getByPlaceholderText('Bio');
        const saveButton = getByText('Save your profile');

        fireEvent.changeText(nameInput, 'John Doe');
        fireEvent.changeText(bioInput, 'I love playing music!');

        fireEvent.press(saveButton);

        await waitFor(() => {
            expect(mockCreateUserProfile).toHaveBeenCalledWith(
                { uid: '12345' },
                'John Doe',
                ['Guitar'],
                'I love playing music!',
                null
            );
        });
    });

    it('renders profile data correctly', () => {
        const { getByText } = render(
            <UpdateProfileScreen navigation={mockNavigation} route={mockRoute} darkMode={false} />
        );

        expect(getByText('John Doe')).toBeTruthy();
        expect(getByText('john.doe@mail.com')).toBeTruthy();
    });
});