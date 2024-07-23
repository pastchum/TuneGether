import React from 'react';
import { render } from '@testing-library/react-native';
import { ScrollView, View, Text, Image } from 'react-native';
import { renderProfile } from './RenderProfiles';

jest.mock('../../ratings/GetRatings', () => {
    const React = require('react');
    const { Text } = require('react-native');
    return {
        __esModule: true,
        default: jest.fn(() => <Text>Ratings</Text>),
    };
});

jest.mock('../../../assets/instruments/Instruments', () => [
    { id: 1, name: 'Guitar' },
    { id: 2, name: 'Piano' },
]);

jest.mock('react-native', () => {
    const RN = jest.requireActual('react-native');
    RN.ScrollView = jest.fn(({ children }) => <div>{children}</div>);
    RN.View = jest.fn(({ children }) => <div>{children}</div>);
    RN.Text = jest.fn(({ children }) => <div>{children}</div>);
    RN.Image = jest.fn(() => <img alt="profile" />);
    return RN;
});

const mockProfileData = {
    name: 'John Doe',
    instrument: [1, 2],
    bio: 'I love playing music!',
};

describe('renderProfile', () => {
    it('renders the profile correctly with instruments and bio', () => {
        const { getByText } = render(renderProfile(mockProfileData, {}, false));

        expect(getByText('John Doe')).toBeTruthy();
        expect(getByText('Guitar\n')).toBeTruthy();
        expect(getByText('Piano\n')).toBeTruthy();
        expect(getByText('I love playing music!')).toBeTruthy();
        expect(getByText('Ratings')).toBeTruthy();
    });

    it('renders the profile in dark mode', () => {
        const { getByText } = render(renderProfile(mockProfileData, {}, true));

        expect(getByText('John Doe')).toBeTruthy();
        expect(getByText('Guitar\n')).toBeTruthy();
        expect(getByText('Piano\n')).toBeTruthy();
        expect(getByText('I love playing music!')).toBeTruthy();
        expect(getByText('Ratings')).toBeTruthy();
    });

    it('renders the no profile available message when profileData is empty', () => {
        const { getByText } = render(renderProfile(null, {}, false));

        expect(getByText('No Profile Available')).toBeTruthy();
    });
});
