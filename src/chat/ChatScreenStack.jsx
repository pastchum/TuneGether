import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import ChatScreen from './screens/ChatScreen';
import ProfileList from './components/ProfileList';
import GroupChatList from './components/GroupChatList';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GroupChatScreen from './screens/GroupChatScreen';
import GroupChatDetailsScreen from './screens/GroupChatDetailsScreen';
import AddDetails from './screens/createChat/AddDetails';
import SelectUsers from './screens/createChat/SelectUsers';

const ChatStack = createNativeStackNavigator();

function ChatScreenStack({ darkMode }) {
    return (
      <ChatStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'burlywood',
        },
      }}>
        <ChatStack.Screen name="Friends" 
          options={({ navigation }) => ({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => navigation.navigate('Group Chats')}
                    accessibilityLabel="settings"
                >
                    <Ionicons name="people-outline" size={24} color={darkMode ? '#fff' : '#000'} style={{ marginRight: 10 }} />
                </TouchableOpacity>
            ),
        })}>
          {props => <ProfileList {...props} darkMode={darkMode} />}
          </ChatStack.Screen>
        <ChatStack.Screen 
          name="Chat" 
        >
          {props => <ChatScreen {...props} darkMode={darkMode} />}
        </ChatStack.Screen>
        <ChatStack.Screen 
          name="GroupChat"
        >
          {props => <GroupChatScreen {...props} darkMode={darkMode} />}
        </ChatStack.Screen>
        <ChatStack.Screen name="Group Chats" options={({ navigation }) => ({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => navigation.navigate('SelectUsers')}
                    accessibilityLabel="settings"
                >
                    <Ionicons name="add-circle-outline" size={24} color={darkMode ? '#fff' : '#000'} style={{ marginRight: 10 }} />
                </TouchableOpacity>
            ),
        })}>
          {props => <GroupChatList {...props} darkMode={darkMode} />}
        </ChatStack.Screen>
        <ChatStack.Screen 
          name="GroupChatDetails"
        >
          {props => <GroupChatDetailsScreen {...props} darkMode={darkMode} />}
        </ChatStack.Screen>
        <ChatStack.Screen name="SelectUsers" component={SelectUsers} />
        <ChatStack.Screen name="AddDetails" component={AddDetails} />
      </ChatStack.Navigator>
    );
  }

export default ChatScreenStack;
