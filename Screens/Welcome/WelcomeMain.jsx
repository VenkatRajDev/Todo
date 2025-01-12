import {} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//import screens
import Welcome from './Welcome';
import NameField from './NameField';

const Stack = createStackNavigator();

const WelcomeMain = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="NameField" component={NameField} />
    </Stack.Navigator>
  );
};

export default WelcomeMain;