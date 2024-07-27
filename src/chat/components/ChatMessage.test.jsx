import React from 'react';
import { render } from '@testing-library/react-native';
import ChatMessage from './ChatMessage';
import { StyleSheet, View, Text } from 'react-native';

describe('ChatMessage', () => {
  it('renders the message text correctly', () => {
    const message = { text: 'Hello, world!', uid: 'user1' };

    const { getByText } = render(<ChatMessage message={message} />);

    expect(getByText('Hello, world!')).toBeTruthy();
  });
});
