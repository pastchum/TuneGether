import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from './screens/ChatScreen';
import ProfileList from './components/ProfileList';

const ChatStack = createNativeStackNavigator();

function ChatScreenStack({ darkMode }) {
    return (
      <ChatStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'burlywood',
        }
      }}>
        <ChatStack.Screen name="Profiles" >
          {props => <ProfileList {...props} darkMode={darkMode} />}
        </ChatStack.Screen>
        <ChatStack.Screen name="Chat" component={ChatScreen} />
        
      </ChatStack.Navigator>
    );
  }

export default ChatScreenStack;