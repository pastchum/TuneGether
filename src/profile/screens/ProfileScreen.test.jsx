import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import ProfileScreen from './ProfileScreen';
import { useAuth } from '../../authContext/Auth-Context';

// Mock the useAuth hook
jest.mock('../../authContext/Auth-Context', () => ({
    useAuth: jest.fn(),
}));

// Mock the renderProfile function
jest.mock('../../swipe/profile_rendering/RenderProfiles', () => ({
    renderProfile: jest.fn(),
}));

describe('ProfileScreen', () => {
    const mockProfileData = {
        name: 'John Doe',
        instrument: [1, 2],
        bio: 'I love playing music!',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the profile correctly when profile data is available', () => {
        const mockRenderProfile = require('../../swipe/profile_rendering/RenderProfiles').renderProfile;
        useAuth.mockReturnValue({ profileData: mockProfileData });
        mockRenderProfile.mockReturnValue(<Text>Profile Rendered</Text>);

        const { getByText } = render(<ProfileScreen darkMode={false} />);

        expect(getByText('Profile Rendered')).toBeTruthy();
    });

    it('renders the dark mode correctly', () => {
        const mockRenderProfile = require('../../swipe/profile_rendering/RenderProfiles').renderProfile;
        useAuth.mockReturnValue({ profileData: mockProfileData });
        mockRenderProfile.mockReturnValue(<Text>Profile Rendered</Text>);

        const { getByTestId } = render(<ProfileScreen darkMode={true} />);

        const container = getByTestId('profile-container');
        expect(container.props.style).toEqual(
            expect.objectContaining({
                backgroundColor: '#333',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            })
        );
    });

    it('renders data not found message when profile data is not available', () => {
        useAuth.mockReturnValue({ profileData: null });

        const { getByText } = render(<ProfileScreen darkMode={false} />);

        expect(getByText('data not found')).toBeTruthy();
    });

    it('applies additional styles correctly', () => {
        const mockRenderProfile = require('../../swipe/profile_rendering/RenderProfiles').renderProfile;
        useAuth.mockReturnValue({ profileData: mockProfileData });
        mockRenderProfile.mockReturnValue(<Text>Profile Rendered</Text>);

        render(<ProfileScreen darkMode={false} />);

        const additionalStyles = mockRenderProfile.mock.calls[0][1];
        expect(additionalStyles).toMatchObject({ displayPhoto: { width: 150, height: 150, borderRadius: 80 } });
    });
});