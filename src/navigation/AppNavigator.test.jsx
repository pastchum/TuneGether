import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import { useAuth } from '../authContext/Auth-Context';

// Mocking the BottomNavBar and LoginStackScreen
jest.mock('./BottomNavBar', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return () => <Text>BottomNavBar</Text>;
});

jest.mock('../login/LoginScreenStack', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return () => <Text>LoginScreenStack</Text>;
});

// Mocking the useAuth hook
jest.mock('../authContext/Auth-Context', () => ({
  useAuth: jest.fn(),
}));

describe('AppNavigator', () => {
  it('renders LoginStackScreen when user is not authenticated', () => {
    useAuth.mockReturnValue({ user: null, profileData: null });

    const { getByText } = render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );

    // Expect the presence of LoginStackScreen
    expect(getByText('LoginScreenStack')).toBeTruthy();
  });

  it('renders BottomNavBar when user is authenticated', () => {
    useAuth.mockReturnValue({ user: {}, profileData: {} });

    const { getByText } = render(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    );

    // Expect the presence of BottomNavBar
    expect(getByText('BottomNavBar')).toBeTruthy();
  });
});