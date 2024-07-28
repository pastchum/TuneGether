import React from 'react';
import { render } from '@testing-library/react-native';
import getRatings from './GetRatings'; // Adjust the import path as needed

describe('getRatings', () => {
    it('renders "No ratings yet" when rating or numberOfRates is undefined', () => {
        const profileData = { rating: undefined, numberOfRates: undefined };
        const { getByText } = render(getRatings(profileData));
        expect(getByText('No ratings yet')).toBeTruthy();
    });

    it('renders "No ratings yet" when numberOfRates is 0', () => {
        const profileData = { rating: 4.5, numberOfRates: 0 };
        const { getByText } = render(getRatings(profileData));
        expect(getByText('No ratings yet')).toBeTruthy();
    });

    it('renders the rating when rating and numberOfRates are provided', () => {
        const profileData = { rating: 4.5, numberOfRates: 10 };
        const { getByText } = render(getRatings(profileData));
        expect(getByText('Rating:')).toBeTruthy();
        expect(getByText('4.5/5')).toBeTruthy();
    });

    it('renders "No ratings yet" when profileData is provided without rating and numberOfRates', () => {
        const profileData = {};
        const { getByText } = render(getRatings(profileData));
        expect(getByText('No ratings yet')).toBeTruthy();
    });
});
