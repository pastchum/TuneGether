import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import SplashScreen from './SplashScreen';
import { useNavigation } from '@react-navigation/native';
import { Animated } from 'react-native';

// Mock the useNavigation hook
jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn(),
}));

describe('SplashScreen', () => {
    let mockReplace;

    beforeEach(() => {
        mockReplace = jest.fn();
        useNavigation.mockReturnValue({ replace: mockReplace });
    });

    it('renders correctly', () => {
        const { getByTestId } = render(<SplashScreen />);
        expect(getByTestId('splash-image')).toBeTruthy();
    });

    it('fades in and navigates to Login screen', async () => {
        render(<SplashScreen />);

        // Wait for animation to finish and navigation to occur
        await waitFor(() => {
            expect(mockReplace).toHaveBeenCalledWith('Login');
        }, { timeout: 3000 }); // Animation duration is 2000ms, so we wait a bit longer
    });
});


