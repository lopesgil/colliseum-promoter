import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/pages/Login';
import Register from './src/pages/Register';
import EditEvent from './src/pages/EditEvent'
import Home from './src/pages/Home'

const { Navigator, Screen } = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Screen
          name='Login'
          component={Login}
        />
        <Screen
          name='Register'
          component={Register}
        />
        <Screen
          name='EditEvent'
          component={EditEvent}
        />
        <Screen
          name='Home'
          component={Home}
        />
      </Navigator>
    </NavigationContainer>
  );
}
