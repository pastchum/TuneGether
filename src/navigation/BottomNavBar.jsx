import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from './stacks/HomeScreenStack';
import ChatStackScreen from './stacks/ChatStack';
import LoginStackScreen from './stacks/LoginStack';

const Tabs = createBottomTabNavigator();

function BottomNavBar() {
    return;
}

function BottomTabNavigator() {
    return (
      <Tabs.Navigator screenOptions={{headerShown:false}}>
          <Tabs.Screen name="HomeStack" component={HomeStackScreen} options={{tabBarLabel: "Home"}}/>
          <Tabs.Screen name="ChatStack" component={ChatStackScreen} options={{tabBarLabel: "Chat"}}/>
          <Tabs.Screen name="LoginStack" component={LoginStackScreen} options={{tabBarLabel: "Profile"}}/>
      </Tabs.Navigator>
    );
  }
  
  export default BottomTabNavigator;