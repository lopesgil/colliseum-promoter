import 'react-native-gesture-handler';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/pages/Login';
import Register from './src/pages/Register';
import CreateEvent from './src/pages/CreateEvent';
import EditEvent from './src/pages/EditEvent'
import Home from './src/pages/Home'

interface EventData {
    id: number,
    date: string,
    name: string,
    description: string,
    price: number,
}

type RootStackParamList = {
    Login: undefined,
    Register: undefined,
    CreateEvent: undefined,
    Home: { event: EventData | undefined, eventDeleted: number | undefined } | undefined,
    EditEvent: { event: EventData },
}

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
      <PaperProvider>
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
                      name='CreateEvent'
                      component={CreateEvent}
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
      </PaperProvider>
  );
}
