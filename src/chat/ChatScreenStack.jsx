import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from './screens/ChatScreen';

const ChatStack = createNativeStackNavigator();

function ChatScreenStack() {
    return (
      <ChatStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'burlywood',
        },
      }}>
        <ChatStack.Screen name="Chat" component={ChatScreen} />
      </ChatStack.Navigator>
    );
  }

export default ChatScreenStack;