import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SetBio from './SetBio'; // Adjust the import based on the file location
import { useAuth } from '../../../../authContext/Auth-Context';

jest.mock('../../../../authContext/Auth-Context', () => ({
    useAuth: jest.fn(),
}));

describe('SetBio', () => {
    let mockNavigation;
    let mockRoute;
    let mockUser;
    let mockCreateUserProfile;

    beforeEach(() => {
        mockNavigation = { navigate: jest.fn() };
        mockRoute = { params: { name: 'Test User', instrument: [1, 2] } };
        mockUser = { uid: 'user123' };
        mockCreateUserProfile = jest.fn();

        useAuth.mockReturnValue({
            user: mockUser,
            createUserProfile: mockCreateUserProfile,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const renderComponent = () => {
        return render(
            <SetBio navigation={mockNavigation} route={mockRoute} />
        );
    };

    it('renders correctly', () => {
        const { getByPlaceholderText, getByText } = renderComponent();

        expect(getByPlaceholderText('Your biography')).toBeTruthy();
        expect(getByText('Create Profile')).toBeTruthy();
    });

    it('updates the biography input field correctly', () => {
        const { getByPlaceholderText } = renderComponent();

        const biographyInput = getByPlaceholderText('Your biography');
        fireEvent.changeText(biographyInput, 'I love playing music!');

        expect(biographyInput.props.value).toBe('I love playing music!');
    });

    it('creates a user profile when the "Create Profile" button is pressed', () => {
        const { getByPlaceholderText, getByText } = renderComponent();

        const biographyInput = getByPlaceholderText('Your biography');
        fireEvent.changeText(biographyInput, 'I love playing music!');
        fireEvent.press(getByText('Create Profile'));

        expect(mockCreateUserProfile).toHaveBeenCalledWith(mockUser, 'Test User', [1, 2], 'I love playing music!');
    });
});
