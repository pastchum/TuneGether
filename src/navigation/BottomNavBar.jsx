import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from './stacks/HomeScreenStack';
import LoginStackScreen from './stacks/LoginStack';

const Tabs = createBottomTabNavigator();

function BottomNavBar() {
    return;
}

function BottomTabNavigator() {
    return (
      <Tabs.Navigator screenOptions={{headerShown:false}}>
          <Tabs.Screen name="HomeStack" component={HomeStackScreen} options={{tabBarLabel: "Home"}}/>
          {/*<Tabs.Screen name="Chat" component={ChatScreen} options={{tabBarLabel: "Chat"}}/>*/}
          <Tabs.Screen name="LoginStack" component={LoginStackScreen} options={{tabBarLabel: "Profile"}}/>
      </Tabs.Navigator>
    );
  }
  
  export default BottomTabNavigator;