import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CreateAccountScreen from './CreateAccountScreen';
import { useAuth } from '../../authContext/Auth-Context';

jest.mock('../../authContext/Auth-Context', () => ({
    useAuth: jest.fn(),
}));

describe('CreateAccountScreen', () => {
    let mockCreateAcc;
    let mockNavigation;
    let mockRoute;

    beforeEach(() => {
        mockCreateAcc = jest.fn().mockResolvedValue({});
        mockNavigation = { navigate: jest.fn() };
        mockRoute = { params: {} };

        useAuth.mockReturnValue({
            createAcc: mockCreateAcc,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the CreateAccountScreen correctly', () => {
        const { getByPlaceholderText } = render(
            <CreateAccountScreen navigation={mockNavigation} route={mockRoute} />
        );

        expect(getByPlaceholderText('Email')).toBeTruthy();
        expect(getByPlaceholderText('Password')).toBeTruthy();
        expect(getByPlaceholderText('Confirm Password')).toBeTruthy();
    });

    it('toggles password visibility', () => {
        const { getByTestId } = render(
            <CreateAccountScreen navigation={mockNavigation} route={mockRoute} />
        );

        const passwordToggle = getByTestId('password-toggle');
        const passwordInput = getByTestId('password-input');

        // Initially, the password should be hidden
        expect(passwordInput.props.secureTextEntry).toBe(true);

        // Toggle the password visibility
        fireEvent.press(passwordToggle);
        expect(passwordInput.props.secureTextEntry).toBe(false);

        // Toggle back the password visibility
        fireEvent.press(passwordToggle);
        expect(passwordInput.props.secureTextEntry).toBe(true);
    });

    it('displays error message when passwords do not match', () => {
        const { getByTestId, getByText } = render(
            <CreateAccountScreen navigation={mockNavigation} route={mockRoute} />
        );

        const passwordInput = getByTestId('password-input');
        const confirmPasswordInput = getByTestId('confirm-password-input');

        fireEvent.changeText(passwordInput, 'password123');
        fireEvent.changeText(confirmPasswordInput, 'password124');

        expect(getByText('Passwords do not match')).toBeTruthy();
    });

    it('calls createAcc when inputs are valid and passwords match', async () => {
        const { getByTestId } = render(
            <CreateAccountScreen navigation={mockNavigation} route={mockRoute} />
        );

        const emailInput = getByTestId('email-input');
        const passwordInput = getByTestId('password-input');
        const confirmPasswordInput = getByTestId('confirm-password-input');
        const createAccountButton = getByTestId('create-account-button');

        fireEvent.changeText(emailInput, 'test@example.com');
        fireEvent.changeText(passwordInput, 'password123');
        fireEvent.changeText(confirmPasswordInput, 'password123');

        fireEvent.press(createAccountButton);

        await waitFor(() => {
            expect(mockCreateAcc).toHaveBeenCalledWith('test@example.com', 'password123');
        });
    });   
});
