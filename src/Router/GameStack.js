import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Quiz from '../screens/Quiz';
import TriviaJoy from '../../src/screens/TriviaJoy';
const Stack = createNativeStackNavigator();
export default index = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}>
    <Stack.Screen
      name="Quiz"
      component={Quiz}
      options={{gestureEnabled: false}}
    />
    <Stack.Screen name="TriviaJoy" component={TriviaJoy} />
  </Stack.Navigator>
);
