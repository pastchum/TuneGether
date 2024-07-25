import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from './LoginScreen';
import { useAuth } from '../../authContext/Auth-Context';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Mock the useAuth hook
jest.mock('../../authContext/Auth-Context', () => ({
    useAuth: jest.fn(),
}));

// Mock the Ionicons component
jest.mock('react-native-vector-icons/Ionicons', () => 'Ionicons');

describe('LoginScreen', () => {
    let mockSignIn;
    let mockNavigation;
    let mockRoute;

    beforeEach(() => {
        mockSignIn = jest.fn().mockResolvedValue({});
        useAuth.mockReturnValue({ signIn: mockSignIn });

        mockNavigation = {
            navigate: jest.fn(),
        };

        mockRoute = {
            params: {},
        };
    });

    it('renders correctly', () => {
        const { getByPlaceholderText, getByText } = render(
            <LoginScreen navigation={mockNavigation} route={mockRoute} />
        );

        expect(getByPlaceholderText('Email')).toBeTruthy();
        expect(getByPlaceholderText('Password')).toBeTruthy();
        expect(getByText('Log In')).toBeTruthy();
        expect(getByText("Don't have an account?")).toBeTruthy();
        expect(getByText('Create an account')).toBeTruthy();
    });

    it('displays error message when fields are empty', async () => {
        const { getByText } = render(
            <LoginScreen navigation={mockNavigation} route={mockRoute} />
        );

        fireEvent.press(getByText('Log In'));

        await waitFor(() => {
            expect(mockNavigation.navigate).toHaveBeenCalledWith('Login', {
                issue: 'noInput',
            });
        });
    });

    it('displays error message when email is invalid', async () => {
        mockSignIn.mockRejectedValueOnce({ code: 'auth/invalid-email' });

        const { getByPlaceholderText, getByText } = render(
            <LoginScreen navigation={mockNavigation} route={mockRoute} />
        );

        fireEvent.changeText(getByPlaceholderText('Email'), 'invalidEmail');
        fireEvent.changeText(getByPlaceholderText('Password'), 'password');
        fireEvent.press(getByText('Log In'));

        await waitFor(() => {
            expect(mockNavigation.navigate).toHaveBeenCalledWith('Login', {
                issue: 'invalidEmail',
            });
        });
    });

    it('displays error message when password is invalid', async () => {
        mockSignIn.mockRejectedValueOnce({ code: 'auth/invalid-credential' });

        const { getByPlaceholderText, getByText } = render(
            <LoginScreen navigation={mockNavigation} route={mockRoute} />
        );

        fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
        fireEvent.changeText(getByPlaceholderText('Password'), 'wrongPassword');
        fireEvent.press(getByText('Log In'));

        await waitFor(() => {
            expect(mockNavigation.navigate).toHaveBeenCalledWith('Login', {
                issue: 'invalidPass',
            });
        });
    });

    it('navigates to CreateAccount screen', () => {
        const { getByText } = render(
            <LoginScreen navigation={mockNavigation} route={mockRoute} />
        );

        fireEvent.press(getByText('Create an account'));

        expect(mockNavigation.navigate).toHaveBeenCalledWith('CreateAccount');
    });

    it('toggles password visibility', () => {
        const { getByPlaceholderText, getByTestId } = render(
            <LoginScreen navigation={mockNavigation} route={mockRoute} />
        );

        const passwordInput = getByPlaceholderText('Password');
        const visibilityToggle = getByTestId('password-toggle');

        // Initially, the password should be hidden
        expect(passwordInput.props.secureTextEntry).toBe(true);

        // Toggle password visibility
        fireEvent.press(visibilityToggle);

        // Now, the password should be visible
        expect(passwordInput.props.secureTextEntry).toBe(false);

        // Toggle password visibility back to hidden
        fireEvent.press(visibilityToggle);

        // Now, the password should be hidden again
        expect(passwordInput.props.secureTextEntry).toBe(true);
    });
});
