import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SetName from './SetName'; // Adjust the import based on the file location
import { NavigationContainer } from '@react-navigation/native';

describe('SetName', () => {
  const mockNavigation = { navigate: jest.fn() };
  const renderComponent = (params = {}) => {
    return render(
      <NavigationContainer>
        <SetName navigation={mockNavigation} route={{ params }} />
      </NavigationContainer>
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = renderComponent();

    expect(getByPlaceholderText('Your name')).toBeTruthy();
    expect(getByText('Next')).toBeTruthy();
  });

  it('updates the name input field correctly', () => {
    const { getByPlaceholderText } = renderComponent();

    const nameInput = getByPlaceholderText('Your name');
    fireEvent.changeText(nameInput, 'John Doe');

    expect(nameInput.props.value).toBe('John Doe');
  });

  it('displays an error message when name is empty', async () => {
    const { getByText } = renderComponent({ invalidName: true });

    expect(getByText('Name cannot be empty')).toBeTruthy();
  });

  it('navigates to SetInstrument when name is provided', async () => {
    const { getByPlaceholderText, getByText } = renderComponent();

    const nameInput = getByPlaceholderText('Your name');
    fireEvent.changeText(nameInput, 'John Doe');
    fireEvent.press(getByText('Next'));

    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith('SetInstrument', { name: 'John Doe' });
    });
  });

  it('displays an error message when trying to navigate with an empty name', async () => {
    const { getByText } = renderComponent();

    fireEvent.press(getByText('Next'));

    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith('SetName', { invalidName: true });
    });
  });
});
