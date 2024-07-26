import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavBar from './BottomNavBar';

// Mocking the child navigators
jest.mock('../home/HomeScreenStack', () => {
    return jest.fn(() => null);
});
jest.mock('../chat/ChatScreenStack', () => {
    return jest.fn(() => null);
});
jest.mock('../profile/ProfileScreenStack', () => {
    return jest.fn(() => null);
});

// Mocking the Ionicons
jest.mock('react-native-vector-icons/Ionicons', () => 'Ionicons');

describe('BottomNavBar', () => {
    it('renders correctly with dark mode enabled', () => {
        const { getByLabelText } = render(
            <NavigationContainer>
                <BottomNavBar darkMode={true} setDarkMode={jest.fn()} />
            </NavigationContainer>
        );

        expect(getByLabelText('Home')).toBeTruthy();
        expect(getByLabelText('Chat')).toBeTruthy();
        expect(getByLabelText('Profile')).toBeTruthy();
    });

    it('renders correctly with dark mode disabled', () => {
        const { getByLabelText } = render(
            <NavigationContainer>
                <BottomNavBar darkMode={false} setDarkMode={jest.fn()} />
            </NavigationContainer>
        );

        expect(getByLabelText('Home')).toBeTruthy();
        expect(getByLabelText('Chat')).toBeTruthy();
        expect(getByLabelText('Profile')).toBeTruthy();
    });

    it('applies the correct styles for dark mode', async () => {
        const { findAllByTestId } = render(
            <NavigationContainer>
                <BottomNavBar darkMode={true} setDarkMode={jest.fn()} />
            </NavigationContainer>
        );

        const tabBars = await findAllByTestId('tab-bar');
        const tabBar = tabBars[0];
        expect(tabBar.props.style.backgroundColor).toBe(undefined);
    });

    it('applies the correct styles for light mode', async () => {
        const { findAllByTestId } = render(
            <NavigationContainer>
                <BottomNavBar darkMode={false} setDarkMode={jest.fn()} />
            </NavigationContainer>
        );

        const tabBars = await findAllByTestId('tab-bar');
        const tabBar = tabBars[0];
        expect(tabBar.props.style.backgroundColor).toBe(undefined);
    });
});
